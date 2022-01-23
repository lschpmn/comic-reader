import * as socket from 'socket.io';
import { attachSocket, setApp } from './file-service';

const PORT = +process.argv[process.argv.indexOf('--port') + 1];
const app = require('express')();
const httpServer = require('http').createServer(app);

if (!(PORT > 0)) {
  console.log('server requires port, exiting');
  process.exit();
}

// @ts-ignore
const io = socket(httpServer, {
  cors: {
    origin: true,
  },
});

setApp(app);

io.on('connection', (socket: socket.Socket) => {
  console.log('client connected');
  attachSocket(socket);
});

httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));

