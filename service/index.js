const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const salt = bcrypt.genSaltSync(10);
const authCookieName = 'token';

let users = [];
let calendars = [];
let calendarCtr = 1;
let times = [];
let events = [];
let eventCtr = 1;

//Used with .filter() on FlatArrays
let UNIQUE = (value, index, self) => self.indexOf(value) === index

//todo remove test users
createUser("test", "password");

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 3000;

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.username, req.body.password);
        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
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
    user = addCalendarToUser(user, req.body);
    res.send({ username: user.username, calendars: user.calendars})
});

apiRouter.get('/users/calendars', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    const userCalendars = findUserCalendars(user.calendars);
    res.send(userCalendars)
})

apiRouter.post('/calendars', verifyAuth, async (req, res) => {
    let user = await findUser('token', req.cookies[authCookieName])
    const calendar = updateCalendars(req.body);
    addCalendarToUser(user, calendar.calendar_id)
    res.send(calendar);
});

apiRouter.post('/calendar/times', verifyAuth, async (req, res) => {
    const calendar = addTimeToCalendar(req.body);
    res.send(calendar);
});

apiRouter.get('/calendars', verifyAuth, (req, res) => {
    res.send(calendars);
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

async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
        username: username,
        password: hashedPassword,
        token: uuid.v4(),
        calendars: []
    };
    users.push(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

function addCalendarToUser(user, calendars) {
    const userCalendars = user.calendars;
    userCalendars.push(calendars)
    user.calendars = userCalendars.flat().filter(UNIQUE);
    users.splice(users.indexOf(user), 1, user);
    return user;
}

function findUserCalendars(userCalendars) {
    const c = []
    userCalendars.forEach(calendar => {
        c.push(calendars.find((c) => c["calendar_id"] === calendar))
    })
    return c
}

function updateCalendars(calendar) {
    if (calendar['calendar_id'] !== undefined) {
        const previousCalendar = calendars.find((c) => c['calendar_id'] === calendar['calendar_id']);
        if (previousCalendar) {
            calendars.splice(calendars.indexOf(previousCalendar), 1, calendar);
        } else {
            calendars.push(calendar);
        }
        return calendar
    } else {
        const newCalendar = {
            calendar_id: calendarCtr++,
            name: calendar.name,
            event_times: []
        }
        calendars.push(newCalendar);
        return newCalendar
    }
}

function addTimeToCalendar(calendar) {
    const calendarID = calendar["calendar_id"]
    const previousCalendar = calendars.find((c) => c["calendar_id"] === calendarID)

    const times = previousCalendar["event_times"]
    times.push(calendar["event_times"])
    const updatedCalendar = {
        calendar_id: calendarID,
        name: previousCalendar["name"],
        event_times: times.flat().filter(UNIQUE)
    }
    calendars.splice(calendars.indexOf(previousCalendar), 1, updatedCalendar);

    return updatedCalendar
}

function updateTimes(newTime) {
    const previousTime = times.find((t) => t['time'] === newTime['time']);

    if (previousTime) {
        const events = previousTime["event_ids"]
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