# Render デプロイ設定ガイド

## 手動設定（推奨）

`render.yaml`を使用せず、手動で設定する方が確実です。

### 1. PostgreSQLデータベースの作成

1. Renderダッシュボードで「New +」→「PostgreSQL」を選択
2. 設定：
   - **Name**: `minigame-db`
   - **Database**: `minigame`
   - **User**: `minigame_user`
   - **Region**: お好みのリージョン
   - **Plan**: Free（またはお好みのプラン）
3. 「Create Database」をクリック
4. データベースが作成されたら、接続情報をメモしておく

### 2. Webサービスの作成

1. Renderダッシュボードで「New +」→「Web Service」を選択
2. GitHubリポジトリを接続
3. 基本設定：
   - **Name**: `minigame-platform`
   - **Region**: データベースと同じリージョン
   - **Branch**: `main`
   - **Root Directory**: （空白のまま）
   - **Environment**: `Java`
   - **Build Command**: `./gradlew build -x test`
   - **Start Command**: `java -Dserver.port=$PORT -jar build/libs/minigame-platform-1.0.0.jar`
   - **Plan**: Free（またはお好みのプラン）

### 3. 環境変数の設定

Webサービスの「Environment」タブで、以下の環境変数を追加：

```
SPRING_PROFILES_ACTIVE=production
SPRING_DATASOURCE_URL=<PostgreSQL接続URL>
SPRING_DATASOURCE_USERNAME=<PostgreSQLユーザー名>
SPRING_DATASOURCE_PASSWORD=<PostgreSQLパスワード>
```

**PostgreSQL接続URLの取得方法:**
1. データベースダッシュボードを開く
2. 「Connections」タブを開く
3. 「Internal Database URL」をコピー
4. 形式: `postgresql://user:password@host:port/database`

### 4. デプロイ

1. 「Create Web Service」をクリック
2. ビルドとデプロイが自動的に開始されます
3. デプロイが完了するまで待機（5-10分程度）

## トラブルシューティング

### ビルドエラー

- **エラー**: `./gradlew: Permission denied`
  - **解決**: Renderは自動的に実行権限を付与しますが、問題がある場合は`chmod +x gradlew`をビルドコマンドに追加

- **エラー**: `Java version not found`
  - **解決**: 環境変数に`JAVA_VERSION=17`を追加

### 起動エラー

- **エラー**: `Port already in use`
  - **解決**: `server.port=${PORT:10000}`を使用（Renderは自動的にPORT環境変数を設定）

- **エラー**: `Database connection failed`
  - **解決**: 
    1. データベースが起動しているか確認
    2. 接続URLが正しいか確認
    3. 環境変数が正しく設定されているか確認

### データベース接続エラー

PostgreSQLの接続URLは以下の形式です：
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

Renderの内部接続URLを使用する場合、`postgres://`で始まるURLを`postgresql://`に変更する必要がある場合があります。

## 確認事項

デプロイ前に以下を確認：

- [ ] PostgreSQLデータベースが作成されている
- [ ] 環境変数が正しく設定されている
- [ ] ビルドコマンドが正しい
- [ ] スタートコマンドが正しい
- [ ] ポート番号が`$PORT`環境変数を使用している

