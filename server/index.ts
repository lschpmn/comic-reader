import * as socket from 'socket.io';
import { createServer } from 'http';
import { getDefaultPath } from './file-service';

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

  socket.on('files-get-default', (res) => getDefaultPath().then(files => res(files)));
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

