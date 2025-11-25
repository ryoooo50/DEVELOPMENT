# Render 無料版デプロイガイド

Renderの無料版（Free Tier）でもデプロイ可能です。以下の手順に従ってください。

## 無料版の制限事項

- **スリープ**: 15分間アクセスがないと自動的にスリープします（次回アクセス時に自動起動）
- **リソース制限**: CPU/メモリに制限があります
- **データベース**: PostgreSQL無料版は90日間のみ利用可能（その後は有料プランが必要）

## 無料版でのデプロイ手順

### 方法1: 手動設定（推奨）

#### ステップ1: PostgreSQLデータベースを作成

1. Renderダッシュボード → 「New +」→「PostgreSQL」
2. 設定：
   - **Name**: `minigame-db`
   - **Database**: `minigame`
   - **User**: `minigame_user`
   - **Region**: お好みのリージョン（`Oregon (US West)`が最も安定）
   - **PostgreSQL Version**: 最新版
   - **Plan**: **Free**
3. 「Create Database」をクリック
4. データベースが作成されるまで待機（1-2分）

#### ステップ2: Webサービスを作成

1. Renderダッシュボード → 「New +」→「Web Service」
2. GitHubリポジトリを接続
3. 基本設定：
   - **Name**: `minigame-platform`
   - **Region**: データベースと同じリージョン（重要！）
   - **Branch**: `main`
   - **Root Directory**: （空白のまま）
   - **Environment**: `Java`
   - **Build Command**: `chmod +x ./gradlew && ./gradlew clean build -x test`
   - **Start Command（推奨）**: `./gradlew bootRun --args='--server.port=$PORT'`
   - **Start Command（代替）**: `/usr/bin/java -Dserver.port=$PORT $JAVA_OPTS -jar build/libs/minigame-platform-1.0.0.jar`
   - **Plan**: **Free**

#### ステップ3: 環境変数の設定

Webサービスの「Environment」タブで以下を追加：

1. **データベース接続情報を取得**:
   - データベースダッシュボードを開く
   - 「Connections」タブを開く
   - 「Internal Database URL」をコピー
   - 例: `postgres://minigame_user:password@dpg-xxxxx-a.oregon-postgres.render.com/minigame`

2. **環境変数を追加**:
   ```
   SPRING_PROFILES_ACTIVE=production
   SPRING_DATASOURCE_URL=postgresql://minigame_user:password@dpg-xxxxx-a.oregon-postgres.render.com:5432/minigame
   SPRING_DATASOURCE_USERNAME=minigame_user
   SPRING_DATASOURCE_PASSWORD=<パスワード>
   ```

   **重要**: 
   - URLが`postgres://`で始まる場合は、`postgresql://`に変更
   - ポート番号（`:5432`）を明示的に追加

#### ステップ4: デプロイ

1. 「Create Web Service」をクリック
2. ビルドが開始されます（5-10分かかる場合があります）
3. デプロイが完了すると、URLが表示されます

### 方法2: render.yamlを使用（上級者向け）

`render.yaml`を使用する場合も、無料版で動作します。ただし、手動設定の方が確実です。

## 無料版での注意事項

### 1. スリープ対策

無料版は15分間アクセスがないとスリープします。対策：

- **Uptime Robot**などの無料監視サービスを使用して定期的にアクセス
- または、スリープを許容する（次回アクセス時に自動起動、約30秒かかります）

### 2. データベースの90日制限

PostgreSQL無料版は90日間のみ利用可能です。その後は：

- 有料プランにアップグレード（$7/月から）
- または、新しいデータベースを作成（データは失われます）

### 3. パフォーマンス

無料版はリソース制限があるため：

- 初回アクセス時に起動時間がかかる場合があります
- 同時接続数に制限があります
- レスポンス時間がやや遅い場合があります

## トラブルシューティング

### ビルドエラー

**エラー**: `./gradlew: Permission denied`
- **解決**: ビルドコマンドに`chmod +x ./gradlew &&`を追加済み

**エラー**: `Java version not found`
- **解決**: 環境変数に`JAVA_VERSION=17`を追加（Renderが自動設定する場合もあります）

### 起動エラー

**エラー**: `Port already in use`
- **解決**: `$PORT`環境変数を使用（Renderが自動設定）

**エラー**: `Database connection failed`
- **解決**: 
  1. データベースが同じリージョンにあるか確認
  2. Internal Database URLを使用しているか確認
  3. URLが`postgresql://`で始まるか確認
  4. ポート番号（`:5432`）が含まれているか確認

### データベース接続URLの形式

正しい形式：
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

例：
```
postgresql://minigame_user:abc123@dpg-xxxxx-a.oregon-postgres.render.com:5432/minigame
```

## 無料版での動作確認

デプロイ後、以下を確認：

1. ✅ アプリケーションが起動しているか
2. ✅ ホームページが表示されるか
3. ✅ ゲームが動作するか
4. ✅ データベースに接続できているか（スコアが保存されるか）
5. ✅ ランキングが表示されるか

## コスト

- **Webサービス**: 無料（スリープあり）
- **PostgreSQL**: 無料（90日間のみ）
- **合計**: $0/月（90日間）

90日後は、PostgreSQLが$7/月から必要になります。

## 推奨設定（無料版）

- **Region**: `Oregon (US West)`（最も安定）
- **Plan**: Free（両方とも）
- **Auto-Deploy**: 有効（デフォルト）
- **Health Check**: `/` を設定

これで無料版でもデプロイできます！

