import * as socketIO from 'socket.io';
import logger from './logger.service';

let activeUsers: socketIO.Socket[] = [];

export const socketInit = (io: socketIO.Server, port: any) => {
    logger.info(`Socket service is up and running on port -> ${port}`);

    io.on("connection", async (socket: socketIO.Socket) => {
        // push into array.
        activeUsers.push(socket)

        // socket is disconnected 
        io.on("disconnect", () => {
            let i = activeUsers.indexOf(socket);
            activeUsers.splice(i, 1);
        });

        // socket joins a room.
        socket.on('joinRooms', (roomsArray: string[]) => {
            socket.join(roomsArray, () => {
                console.log(`Successfully joined to rooms: ${roomsArray}`);
            });
        });

        // socket leaves a room.
        socket.on('leaveRoom', (room: string) => { })
    });
}