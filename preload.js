console.log("🚀 PRELOAD SCRIPT RUNNING");
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  writeFile: (data) => ipcRenderer.send("save-data", data),
  readFile: () => ipcRenderer.invoke("load-data"),
});
