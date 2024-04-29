const { app, BrowserWindow, screen } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,

    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL("http://localhost:5173");
  //   mainWindow.loadURL(
  //     url.format({
  //       pathname: path.join(__dirname, "./client/dist/index.html"),
  //       protocol: "file:",
  //       slashes: true,
  //     })
  //   );

  mainWindow.webContents.on("dom-ready", () => {
    mainWindow.webContents.executeJavaScript(`
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    history.back(); // Navigate back to previous page
                }
            });
        `);
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.on("minimize", (event) => {
    event.preventDefault();
    mainWindow.hide();
  });
}

app.on("ready", createWindow);

app.on("activate", () => {
  mainWindow === null ? createWindow() : "";
});
