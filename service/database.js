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
    const id = new ObjectId(calendarID);
    return calendarsCollection.findOne({ _id: id });
}

async function updateCalendar(calendar) {
    await calendarsCollection.updateOne({ _id: calendar._id }, { $set: calendar });
}

module.exports = {
    addUser,
    getUser,
    updateUser,
    addCalendar,
    getCalendar,
    updateCalendar
}