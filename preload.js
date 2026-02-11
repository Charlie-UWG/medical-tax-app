console.log("🚀 PRELOAD SCRIPT RUNNING");
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  saveData: (data) => ipcRenderer.send("save-data", data),
  loadData: () => ipcRenderer.invoke("load-data"),
});
