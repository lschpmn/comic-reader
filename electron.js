'use strict';

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { join } = require('path');

const portIndex = process.argv.indexOf('--port');

const IS_PROD = process.argv.includes('--prod');
const PORT = portIndex > 0 && process.argv[portIndex + 1];

let win;

function createWindow() {
  win = new BrowserWindow({
    height: 720 + (IS_PROD ? 0 : 400),
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: false,
      nodeIntegration: true,
    },
    width: 1280,
  });

  IS_PROD
    ? win
      .loadFile(join(__dirname, 'public', 'index.html'))
      .catch(console.log)
    : win
      .loadURL(`http://127.0.0.1:${PORT}/index.html`)
      .catch(console.log);

  IS_PROD || win.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  console.log('windows closed');
  if (IS_PROD) app.quit();
  else createWindow();
});

ipcMain.handle('select-directory', async (event, path) => {
  try {
    return await dialog.showOpenDialog({
      defaultPath: path,
      properties: ['openDirectory'],
    });
  } catch (err) {
    console.log('dialog error');
    console.log(err);
    return null;
  }
});
