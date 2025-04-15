const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
const DB = require('./database')
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const salt = bcrypt.genSaltSync(10);
const authCookieName = 'token';

let calendarCtr = 1;
let times = [];
let events = [];
let eventCtr = 1;

//Used with .filter() on FlatArrays
let UNIQUE = (value, index, self) => self.indexOf(value) === index

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 3000;

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email) || await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body);
        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user)
            setAuthCookie(res, user.token);
            res.send({ username: user.username });
        return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.get('/auth/username', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        res.send({ username: user.username })
    } else {
        res.status(202).end()
    }
})

apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
        await DB.updateUser(user)
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

apiRouter.post('/users/calendars', verifyAuth, async (req, res) => {
    let user = await findUser('token', req.cookies[authCookieName])
    user = await addCalendarToUser(user, req.body);
    res.send({ username: user.username, calendars: user.calendars})
});

apiRouter.get('/users/calendars', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userCalendarIDs = (await findUserCalendars(user.calendars)).flatMap(calendar => calendar._id);
    const userCalendars = []
    for (const calendarID of userCalendarIDs) {
        userCalendars.push(await getCalendarAsObject(calendarID))
    }
    res.send(userCalendars)
})

apiRouter.get('/users/calendars/ids', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userCalendars = await findUserCalendars(user.calendars);
    res.send(userCalendars.flatMap(calendar => calendar._id))
})

apiRouter.get('/users/calendars/:calendarId', verifyAuth, async (req, res) => {
    const calendarID = req.params.calendarId;
    // const calendar = await getCalendarAsObject(calendarID)
    const calendar = await DB.getCalendar(calendarID)
    res.send(calendar)
})

apiRouter.post('/calendars', verifyAuth, async (req, res) => {
    let user = await findUser('token', req.cookies[authCookieName])
    const calendar = await updateCalendars(req.body);
    await addCalendarToUser(user, calendar._id)
    res.send(calendar);
});

apiRouter.post('/calendar/times', verifyAuth, async (req, res) => {
    const calendar = await addTimeToCalendar(req.body);
    res.send(calendar);
});

//todo deprecate
apiRouter.get('/calendars', verifyAuth, (req, res) => {
    res.send("calendars");
});

apiRouter.post('/times', verifyAuth, (req, res) => {
    times = updateTimes(req.body);
    res.send(times);
});

apiRouter.get('/times', verifyAuth, (req, res) => {
    res.send(times);
});

apiRouter.post('/events', verifyAuth, (req, res) => {
    event = updateEvents(req.body);
    res.send(event);
});

apiRouter.get('/events', verifyAuth, (req, res) => {
    res.send(events);
});

async function createUser(user) {
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = {
        email: user.email,
        username: user.username,
        password: hashedPassword,
        token: uuid.v4(),
        calendars: []
    };
    await DB.addUser(newUser);

    return newUser;
}

async function findUser(field, value) {
    if (!value) return null;

    return DB.getUser(field, value);
}

async function addCalendarToUser(user, calendars) {
    const userCalendars = user.calendars;
    userCalendars.push(calendars)
    user.calendars = userCalendars.flat().filter(UNIQUE);
    await DB.updateUser(user);
    return user;
}

async function findUserCalendars(userCalendars) {
    const c = []
    for (const calendar of userCalendars) {
        c.push(await DB.getCalendar(calendar))
    }
    return c
}

async function getCalendarAsObject(calendarID) {
    const calendar = await DB.getCalendar(calendarID)
    const calendarTimes = calendar.event_times
    return {
        _id: calendarID,
        name: calendar.name,
        times: (calendarTimes.length > 0) ? calendarTimes.flatMap(time => {
            const eventTime = times.find((t) => t["time"] === time)
            const eventIds = [eventTime.event_ids].flat()
            return {
                time: time,
                event_ids: (eventIds.length > 0) ? eventIds.flatMap(eventId => {
                    const event = events.find((e) => e["event_id"] === eventId)
                    return {
                        event_id: eventId,
                        name: event.name,
                        description: event.description
                    }
                }) : []
            }
        }) : []
    }
}

async function updateCalendars(calendar) {
    if (calendar['_id'] !== undefined) {
        const previousCalendar = await DB.getCalendar(calendar['_id']);
        if (previousCalendar) {
            await DB.updateCalendar(calendar);
        } else {
            await DB.addCalendar(calendar);
        }
        return calendar
    } else {
        const newCalendar = {
            name: calendar.name,
            event_times: []
        }
        await DB.addCalendar(newCalendar);
        return newCalendar
    }
}

async function addTimeToCalendar(calendar) {
    const calendarID = calendar["_id"]
    const previousCalendar = await DB.getCalendar(calendarID)

    const times = previousCalendar["event_times"]
    times.push(calendar["event_times"])
    const updatedCalendar = {
        _id: calendarID,
        name: previousCalendar["name"],
        event_times: times.flat().filter(UNIQUE)
    }
    await DB.updateCalendar(updatedCalendar);

    return updatedCalendar
}

function updateTimes(newTime) {
    const previousTime = times.find((t) => t['time'] === newTime['time']);

    if (previousTime) {
        const events = [previousTime["event_ids"]].flat()
            events.push(newTime["event_ids"])
        const updatedTime = {
            time: previousTime['time'],
            event_ids: events.flat().filter(UNIQUE)
        }
        times.splice(times.indexOf(previousTime), 1, updatedTime);
    } else {
        times.push(newTime);
    }

    return times;
}

function updateEvents(event) {
    if (event['event_id'] !== undefined ) {
        const previousEvent = events.find((e) => e['event_id'] === event['event_id']);
        if (previousEvent) {
            events.splice(events.indexOf(previousEvent), 1, event);
        } else {
            events.push(event);
        }
        return event
    } else {
        const newEvent = {
            event_id: eventCtr++,
            name: event.name,
            description: event.description
        }
        events.push(newEvent);
        return newEvent
    }
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});