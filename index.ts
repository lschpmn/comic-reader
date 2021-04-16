import { readFile } from 'fs-extra';
// @ts-ignore
import * as getIncrementalPort from 'get-incremental-port';
import * as nodemon from 'nodemon';
import { join } from 'path';
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import * as webpackConfig from './webpack.config.js';
import { exec } from 'child_process';

const PORT = 3000;
const compiler = webpack(webpackConfig);

(async function start() {
  const webpackPort = await getIncrementalPort(PORT);
  const nodemonPort = await getIncrementalPort(webpackPort + 1);

  startNodemon(nodemonPort);

  startWebpack(webpackPort, nodemonPort)
    .catch(err => {
      console.log('Webpack crashed');
      console.log(err);
      process.exit();
    });
})();

function startElectron() {

}

function startNodemon(port: number) {
  console.log('Starting server');
  nodemon({
    script: join(__dirname, 'server', 'index.ts'),
    args: ['--port', port.toString()],
    ext: 'ts',
    watch: [join(__dirname, 'dashboard', 'server'), join(__dirname, 'trader')],
  });
}

async function startWebpack(webpackPort: number, nodemonPort: number) {
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
