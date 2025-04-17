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
        let port = window.location.port;
        const protocol = window.location.protocol === "https:" ? "wss" : "ws";
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

        this.socket.onopen = (event) => {
            this.receiveEvent(new EventMessage("startup", "system", {msg: "Connected"}));
        }
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text())
                this.receiveEvent(event);
            } catch (e) {
                console.log("Error receiving event:", e)
            }
        }
        this.socket.onclose = (event) => {
            console.warn("WebSocket closed", {
                code: event.code,
                reason: event.reason,
                wasClean: event.wasClean
            });
            this.receiveEvent(new EventMessage("startup", "system", {msg: "Disconnected"}));
        }
        this.socket.onerror = (error) => {
            console.log("Websocket Error:", error);
        }
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
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