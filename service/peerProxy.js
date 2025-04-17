const {WebSocketServer, WebSocket} = require('ws');

function PeerProxy(httpServer) {
    const socketServer = new WebSocketServer({server: httpServer, path: '/ws'});

    socketServer.on('connection', (socket, req) => {
        console.log("New WebSocket connection", req.url);
        socket.isAlive = true;

        socket.on('message', function message(data) {
            socketServer.clients.forEach((client) => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });

        socket.on('pong', () => {
            socket.isAlive = true;
        })
    });

    setInterval(() => {
        socketServer.clients.forEach((client) => {
            if (client.isAlive === false) {
                return client.terminate();
            }
            client.isAlive = false;
            client.ping();
        }, 20000);
    });
}

module.exports = PeerProxy;