// src/components/furusato/FurusatoForm.tsx
import { type FC, useId } from "react";
import type { FurusatoRecord, History } from "@/types/tax";

interface FurusatoFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  formData: Omit<FurusatoRecord, "id">;
  setFormData: (data: any) => void;
  history: History;
  onCancelEdit: () => void;
}

export const FurusatoForm: FC<FurusatoFormProps> = ({
  onSubmit,
  formData,
  setFormData,
  history,
  onCancelEdit,
}) => {
  const dateId = useId();
  const cityId = useId();
  const cityListId = useId();
  const amountId = useId();
  const memoId = useId();
  const isOneStopId = useId();

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 mb-12 animate-in fade-in slide-in-from-top-4 duration-500"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 日付 */}
        <div className="space-y-2">
          <label
            htmlFor={dateId}
            className="text-xs font-black text-slate-500 dark:text-slate-400 ml-1 tracking-widest uppercase"
          >
            寄付日
          </label>
          <input
            id={dateId}
            type="date" // 修正：固定値 "date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-pink-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-700 dark:text-slate-200"
          />
        </div>

        {/* 自治体名の入力 */}
        <div className="space-y-2">
          <label
            htmlFor={cityId}
            className="text-xs font-black text-slate-500 dark:text-slate-400 ml-1 tracking-widest uppercase"
          >
            自治体名
          </label>
          <input
            id={cityId}
            type="text"
            required
            list={cityListId}
            placeholder="例：北海道白糠町"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-pink-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-700 dark:text-slate-200"
          />
          <datalist id={cityListId}>
            {history.cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>

        {/* 寄付金額 */}
        <div className="space-y-2">
          <label
            htmlFor={amountId}
            className="text-xs font-black text-slate-500 dark:text-slate-400 ml-1 tracking-widest uppercase"
          >
            寄付金額
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
              ¥
            </span>
            <input
              id={amountId}
              type="number"
              required
              min="0"
              value={formData.amount || ""}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              className="w-full p-4 pl-10 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-pink-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-700 dark:text-slate-200"
            />
          </div>
        </div>

        {/* メモ */}
        <div className="space-y-2">
          <label
            htmlFor={memoId}
            className="text-xs font-black text-slate-500 dark:text-slate-400 ml-1 tracking-widest uppercase"
          >
            返礼品メモ
          </label>
          <input
            id={memoId}
            type="text"
            placeholder="いくら 500g など"
            value={formData.memo}
            onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-pink-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-700 dark:text-slate-200"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        {/* 特例申請チェックボックス */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              id={isOneStopId}
              type="checkbox"
              checked={formData.isOneStop}
              onChange={(e) => setFormData({ ...formData, isOneStop: e.target.checked })}
              className="peer sr-only"
            />
            <div className="w-6 h-6 border-2 border-slate-300 dark:border-slate-600 rounded-lg peer-checked:bg-pink-500 peer-checked:border-pink-500 transition-all flex items-center justify-center text-white font-black text-xs">
              {formData.isOneStop && "✓"}
            </div>
          </div>
          <span className="text-sm font-black text-slate-600 dark:text-slate-300 group-hover:text-pink-500 transition-colors">
            ワンストップ特例申請を利用する
          </span>
        </label>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          type="submit"
          className="flex-1 p-5 rounded-2xl font-black text-lg bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-200 dark:shadow-none transition-all active:scale-95"
        >
          🎁 寄付を記録する
        </button>
        <button
          type="button"
          onClick={onCancelEdit}
          className="px-8 p-5 rounded-2xl font-black text-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-200 transition-all"
        >
          リセット
        </button>
      </div>
    </form>
  );
};
