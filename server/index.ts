import { createServer } from 'http';
import * as socket from 'socket.io';
import { FILE_GET_DEFAULT, FILE_LIST } from '../constants';
import { getDefaultPath, getFileShrub } from './file-service';

const PORT = +process.argv[process.argv.indexOf('--port') + 1];

if (!(PORT > 0)) {
  console.log('server requires port, exiting');
  process.exit();
}

const server = createServer();

// @ts-ignore
const io = socket(server, {
  cors: {
    origin: true,
  },
});

io.on('connection', (socket: socket.Socket) => {
  console.log('client connected');

  socket.on(FILE_GET_DEFAULT, (res) => res(getDefaultPath()));

  socket.on(FILE_LIST, (path: string, res) => getFileShrub(path).then(files => res(files)));
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

