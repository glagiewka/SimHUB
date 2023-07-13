const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.ts')
        }
    })

    win.loadURL('http://localhost:3000')

    setTimeout(() => {
        win.webContents.send('game-connected', 1)
    }, 5000)
}

app.whenReady().then(() => {
    createWindow()



    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
