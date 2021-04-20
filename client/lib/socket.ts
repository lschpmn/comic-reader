import { io } from 'socket.io-client';

const port: number = (window as any).__PORT__;

const path = `http://127.0.0.1:${port}`;

const socket = io(path);

export default socket;
