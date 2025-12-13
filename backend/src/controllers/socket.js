import { Server } from "socket.io";

export const connetToSocket = (server) => {
    const io = new Server(server);
    return io;
}