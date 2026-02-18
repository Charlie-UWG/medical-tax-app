import type { FC } from "react";
import { ETagCategoryChecks } from "./EtagCategoryChecks";

interface EtaxSummary {
  providerName: string;
  patientName?: string;
  totalAmount?: number;
  totalReimbursement: number;
  usedCategories: Set<string>; // ← これを忘れずに！
}

interface EtaxModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: EtaxSummary[];
}

export const EtaxModal: React.FC<EtaxModalProps> = ({ isOpen, onClose, summary }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border-4 border-blue-500/20">
        <div className="p-8 border-b rounded-2xl dark:border-slate-700 flex justify-between items-center bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
              <span className="bg-blue-600 text-white text-xs py-1 px-3 rounded-full font-black tracking-widest">
                E-TAX
              </span>
              病院別の合計額
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-bold">
              このままe-Taxの「医療費集計」欄に入力してください
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid gap-4">
            {summary.map((item) => (
              <div
                key={`${item.providerName}-${item.patientName}`}
                className="bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden"
              >
                {/* 上段：基本情報エリア */}
                <div className="p-6 flex justify-between items-center bg-slate-50/50 dark:bg-slate-700/30">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      {item.patientName || "受診者不明"}
                    </span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-100">
                      {item.providerName}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-mono font-black text-blue-600 dark:text-blue-400">
                      ¥{(item.totalAmount ?? 0).toLocaleString()}
                    </span>
                    {item.totalReimbursement > 0 && (
                      <p className="text-[10px] font-bold text-pink-500 mt-1">
                        補填額 ▲¥{item.totalReimbursement.toLocaleString()} 差引済
                      </p>
                    )}
                  </div>
                </div>

                {/* 下段：e-Tax区分チップエリア */}
                {/* 下段：e-Tax区分エリア（1行に4つ並べる） */}
                <div className="p-5 border-t-2 border-dashed border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      e-Tax 入力区分
                    </span>
                  </div>

                  {/* flex-wrap をやめて、強制的に4列のグリッドにする */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "診療・治療", id: "診療・治療" },
                      { label: "医薬品購入", id: "医薬品購入" },
                      { label: "介護サービス", id: "介護サービス" },
                      { label: "その他", id: "その他の医療費（交通費など）" }, // 文字数を抑えるため「その他」に
                    ].map((cat) => {
                      const isActive = item.usedCategories.has(cat.id);
                      return (
                        <div
                          key={cat.id}
                          className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl border-2 transition-all duration-300 ${
                            isActive
                              ? "bg-blue-600 border-blue-600 text-white shadow-lg scale-105"
                              : "bg-transparent border-slate-100 dark:border-slate-700 text-slate-300 dark:text-slate-600 opacity-20"
                          }`}
                        >
                          {/* チェックアイコンを少し小さく、中央配置に */}
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              isActive ? "bg-white text-blue-600" : "bg-slate-100 dark:bg-slate-700"
                            }`}
                          >
                            {isActive ? (
                              <span className="text-[12px] font-black">✓</span>
                            ) : (
                              <span className="text-[10px] font-bold">·</span>
                            )}
                          </div>
                          {/* 文字サイズを調整して、1行に収まるようにする */}
                          <span className="text-[10px] sm:text-[11px] font-black tracking-tighter whitespace-nowrap">
                            {cat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 text-center border-t dark:border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="px-10 py-4 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 rounded-2xl font-black hover:scale-105 transition-transform shadow-lg"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
