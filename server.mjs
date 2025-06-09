import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3002;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // ...
    console.log("connected " + socket.id);

    socket.on('join_room', ({room, username}) => {
      socket.join(room);
      console.log('joined room ' + room + ' with username ' + username);

      socket.to(room).emit('user_joined', `User ${username} joined room ${room}`);

      socket.on('message', (message) => {
        socket.to(room).emit('message', {message, sender: username});
        console.log('message from ' + username + ' to ' + room + ': ' + message);
      });
      socket.on('typing', (typing) => {
        socket.to(room).emit('typing', {typing, sender: username});
        console.log('typing from ' + username + ' to ' + room + ': ' + message);
      });

    });

    socket.on('user_leave', ({room, username}) => {
      socket.leave(room);
      socket.to(room).emit('user_leave', `User ${username} left room ${room}`);

      console.log('user left room ' + room + ' with username ' + username);
    });

    socket.on('disconnect', () => { 
      console.log('disconnected' + socket.id);
    });
  });


  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
