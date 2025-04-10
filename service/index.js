const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const {genSalt, hash} = require("bcryptjs");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const salt = bcrypt.genSaltSync(10);
const authCookieName = 'token';

let users = [];
let calendars = [];
let times = [];
let events = [];

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 3000;

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.username, req.body.password);
        setAuthCookie(res, user.token);
        res.send({ email: user.username });
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

apiRouter.post('/calendar', verifyAuth, (req, res) => {
    calendars = updateCalendars(req.body);
    res.send(calendars);
})

apiRouter.get('/calendars', verifyAuth, (req, res) => {
    res.send(calendars);
});

async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = {
        username: username,
        password: hashedPassword,
        token: uuid.v4(),
    };
    users.push(user)

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

function updateCalendars(newCalendar) {
    const previousCalendar = calendars.find((c) => c['calendar-id'] === newCalendar['calendar-id']);

    if (previousCalendar) {
        calendars.splice(calendars.indexOf(previousCalendar), 0, newCalendar)
    } else {
        calendars.push(newCalendar)
    }

    return calendars
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