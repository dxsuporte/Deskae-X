// Modules to control application life and create native browser window
import { app, Tray, Menu, nativeImage } from 'electron'
//loading module path 
import Path from 'path'
//loading open browser
import Open from 'open'
//AdonisJS Server Start
import './server'

let tray //creating tray variable 

app.whenReady().then(() => {
  //json conection .env
  const conection = {
    host: process.env.HOST,
    port: process.env.PORT
  }
  //Loading tray icon image 
  const icon = nativeImage.createFromPath(Path.join(__dirname, './', 'public', './favicon.png'))
  //creating tray icon 
  tray = new Tray(icon)
  //creating icon menu 
  var contextMenu = Menu.buildFromTemplate([
    {
      label: `Server ${conection.host}:${conection.port}`, click: function () {
        Open(`http://${conection.host}:${conection.port}`); //open browser Default 
      }
    },
    {
      label: 'Stop Server', click: function () {
        app.quit() //end application 
      }
    }
  ])
  tray.setContextMenu(contextMenu)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})