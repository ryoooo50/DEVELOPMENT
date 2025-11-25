# Renderダッシュボード設定手順

## Javaコマンドエラー修正手順

### ステップ1: Webサービスを開く

1. Renderダッシュボードにログイン
2. 「Services」から`minigame-platform`を選択
3. サービス詳細ページを開く

### ステップ2: Start Commandを修正

1. 左側のメニューから「Settings」をクリック
2. 「Start Command」の欄を見つける
3. 現在のコマンドを削除し、以下に変更：

```
/usr/bin/java -Dserver.port=$PORT $JAVA_OPTS -jar build/libs/minigame-platform-1.0.0.jar
```

4. 「Save Changes」をクリック
5. 自動的に再デプロイが開始されます

### ステップ3: 環境変数の確認

1. 左側のメニューから「Environment」をクリック
2. 以下の環境変数が設定されているか確認：

```
SPRING_PROFILES_ACTIVE=production
SPRING_DATASOURCE_URL=<PostgreSQL接続URL>
SPRING_DATASOURCE_USERNAME=<ユーザー名>
SPRING_DATASOURCE_PASSWORD=<パスワード>
```

3. 設定されていない場合は「Add Environment Variable」で追加

### ステップ4: データベース接続情報の取得

1. 左側のメニューから「Databases」をクリック
2. `minigame-db`を選択
3. 「Connections」タブを開く
4. 「Internal Database URL」をコピー
5. 形式: `postgres://user:password@host:port/database`
6. **重要**: `postgres://`を`postgresql://`に変更して使用

### ステップ5: デプロイの確認

1. 左側のメニューから「Logs」をクリック
2. ビルドとデプロイのログを確認
3. エラーがないか確認

## 設定の確認事項

### Build Command
```
chmod +x ./gradlew && ./gradlew clean build -x test
```

### Start Command（修正後）
```
/usr/bin/java -Dserver.port=$PORT $JAVA_OPTS -jar build/libs/minigame-platform-1.0.0.jar
```

### 環境変数（必須）
- `SPRING_PROFILES_ACTIVE=production`
- `SPRING_DATASOURCE_URL`（PostgreSQL接続URL）
- `SPRING_DATASOURCE_USERNAME`（PostgreSQLユーザー名）
- `SPRING_DATASOURCE_PASSWORD`（PostgreSQLパスワード）

## トラブルシューティング

### まだエラーが出る場合

1. **ログを確認**
   - 「Logs」タブで最新のエラーメッセージを確認
   - エラーメッセージをコピー

2. **Start Commandの代替案**
   - 方法1（推奨）: `/usr/bin/java -Dserver.port=$PORT $JAVA_OPTS -jar build/libs/minigame-platform-1.0.0.jar`
   - 方法2: `./gradlew bootRun --args='--server.port=$PORT'`

3. **環境変数の再確認**
   - すべての環境変数が正しく設定されているか
   - データベース接続URLが正しい形式か

4. **再デプロイ**
   - 「Manual Deploy」→「Deploy latest commit」をクリック

## デプロイ成功の確認

デプロイが成功すると：
- 「Logs」に「Started MinigamePlatformApplication」と表示される
- アプリケーションURLにアクセスできる
- ホームページが表示される

