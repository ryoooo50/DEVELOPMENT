# Render Javaコマンドエラー修正

## エラー: `java: command not found`

このエラーは、RenderでJavaコマンドのパスが正しく設定されていない場合に発生します。

## Renderダッシュボードでの修正手順

### 1. Webサービスを開く
- Renderダッシュボード → 「Services」→ `minigame-platform`を選択

### 2. Settingsタブを開く
- 左側メニューから「Settings」をクリック

### 3. Start Commandを修正
- 「Start Command」の欄を見つける
- 現在の値を以下に変更：
```
/usr/bin/java -Dserver.port=$PORT $JAVA_OPTS -jar build/libs/minigame-platform-1.0.0.jar
```

### 4. 保存
- 「Save Changes」をクリック
- 自動的に再デプロイが開始されます

## 解決方法

### 方法1: Javaのフルパスを使用（推奨）

**Start Command**を以下に変更：

```
/usr/bin/java -Dserver.port=$PORT $JAVA_OPTS -jar build/libs/minigame-platform-1.0.0.jar
```

### 方法2: GradleのbootRunを使用

**Start Command**を以下に変更：

```
./gradlew bootRun --args='--server.port=$PORT'
```

**注意**: この方法は動作しますが、本番環境ではJARファイルの方が推奨されます。

### 方法3: JAVA_HOME環境変数を設定

Webサービスの「Environment」タブで以下を追加：

```
JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
PATH=$JAVA_HOME/bin:$PATH
```

その後、通常の`java`コマンドを使用できます。

## Renderダッシュボードでの設定変更

1. RenderダッシュボードでWebサービスを開く
2. 「Settings」タブを開く
3. 「Start Command」を編集
4. 上記のいずれかの方法を使用
5. 「Save Changes」をクリック
6. 自動的に再デプロイが開始されます

## 推奨設定

**Start Command（推奨）**:
```
/usr/bin/java -Dserver.port=$PORT $JAVA_OPTS -jar build/libs/minigame-platform-1.0.0.jar
```

この設定で、Javaコマンドが見つからないエラーが解決されます。

