# 🏥 医療費控除管理アプリ (Medical Tax Deduction Manager)
[![Biome Badge](https://img.shields.io/badge/Linter-Biome-60a5fa?style=flat&logo=biome&logoColor=white)](https://biomejs.dev/)

確定申告の医療費控除明細書を、日々の入力からNumbers（macOS）での書き出しまでシームレスに行うためのWebアプリです。

## ✨ 特徴

- **リアルタイム控除計算**: 10万円の壁（控除対象）をいつ突破したか、還付金の目安を即座に表示。
- **Numbers最適化**: macOSのNumbersで文字化けせずに開けるBOM付きCSVエクスポート機能。
- **プライバシー配慮**: 医療費データは外部サーバーに送信せず、ブラウザのLocalStorageにのみ保存。→後にパソコンに jsonファイルとして保存する方法に変更予定。
- **モダンなUI**: 
  - **ナイトモード完全対応**: macOSの外観モードに自動連動。
  - **M5 Mac最適化**: 高速なレスポンスと快適なタイピング体験。
- **コード品質**: **Biome**を採用し、堅牢でクリーンなコードベースを維持。

## 🛠 技術スタック

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Linter/Formatter**: [Biome](https://biomejs.dev/)
- **Language**: TypeScript

## 🚀 使い方

1. 領収書を見ながら「日付・氏名・病院・金額」を入力。
2. 上部のダッシュボードで現在の「控除対象額」と「還付予定額」を確認。
3. 確定申告の時期になったら「📊 Numbers形式で書き出す」をクリック。
4. 書き出されたCSVをNumbersで開き、e-Tax等の様式に合わせて調整。

## 📝 計算ロジックについて

本アプリでは以下の簡易計算式を採用しています：
- **実質負担額** = 支払金額合計 - 補填金額合計
- **控除対象額** = 実質負担額 - 100,000円 (※所得200万円以上の場合)
- **還付見込額** = 控除対象額 × 20% (所得税10% + 住民税10% と仮定)

📝 医療費控除 ＋ ふるさと納税 アプリ 制作工程ドキュメント（更新版）
1. 基盤・医療費フェーズ（Done ✅）
[x] プロジェクト初期化・基本UI作成

[x] カレンダー機能導入と日本語化・巨大化

[x] バグ修正（表示位置・ランタイムエラー）

2. ふるさと納税機能追加フェーズ（New! ✨）
[ ] ふるさと納税入力フォーム作成: 自治体名、寄付金額、返礼品、ワンストップ特例の有無などの項目

[ ] 寄付金受領証明書の管理: 発送状況や手元にあるかのチェック機能

[ ] 控除限度額シミュレーター: 年収などを入れると、あといくら寄付できるか目安を表示

[ ] 一覧表示と合計計算: 医療費とは別タブ、あるいは合算での表示切り替え

3. 入力体験・共通強化フェーズ（Working 🚀）
[ ] サジェスト機能: 病院名に加え、自治体名の履歴保存

[ ] データの永続化: localStorage への保存（医療費＋ふるさと納税）

[ ] 削除確認・バリデーション: 入力ミス防止機能

4. 完成フェーズ（Upcoming 📅）
[ ] Numbers/CSV書き出し: 医療費集計フォーム形式と、寄付金控除形式の両方に対応

[ ] GitHub LICENSE設定: 著作権の明記

---
Developed on M5 MacBook Pro.
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.