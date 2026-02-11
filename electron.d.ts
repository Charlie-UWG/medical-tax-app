// electron.d.ts

export interface IElectronAPI {
  saveData: (data: any) => void;
  loadData: () => Promise<any>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
