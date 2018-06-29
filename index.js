let {app, BrowserWindow} = require('electron');

let win;
function createWindow() {
  win = new BrowserWindow({
     webPreferences: {
      nodeIntegration: false
    }
  });
  win.loadFile('home.html')
}

app.on('ready', createWindow);

