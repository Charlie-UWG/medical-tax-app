import type { FC } from "react";

interface UndoToastProps {
  show: boolean;
  lastDeleted: {
    patientName?: string;
    city?: string;
    amount: number;
  } | null;
  onRestore: () => void;
  onClose: () => void;
}

export const UndoToast: FC<UndoToastProps> = ({ show, lastDeleted, onRestore, onClose }) => {
  if (!show || !lastDeleted) return null;

  // 表示する名前を決定（医療費なら patientName、ふるさと納税なら city）
  const displayName = lastDeleted.patientName || lastDeleted.city || "レコード";

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 border border-slate-700">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            削除しました
          </span>
          <span className="text-sm font-bold">
            {displayName} の ¥{lastDeleted.amount.toLocaleString()}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRestore}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-black transition-all active:scale-95"
          >
            元に戻す
          </button>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white px-2">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
