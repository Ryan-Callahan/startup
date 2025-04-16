const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('schedulizer');
const calendarsCollection = db.collection('calendars');
const usersCollection = db.collection('users');
const timesCollection = db.collection('times');
const eventsCollection = db.collection('events');

(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log(`Connect to database`);
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

async function addUser(user) {
    await usersCollection.insertOne(user);
}

function getUser(field, value) {
    return usersCollection.findOne({ [field]: value });
}

async function updateUser(user) {
    await usersCollection.updateOne({ email: user.email }, { $set: user });
}

async function addCalendar(calendar) {
    await calendarsCollection.insertOne(calendar);
}

async function getCalendar(calendarID) {
    return calendarsCollection.findOne({ _id: new ObjectId(calendarID) });
}

async function updateCalendar(calendar) {
    await calendarsCollection.updateOne({ _id: calendar._id }, { $set: calendar });
}

async function addTime(time) {
    await timesCollection.insertOne(time);
}

function getTime(time) {
    return timesCollection.findOne({ time: time });
}

async function updateTime(time) {
    await timesCollection.updateOne({ time: time.time }, { $set: time });
}

async function addEvent(event) {
    await eventsCollection.insertOne(event);
}

function getEvent(event) {
    return eventsCollection.findOne({ _id: new ObjectId(event) })
}

async function updateEvent(event) {
    await eventsCollection.updateOne( { _id: event._id }, { $set: event });
}

module.exports = {
    addUser,
    getUser,
    updateUser,
    addCalendar,
    getCalendar,
    updateCalendar,
    addTime,
    getTime,
    updateTime,
    addEvent,
    getEvent,
    updateEvent
}