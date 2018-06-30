let {app, BrowserWindow} = require('electron');

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
     webPreferences: {
      nodeIntegration: false
    }
  });
  win.loadFile('home.html')
}

app.on('ready', createWindow);

