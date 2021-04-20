import socket from './socket';

export function getDefaultPath(): Promise<string[]> {
  return new Promise(res => {
    socket.emit('files-get-default', files => {
      console.log(files)
      res(files);
    });
  });
}
