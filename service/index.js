const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();
app.use(express.json());

let users = []
let calendars = {}
let times = {}
let events = {}

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.get('*any', (_req, res) => {
    res.send({ msg: 'Startup service' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});