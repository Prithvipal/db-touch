const { app, BrowserWindow, Menu, ipcMain } = require('electron')
// require('electron-reload')(__dirname);


// Set Env

process.env.NODE_ENV = "devlopment"

const isDev = process.env.NODE_ENV !== "production" ? true : false
const isMac = process.platform == "darwin" ? true : false
const isLinux = process.platform == "linux" ? true : false


let mainWindow

let newConnWindow

function createWindow () {
  mainWindow= new BrowserWindow({
    width: 930,
    height: 570,
    icon:"",
    title:"DB Editor",
    resizable: isDev?true:false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('./app/home.html')
  mainWindow.webContents.openDevTools()
}

function createNewConnWindow(){
  newConnWindow = new BrowserWindow({
    width: 530,
    height: 470,
    icon:"",
    title:"New Connection",
    resizable: isDev?true:false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  newConnWindow.loadFile('./app/new_connection.html')
  // newConnWindow.webContents.openDevTools()
}

ipcMain.on("connection:new", (e, values) =>{
  createNewConnWindow()
})

app.on("ready", () => {
  createWindow()
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  mainWindow.on("ready", () => mainWindow = null)
})

// app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const template = [  
  ...(isMac ? [{role: 'appMenu'}]: []),
  {
  label: 'Connect',
  submenu: [
    {
      label: 'New',
      click(){
        createNewConnWindow()
      }
    }
  ]
  },
  {
    label: 'View',
    submenu: [
      { label: 'Test' }]
    },
    {
      label: 'Help',
      submenu: [
        { label: 'Test' }]
      }
  ]

