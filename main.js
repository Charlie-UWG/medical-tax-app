const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const fs = require("node:fs");

function createWindow() {
  // 修正箇所: app.isPackaged を判定してパスを切り替える
  const preloadPath = app.isPackaged
    ? path.join(__dirname, "preload.js") // ビルド後はこの位置になる
    : path.join(__dirname, "preload.js"); // 開発中もこの位置（rootにあるので）

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: preloadPath, // ここに修正後のパスを渡す
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    const indexPath = path.join(__dirname, "out", "index.html");
    if (!fs.existsSync(indexPath)) {
      console.error("HTMLが見つかりません:", indexPath);
    }
    mainWindow.loadFile(indexPath);
  }
}

// --- データの保存先と通信ロジック ---
const DATA_PATH = path.join(app.getPath("userData"), "data.json");
console.log("📂 実際の保存場所はここです:", DATA_PATH); // ← これを追加

ipcMain.on("save-data", (_event, data) => {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Save Error:", err);
  }
});

ipcMain.handle("load-data", () => {
  try {
    if (fs.existsSync(DATA_PATH)) {
      const data = fs.readFileSync(DATA_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Load Error:", err);
  }
  return null;
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
