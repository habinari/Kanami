const electron = require('electron');
const {app, BrowserWindow} = electron;

const url = require('url');
const path = require('path');
  
let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({width: 800, height: 1000})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
