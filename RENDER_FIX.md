# Render デプロイエラー修正ガイド

## よくあるエラーと解決方法

### エラー: "Deploy Web Service" を押すとエラー

このエラーは通常、以下のいずれかが原因です：

#### 1. render.yamlの構文エラー

**解決方法**: 手動で設定することを推奨（`render.yaml`を使用しない）

#### 2. ビルドコマンドのエラー

**正しい設定**:
- **Build Command**: `chmod +x ./gradlew && ./gradlew clean build -x test`
- **Start Command**: `java -Dserver.port=$PORT $JAVA_OPTS -jar build/libs/minigame-platform-1.0.0.jar`

#### 3. ポート番号のエラー

**解決方法**: 
- `application-production.properties`で`server.port=${PORT:10000}`を使用
- スタートコマンドで`-Dserver.port=$PORT`を指定

#### 4. データベース接続エラー

**解決方法**:
1. まずPostgreSQLデータベースを手動で作成
2. 環境変数を手動で設定
3. 接続URLが`postgresql://`で始まることを確認

## 推奨デプロイ手順（手動設定）

### ステップ1: データベースを作成

1. Renderダッシュボード → 「New +」→「PostgreSQL」
2. 設定：
   - Name: `minigame-db`
   - Database: `minigame`
   - User: `minigame_user`
   - Plan: Free
3. 「Create Database」をクリック

### ステップ2: Webサービスを作成

1. Renderダッシュボード → 「New +」→「Web Service」
2. GitHubリポジトリを接続
3. **重要**: `render.yaml`を使用せず、手動で設定

**基本設定**:
- Name: `minigame-platform`
- Region: データベースと同じリージョン
- Branch: `main`
- Root Directory: （空白）
- Environment: `Java`
- Build Command: `chmod +x ./gradlew && ./gradlew clean build -x test`
- Start Command: `java -Dserver.port=$PORT $JAVA_OPTS -jar build/libs/minigame-platform-1.0.0.jar`
- Plan: Free

### ステップ3: 環境変数を設定

「Environment」タブで以下を追加：

```
SPRING_PROFILES_ACTIVE=production
SPRING_DATASOURCE_URL=<データベースのInternal Database URL>
SPRING_DATASOURCE_USERNAME=<データベースのユーザー名>
SPRING_DATASOURCE_PASSWORD=<データベースのパスワード>
```

**接続URLの取得方法**:
1. データベースダッシュボードを開く
2. 「Connections」タブ
3. 「Internal Database URL」をコピー
4. `postgres://`で始まる場合は`postgresql://`に変更

### ステップ4: デプロイ

1. 「Create Web Service」をクリック
2. ビルドログを確認
3. エラーがあれば修正

## トラブルシューティング

### ビルドが失敗する

**ログを確認**:
- 「Logs」タブでビルドログを確認
- エラーメッセージを確認

**よくある原因**:
- Gradle Wrapperの実行権限
- Javaバージョンの不一致
- 依存関係のダウンロードエラー

### アプリケーションが起動しない

**確認事項**:
- ポート番号が`$PORT`を使用しているか
- データベース接続情報が正しいか
- 環境変数が設定されているか

### データベース接続エラー

**確認事項**:
- データベースが起動しているか
- 接続URLが正しいか（`postgresql://`で始まる）
- ユーザー名とパスワードが正しいか
- データベース名が正しいか

## デプロイ後の確認

1. アプリケーションURLにアクセス
2. ホームページが表示されるか確認
3. ゲームが動作するか確認
4. ランキングが表示されるか確認

問題があれば、ログを確認してエラーメッセージを特定してください。

