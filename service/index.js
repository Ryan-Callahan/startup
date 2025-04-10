const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const {genSalt, hash} = require("bcryptjs");
const app = express();
app.use(express.json());

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
})

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