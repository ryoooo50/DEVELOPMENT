# ミニゲームプラットフォーム

Java 17、Spring Boot 3.x、Gradle (Groovy) を使用したミニゲームプラットフォームのWebアプリケーションです。

## 機能

### ゲーム一覧
- **数当てゲーム** 🔢: 1から100までの数字を当てるゲーム
- **タイピングゲーム** ⌨️: 表示された単語を正確にタイピングするゲーム（60秒制限）
- **クイズゲーム** ❓: プログラミングに関するクイズに答えるゲーム
- **記憶力ゲーム** 🧠: カードをめくってペアを見つける記憶力ゲーム
- **反射神経ゲーム** ⚡: 画面が緑色に変わったらすぐにクリックする反射神経ゲーム
- **スネークゲーム** 🐍: クラシックなスネークゲーム
- **計算チャレンジ** 🔢: 60秒間でできるだけ多くの計算問題に答えるゲーム
- **ブロック崩し** 🎯: マウスでパドルを動かしてブロックを壊すゲーム

### その他の機能
- **ランキング機能**: 各ゲームのスコアランキングを表示
- **REST API**: ゲームとスコアを管理するAPI
- **エラーハンドリング**: 統一されたエラーレスポンス
- **バリデーション**: 入力値の検証
- **アニメーション**: スムーズなUIアニメーション

## 技術スタック

- **Java**: 17
- **Spring Boot**: 3.2.0
- **Gradle**: 8.5 (Groovy)
- **データベース**: H2 (インメモリ)
- **テンプレートエンジン**: Thymeleaf
- **フロントエンド**: HTML, CSS, JavaScript

## セットアップ

### 前提条件

- Java 17以上がインストールされていること
- Gradleがインストールされていること（またはGradle Wrapperを使用）

### ビルドと実行

1. プロジェクトをクローンまたはダウンロード

2. プロジェクトディレクトリに移動
   ```bash
   cd DEVELOPMENT
   ```

3. Gradle Wrapperを使用してビルド
   ```bash
   ./gradlew build
   ```

4. アプリケーションを起動
   ```bash
   ./gradlew bootRun
   ```

5. ブラウザでアクセス
   ```
   http://localhost:8080
   ```

## プロジェクト構造

```
src/
├── main/
│   ├── java/
│   │   └── com/minigame/platform/
│   │       ├── config/          # 設定クラス
│   │       ├── controller/      # コントローラー
│   │       │   ├── api/         # REST APIコントローラー
│   │       │   └── WebController.java
│   │       ├── dto/             # データ転送オブジェクト
│   │       ├── model/           # エンティティクラス
│   │       ├── repository/      # リポジトリインターフェース
│   │       ├── service/         # サービスクラス
│   │       └── MinigamePlatformApplication.java
│   └── resources/
│       ├── static/              # 静的リソース
│       │   ├── css/
│       │   └── js/
│       ├── templates/           # Thymeleafテンプレート
│       └── application.properties
└── test/                        # テストコード
```

## API エンドポイント

### ゲームAPI

- `GET /api/games` - すべてのゲームを取得
- `GET /api/games?active=true` - アクティブなゲームのみ取得
- `GET /api/games/{id}` - 特定のゲームを取得
- `GET /api/games/type/{type}` - タイプでゲームを検索

### スコアAPI

- `POST /api/scores` - スコアを送信
- `GET /api/scores/game/{gameId}` - ゲームのスコアランキングを取得
- `GET /api/scores/player/{playerName}` - プレイヤーのスコア履歴を取得

## データベース

### 開発環境
H2データベース（インメモリ）を使用しています。開発用にH2コンソールが有効になっています。

- H2コンソール: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:minigame`
- ユーザー名: `sa`
- パスワード: (空)

### 本番環境
PostgreSQLデータベースを使用します。環境変数で設定してください。

## デプロイ

Renderへのデプロイ方法については、[DEPLOYMENT.md](DEPLOYMENT.md)を参照してください。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

