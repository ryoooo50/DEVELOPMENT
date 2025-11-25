# Gitコミットガイド

このプロジェクトをGitにコミットし、Renderでリリースするための手順です。

## コミット前の確認

以下のファイルが`.gitignore`で除外されていることを確認してください：

- `build/` ディレクトリ（ビルド成果物）
- `.gradle/` ディレクトリ
- IDE設定ファイル（`.idea/`, `.vscode/`など）
- ログファイル（`*.log`）
- 一時ファイル（`*.tmp`, `.DS_Store`など）

## コミット手順

### 1. 変更を確認

```bash
git status
```

### 2. すべての変更をステージング

```bash
git add .
```

### 3. コミット

```bash
git commit -m "Initial release: Minigame Platform v1.0.0

- 8種類のミニゲームを実装
- ユーザー情報とランキング機能
- BGMと効果音システム
- Renderデプロイ対応"
```

### 4. GitHubにプッシュ

```bash
# リモートリポジトリが設定されていない場合
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## Renderでのデプロイ

詳細は [DEPLOYMENT.md](DEPLOYMENT.md) を参照してください。

### クイックスタート

1. GitHubにリポジトリを作成
2. コードをプッシュ
3. Renderで「New +」→「Web Service」を選択
4. GitHubリポジトリを接続
5. 設定：
   - Build Command: `./gradlew build`
   - Start Command: `java -jar build/libs/minigame-platform-1.0.0.jar`
6. PostgreSQLデータベースを作成
7. 環境変数を設定
8. デプロイ

## コミットすべきファイル

✅ **コミットする:**
- ソースコード（`src/`）
- 設定ファイル（`build.gradle`, `settings.gradle`）
- Gradle Wrapper（`gradlew`, `gradlew.bat`, `gradle/wrapper/`）
- ドキュメント（`README.md`, `DEPLOYMENT.md`など）
- 設定ファイル（`.gitignore`, `.gitattributes`）
- Render設定（`render.yaml`）

❌ **コミットしない:**
- ビルド成果物（`build/`）
- IDE設定（`.idea/`, `.vscode/`）
- ログファイル
- 一時ファイル

