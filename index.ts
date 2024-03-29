import { spawn } from 'child_process';
import { readFile } from 'fs-extra';
// @ts-ignore
import * as getIncrementalPort from 'get-incremental-port';
import * as nodemon from 'nodemon';
import { join } from 'path';
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import * as webpackConfig from './webpack.config.js';

const PORT = 3000;
const compiler = webpack(webpackConfig);

(async function start() {
  const webpackPort = await getIncrementalPort(PORT);
  const nodemonPort = await getIncrementalPort(webpackPort + 1);

  startElectron(webpackPort);

  startNodemon(nodemonPort);

  startWebpack(webpackPort, nodemonPort);
})();

function startElectron(port: number) {
  console.log('starting electron');
  const electronPath = join(__dirname, 'node_modules', '.bin', 'electron.cmd');
  const electronProcess = spawn(`${electronPath}`, ['electron.js', '--port', '' + port]);

  electronProcess.stdout.on('data', data => console.log(data.toString()));
  electronProcess.stderr.on('data', data => console.log(data.toString()));
}

function startNodemon(port: number) {
  console.log('Starting server');
  nodemon({
    args: ['--port', port.toString()],
    ext: 'ts',
    execMap: {
      'ts': join(__dirname, 'node_modules', '.bin', 'ts-node.cmd'),
    },
    script: join(__dirname, 'server', 'index.ts'),
    watch: [join(__dirname, 'server')],
  });
}

function startWebpack(webpackPort: number, nodemonPort: number) {
  console.log('starting webpack');
  const server = new webpackDevServer(compiler, {
    before: app => {
      app.get(['/index.html', '/'], (req, res) => {
        getIndexHtml(nodemonPort)
          .then(html => res.send(html))
          .catch(err => res.status(500).send(err));
      });
    },
    hot: true,
  });

  server.listen(webpackPort, () => console.log(`starting on ${webpackPort}`));
}

async function getIndexHtml(port: number): Promise<string> {
  const html = await readFile(join(__dirname, 'client', 'index.html'), 'utf8');
  return html.replace('__PORT__ = 0', `__PORT__ = ${port}`);
}
