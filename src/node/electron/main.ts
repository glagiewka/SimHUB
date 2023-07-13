import {ACAdapter} from "../telemetry-adapters/ac/ACAdapter";
import {Event, EventName, GameConnectedEventArgs} from "@common/event";

const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    })

    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools();

    return win;
}

app.whenReady().then(() => {
    const win = createWindow()

    try {
        new ACAdapter('./dist/bin/SharedMemoryReader/SharedMemoryReader.exe')
            .subscribe(EventName.GameConnected, (e) => {
                // TODO wait for page to show or reply the event
                setTimeout(() => {
                 win.webContents.send(EventName.GameConnected, e)
                }, 5000)
            })
            .subscribe(EventName.GameDisconnected, (e) => win.webContents.send(EventName.GameDisconnected, e))
            .start()
    } catch (e) {
        console.log(e)
    }
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
