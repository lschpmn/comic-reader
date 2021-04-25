import * as socket from 'socket.io';
import { FILE_GET_DEFAULT, FILE_LIST, FILE_SET_PATH } from '../constants';
import { getDefaultPath, getFileShrub, setApp, setBasePath } from './file-service';

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

  socket.on(FILE_GET_DEFAULT, (res) => res(getDefaultPath()));

  socket.on(FILE_LIST, (path: string, res) => getFileShrub(path).then(files => res(files)));

  socket.on(FILE_SET_PATH, (path: string) => setBasePath(path));
});

httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));

