# カフェスタンドフォーシーズン Webサイト

## 概要

- **ドメイン**: http://ikeyamaspring.jp/
- **技術**: HTML / CSS / JavaScript（静的サイト・フレームワークなし）
- **サーバー**: ロリポップ（FTPデプロイ）
- **GitHub管理**

---

## フォルダ構成

```
ikeyamaspring.jp/
├── index.html           # TOPページ
├── menu.html            # メニュー・商品紹介
├── about.html           # お店について
├── access.html          # アクセス・ご利用案内
├── contact.html         # お問い合わせ・お知らせ
│
├── css/
│   ├── reset.css        # CSSリセット（destyle.css相当）
│   ├── style.css        # 全ページ共通スタイル（ヘッダー・フッター・変数等）
│   └── pages/
│       ├── top.css
│       ├── menu.css
│       ├── about.css
│       ├── access.css
│       └── contact.css
│
├── js/
│   └── main.js          # ハンバーガーメニュー・スクロールアニメーション等
│
├── images/
│   ├── logo/            # ロゴ画像置き場
│   ├── hero/            # ファーストビュー背景写真（hero-main.jpg）
│   ├── menu/            # メニュー・商品写真
│   ├── gallery/         # 店舗・風景・雰囲気写真
│   └── icons/           # SVGアイコン等
│
├── .gitignore
└── README.md
```

---

## デプロイ手順

1. ローカルでファイルを編集
2. GitHubにプッシュ
3. ロリポップFTPにアップロード

| 項目 | 内容 |
|------|------|
| FTPホスト | （記入欄） |
| ユーザー名 | （記入欄） |
| アップロード先 | `/ikeyamaspring.jp/` |

---

## ロリポップ設定メモ

| 項目 | 内容 |
|------|------|
| PHPバージョン | （記入欄） |
| MySQLデータベース | 不使用（静的サイト） |
| SSL | （設定状況を記入） |

---

## 更新方法

| 更新内容 | 手順 |
|----------|------|
| テキスト・メニュー変更 | 各HTMLファイルを直接編集 |
| 写真変更 | `images/` 以下のファイルを同名で差し替え |
| お知らせ追加 | `contact.html` のお知らせ欄に `<li>` を追加 |
| 季節メニュー更新 | `menu.html` の該当カードを編集 |

---

## お問い合わせフォーム設定

`contact.html` のフォームは [Formspree](https://formspree.io/) を使用しています。

```html
<form action="https://formspree.io/f/XXXXXXXX" method="POST">
```

`XXXXXXXX` の部分を実際のFormspree フォームIDに差し替えてください。

---

## 必要な画像ファイル一覧

### `images/hero/`
- `hero-main.jpg` — TOPページ ファーストビュー背景

### `images/menu/`
- `ice-coffee.jpg` — 名水アイスコーヒー
- `hot-coffee.jpg` — ホットコーヒー
- `cafe-latte.jpg` — カフェラテ
- `original-drink.jpg` — オリジナルドリンク
- `soda.jpg` — 名水ソーダ
- `jelly.jpg` — 名水ゼリー
- `seasonal.jpg` — 季節のおすすめ
- `seasonal-sweets.jpg` — 季節のスイーツ
- `goods.jpg` — アメニティグッズ
- `goshuincho.jpg` — 御朱印帳

### `images/gallery/`
- `exterior.jpg` — 店舗外観
- `bench.jpg` — ベンチ・休憩スペース
- `nature.jpg` — 産山村の自然
- `water-source.jpg` — 池山水源
- `scene.jpg` — 利用シーン
- `coffee-making.jpg` — コーヒー抽出
- `cafe-space.jpg` — カフェの空間

---

## 使用外部リソース

- [Google Fonts](https://fonts.google.com/) — Noto Serif JP / Noto Sans JP / Cormorant Garamond
- [Font Awesome 6.5](https://fontawesome.com/) — アイコン
- [Formspree](https://formspree.io/) — お問い合わせフォーム送信
