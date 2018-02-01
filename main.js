const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const ffmpeg = require('fluent-ffmpeg')

let win
function createWindow() {
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.openDevTools()
}

app.on('ready', createWindow)

ipcMain.on('video:submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    console.log('video duration is: ', metadata.format.duration);
  })
})
