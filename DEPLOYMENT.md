# デプロイメントガイド

このドキュメントでは、ミニゲームプラットフォームをRenderにデプロイする方法を説明します。

## Renderへのデプロイ

### 前提条件

1. Renderアカウント（[https://render.com](https://render.com)）
2. GitHubリポジトリ（コードをプッシュ済み）

### デプロイ手順

#### 1. GitHubにリポジトリを作成

```bash
# Gitリポジトリを初期化
git init
git add .
git commit -m "Initial commit: Minigame Platform"

# GitHubにリポジトリを作成し、プッシュ
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

#### 2. Renderでデータベースを作成

1. Renderダッシュボードにログイン
2. 「New +」→「PostgreSQL」を選択
3. データベース名: `minigame-db`
4. プラン: Free（またはお好みのプラン）
5. 「Create Database」をクリック

#### 3. RenderでWebサービスを作成

1. Renderダッシュボードで「New +」→「Web Service」を選択
2. GitHubリポジトリを接続
3. 以下の設定を入力：
   - **Name**: `minigame-platform`
   - **Environment**: `Java`
   - **Build Command**: `./gradlew build -x test`
   - **Start Command**: `java -Dserver.port=$PORT -jar build/libs/minigame-platform-1.0.0.jar`
   - **Plan**: Free（またはお好みのプラン）

**重要**: 
- ビルドコマンドに`-x test`を追加してテストをスキップ（テストが未実装の場合）
- スタートコマンドで`$PORT`環境変数を使用（Renderが自動設定）

#### 4. 環境変数の設定

RenderのWebサービス設定で、以下の環境変数を追加：

- `SPRING_PROFILES_ACTIVE`: `production`
- `SPRING_DATASOURCE_URL`: （PostgreSQLデータベースの接続URL）
- `SPRING_DATASOURCE_USERNAME`: （PostgreSQLデータベースのユーザー名）
- `SPRING_DATASOURCE_PASSWORD`: （PostgreSQLデータベースのパスワード）

**注意**: 
- PostgreSQLデータベースの接続情報は、Renderのデータベースダッシュボードから取得できます
- 接続URLは「Internal Database URL」を使用してください
- URLが`postgres://`で始まる場合は、`postgresql://`に変更してください

#### 5. デプロイ

1. 「Create Web Service」をクリック
2. ビルドとデプロイが自動的に開始されます
3. デプロイが完了すると、URLが表示されます

### render.yamlを使用する場合

`render.yaml`ファイルを使用すると、上記の設定を自動化できます。

1. GitHubに`render.yaml`をコミット
2. Renderダッシュボードで「New +」→「Blueprint」を選択
3. GitHubリポジトリを接続
4. 「Apply」をクリック

これで、Webサービスとデータベースが自動的に作成されます。

## 環境変数

### 本番環境（Production）

- `SPRING_PROFILES_ACTIVE=production`
- `SPRING_DATASOURCE_URL`: PostgreSQL接続URL
- `SPRING_DATASOURCE_USERNAME`: PostgreSQLユーザー名
- `SPRING_DATASOURCE_PASSWORD`: PostgreSQLパスワード
- `PORT`: ポート番号（Renderが自動設定）

### 開発環境（Development）

- `SPRING_PROFILES_ACTIVE=dev`（または未設定）
- H2データベースが自動的に使用されます

## トラブルシューティング

### ビルドエラー

- Java 17が正しくインストールされているか確認
- Gradle Wrapperが正しく動作するか確認: `./gradlew build`

### データベース接続エラー

- 環境変数が正しく設定されているか確認
- PostgreSQLデータベースが作成されているか確認
- 接続URLの形式が正しいか確認

### アプリケーションが起動しない

- ログを確認: Renderダッシュボードの「Logs」タブ
- ポート番号が正しく設定されているか確認
- メモリ不足の可能性を確認

## カスタムドメインの設定

1. RenderダッシュボードでWebサービスを選択
2. 「Settings」タブを開く
3. 「Custom Domains」セクションでドメインを追加
4. DNS設定を更新

## 継続的デプロイ（CD）

RenderはデフォルトでGitHubへのプッシュ時に自動デプロイを行います。

- `main`ブランチへのプッシュで自動デプロイ
- プルリクエストでプレビュー環境を作成可能

## パフォーマンス最適化

### 推奨設定

- **Plan**: Freeプランは開発・テスト用。本番環境ではStarter以上を推奨
- **Auto-Deploy**: 有効化（デフォルト）
- **Health Check Path**: `/` を設定

### スケーリング

- 必要に応じてインスタンス数を増やす
- データベースの接続プールを調整

## セキュリティ

- 環境変数に機密情報を保存（パスワードなど）
- HTTPSを有効化（Renderは自動的に提供）
- 定期的に依存関係を更新

## バックアップ

- PostgreSQLデータベースの自動バックアップを有効化
- 定期的にデータベースをエクスポート

## 監視

- Renderダッシュボードでメトリクスを確認
- ログを定期的に確認
- エラーアラートを設定

