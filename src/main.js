const electron = require('electron');
const {
    app,
    BrowserWindow,
    ipcMain: ipc
} = electron;

let mainWindow;

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 780,
        resizable: false
    });

    mainWindow.openDevTools();

    mainWindow.loadURL(`file://${__dirname}/html/lolbro.html`);

    mainWindow.on('closed', _ => {
        mainWindow = null;
    });

});
