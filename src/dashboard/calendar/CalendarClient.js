class EventMessage {
    constructor(from, type, msg) {
        this.from = from;
        this.type = type;
        this.msg = msg;
    }
}

class CalendarClient {
    events = []
    handlers = []

    constructor() {
        const protocol = window.location.protocol === "https:" ? "wss" : "ws";
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        this.socket.onopen = () => {
            this.receiveEvent(new EventMessage("Startup", "system", {msg: "Connected"}));
        }
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text())
                this.receiveEvent(event);
            } catch (e) {
                console.log("Error receiving event:", e)
            }
        }
        this.socket.onclose = () => {
            this.receiveEvent(new EventMessage("Startup", "system", {msg: "Disconnected"}));
        }
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter(h => h !== handler);
    }

    receiveEvent(event) {
        this.events.push(event);

        this.events.forEach(event => {
            this.handlers.forEach(handler => handler(event));
        })
    }

    broadcastEvent(from, type, msg) {
        const event = new EventMessage(from, type, msg);
        this.socket.send(JSON.stringify(event));
    }
}

const CalendarNotifier = new CalendarClient();

export {CalendarNotifier};