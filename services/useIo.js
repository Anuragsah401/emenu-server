import {Server} from "socket.io";

export const io = new Server(http, {
    cors: {
      origin: "*"
    }
  });

  io.on('connection', socket => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });