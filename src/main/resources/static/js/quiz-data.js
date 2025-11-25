// Quiz Question Bank - 100 questions
const QUIZ_QUESTION_BANK = [
    // Programming & Java (20 questions)
    {
        question: 'Javaはどの年にリリースされましたか？',
        options: ['1991', '1995', '2000', '2005'],
        correct: 1,
        category: 'プログラミング'
    },
    {
        question: 'Spring Bootの主な目的は何ですか？',
        options: ['データベース管理', 'アプリケーション開発の簡素化', 'セキュリティ強化', 'パフォーマンス最適化'],
        correct: 1,
        category: 'プログラミング'
    },
    {
        question: 'Gradleは何のツールですか？',
        options: ['コードエディタ', 'ビルドツール', 'データベース', 'Webサーバー'],
        correct: 1,
        category: 'プログラミング'
    },
    {
        question: 'REST APIのRESTは何の略ですか？',
        options: ['Remote Execution System Technology', 'Representational State Transfer', 'Resource Exchange Standard Type', 'Rapid Enterprise Service Tool'],
        correct: 1,
        category: 'プログラミング'
    },
    {
        question: 'JPAは何の略ですか？',
        options: ['Java Programming API', 'Java Persistence API', 'Java Performance API', 'Java Protocol API'],
        correct: 1,
        category: 'プログラミング'
    },
    {
        question: 'Javaの「一次配列」の正しい宣言はどれですか？',
        options: ['int[] arr = new int[10];', 'int arr = new int[10];', 'int arr[] = new int(10);', 'int arr = int[10];'],
        correct: 0,
        category: 'プログラミング'
    },
    {
        question: 'Javaで文字列を比較する正しい方法は？',
        options: ['== 演算子', '.equals() メソッド', '.compare() メソッド', '.match() メソッド'],
        correct: 1,
        category: 'プログラミング'
    },
    {
        question: 'Spring Frameworkの主要な特徴は？',
        options: ['依存性注入', '静的型付け', '関数型プログラミング', '低レベルメモリ管理'],
        correct: 0,
        category: 'プログラミング'
    },
    {
        question: 'MavenとGradleの主な違いは？',
        options: ['GradleはXML、MavenはGroovyを使用', 'GradleはGroovy/Kotlin、MavenはXMLを使用', '違いはない', 'GradleはJava専用'],
        correct: 1,
        category: 'プログラミング'
    },
    {
        question: 'Javaの「継承」を表すキーワードは？',
        options: ['extends', 'implements', 'inherits', 'super'],
        correct: 0,
        category: 'プログラミング'
    },
    {
        question: 'Spring Bootのデフォルトポートは？',
        options: ['3000', '8080', '80', '443'],
        correct: 1,
        category: 'プログラミング'
    },
    {
        question: 'Javaの「インターフェース」を実装するキーワードは？',
        options: ['extends', 'implements', 'inherits', 'interface'],
        correct: 1,
        category: 'プログラミング'
    },
    {
        question: 'JVMは何の略ですか？',
        options: ['Java Virtual Machine', 'Java Variable Manager', 'Java Version Manager', 'Java Vector Machine'],
        correct: 0,
        category: 'プログラミング'
    },
    {
        question: 'Javaの「例外処理」に使用されるキーワードは？',
        options: ['try-catch', 'if-else', 'switch-case', 'for-while'],
        correct: 0,
        category: 'プログラミング'
    },
    {
        question: 'Spring MVCの「MVC」は何の略ですか？',
        options: ['Model-View-Controller', 'Multiple-View-Component', 'Main-View-Container', 'Model-View-Container'],
        correct: 0,
        category: 'プログラミング'
    },
    {
        question: 'Javaの「パッケージ」の目的は？',
        options: ['コードの整理と名前空間の管理', 'メモリの最適化', '実行速度の向上', 'セキュリティの強化'],
        correct: 0,
        category: 'プログラミング'
    },
    {
        question: 'Hibernateは何のフレームワークですか？',
        options: ['ORM（Object-Relational Mapping）', 'Webフレームワーク', 'テストフレームワーク', 'セキュリティフレームワーク'],
        correct: 0,
        category: 'プログラミング'
    },
    {
        question: 'Javaの「ガベージコレクション」の目的は？',
        options: ['自動メモリ管理', 'コードの最適化', '実行速度の向上', 'セキュリティの強化'],
        correct: 0,
        category: 'プログラミング'
    },
    {
        question: 'Spring Bootの「@Autowired」アノテーションの役割は？',
        options: ['依存性注入', 'クラスの初期化', 'メソッドのオーバーライド', '変数の宣言'],
        correct: 0,
        category: 'プログラミング'
    },
    {
        question: 'Javaの「ラムダ式」が導入されたバージョンは？',
        options: ['Java 7', 'Java 8', 'Java 9', 'Java 10'],
        correct: 1,
        category: 'プログラミング'
    },
    
    // Computer Science (20 questions)
    {
        question: 'アルゴリズムの時間計算量O(n log n)で表されるのは？',
        options: ['マージソート', 'バブルソート', '線形探索', '二分探索'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'スタックデータ構造の特徴は？',
        options: ['LIFO（後入れ先出し）', 'FIFO（先入れ先出し）', 'ランダムアクセス', '双方向アクセス'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'キュー（Queue）データ構造の特徴は？',
        options: ['LIFO（後入れ先出し）', 'FIFO（先入れ先出し）', 'ランダムアクセス', '双方向アクセス'],
        correct: 1,
        category: 'コンピュータサイエンス'
    },
    {
        question: '二分探索の時間計算量は？',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correct: 1,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'ハッシュテーブルの平均検索時間は？',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correct: 2,
        category: 'コンピュータサイエンス'
    },
    {
        question: '再帰関数の基本要素は？',
        options: ['ベースケースと再帰ケース', 'ループと条件分岐', '変数と定数', 'クラスとオブジェクト'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: '動的プログラミングの特徴は？',
        options: ['部分問題の結果を再利用', 'すべてを再計算', 'ランダムな順序で処理', '並列処理のみ'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'グラフの「深さ優先探索」の略称は？',
        options: ['DFS', 'BFS', 'DPS', 'BPS'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'グラフの「幅優先探索」の略称は？',
        options: ['DFS', 'BFS', 'DPS', 'BPS'],
        correct: 1,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'バイナリツリーの最大ノード数（高さh）は？',
        options: ['2^h - 1', '2^h', 'h^2', 'h * 2'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'クイックソートの平均時間計算量は？',
        options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'ビッグオー記法で「最悪の場合」を表すのは？',
        options: ['O記法', 'Ω記法', 'Θ記法', 'すべて同じ'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'リンクリストの検索時間計算量は？',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correct: 2,
        category: 'コンピュータサイエンス'
    },
    {
        question: '配列のランダムアクセス時間は？',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'ヒープソートの時間計算量は？',
        options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'トポロジカルソートが適用できるのは？',
        options: ['有向非巡回グラフ（DAG）', '無向グラフ', '完全グラフ', 'すべてのグラフ'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'ダイクストラ法は何を解決しますか？',
        options: ['最短経路問題', '最大フロー問題', '最小全域木', 'グラフの彩色'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'NP完全問題の特徴は？',
        options: ['多項式時間で解けない可能性', '常に多項式時間で解ける', '解が存在しない', '無限ループになる'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'メモ化（Memoization）の目的は？',
        options: ['計算結果のキャッシュ', 'メモリの解放', 'コードの最適化', 'エラーの防止'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    {
        question: 'AVL木の特徴は？',
        options: ['自己平衡二分探索木', '非平衡木', '完全二分木', '線形構造'],
        correct: 0,
        category: 'コンピュータサイエンス'
    },
    
    // Database (15 questions)
    {
        question: 'SQLの「SELECT」文の役割は？',
        options: ['データの取得', 'データの挿入', 'データの更新', 'データの削除'],
        correct: 0,
        category: 'データベース'
    },
    {
        question: 'リレーショナルデータベースの主キーの特徴は？',
        options: ['一意でNULL不可', '重複可能', 'NULL可能', '自動インクリメントのみ'],
        correct: 0,
        category: 'データベース'
    },
    {
        question: 'SQLの「JOIN」の種類でないのは？',
        options: ['INNER JOIN', 'OUTER JOIN', 'CROSS JOIN', 'LOOP JOIN'],
        correct: 3,
        category: 'データベース'
    },
    {
        question: 'ACID特性の「A」は？',
        options: ['Atomicity（原子性）', 'Availability（可用性）', 'Accuracy（正確性）', 'Action（動作）'],
        correct: 0,
        category: 'データベース'
    },
    {
        question: '正規化の主な目的は？',
        options: ['データの重複を減らす', 'データを増やす', 'クエリを遅くする', 'テーブルを削除する'],
        correct: 0,
        category: 'データベース'
    },
    {
        question: 'インデックスの主な目的は？',
        options: ['検索速度の向上', 'データの削除', 'テーブルの作成', 'バックアップ'],
        correct: 0,
        category: 'データベース'
    },
    {
        question: 'トランザクションの「コミット」とは？',
        options: ['変更を確定', '変更を取消', '変更を一時保存', '変更を削除'],
        correct: 0,
        category: 'データベース'
    },
    {
        question: 'SQLの「GROUP BY」の役割は？',
        options: ['データのグループ化', 'データの並び替え', 'データのフィルタリング', 'データの結合'],
        correct: 0,
        category: 'データベース'
    },
    {
        question: 'NoSQLデータベースの種類でないのは？',
        options: ['ドキュメント型', 'キー・バリュー型', 'グラフ型', 'リレーショナル型'],
        correct: 3,
        category: 'データベース'
    },
    {
        question: 'SQLの「HAVING」句は何と一緒に使いますか？',
        options: ['GROUP BY', 'ORDER BY', 'WHERE', 'SELECT'],
        correct: 0,
        category: 'データベース'
    },
    {
        question: '外部キー（Foreign Key）の役割は？',
        options: ['テーブル間の関連付け', '主キーの別名', 'インデックスの作成', 'データの暗号化'],
        correct: 0,
        category: 'データベース'
    },
    {
        question: 'SQLの「UNION」の役割は？',
        options: ['複数のクエリ結果を結合', 'テーブルを結合', 'データを更新', 'データを削除'],
        correct: 0,
        category: 'データベース'
    },
    {
        question: 'データベースの「デッドロック」とは？',
        options: ['複数のトランザクションが相互に待機', 'データの破損', '接続の切断', 'メモリ不足'],
        correct: 0,
        category: 'データベース'
    },
    {
        question: 'SQLの「DISTINCT」の役割は？',
        options: ['重複行の除去', 'データの並び替え', 'データのフィルタリング', 'データの結合'],
        correct: 0,
        category: 'データベース'
    },
    {
        question: 'データベースの「ビュー（View）」とは？',
        options: ['仮想的なテーブル', '物理的なテーブル', 'インデックス', 'ストアドプロシージャ'],
        correct: 0,
        category: 'データベース'
    },
    
    // Network & Web (15 questions)
    {
        question: 'HTTPのデフォルトポートは？',
        options: ['80', '443', '8080', '3000'],
        correct: 0,
        category: 'ネットワーク'
    },
    {
        question: 'HTTPSのデフォルトポートは？',
        options: ['80', '443', '8080', '3000'],
        correct: 1,
        category: 'ネットワーク'
    },
    {
        question: 'TCP/IPの「TCP」は何の略ですか？',
        options: ['Transmission Control Protocol', 'Transfer Control Protocol', 'Transport Control Protocol', 'Transmission Communication Protocol'],
        correct: 0,
        category: 'ネットワーク'
    },
    {
        question: 'DNSの主な役割は？',
        options: ['ドメイン名をIPアドレスに変換', 'IPアドレスを暗号化', 'データを圧縮', '接続を暗号化'],
        correct: 0,
        category: 'ネットワーク'
    },
    {
        question: 'HTTPステータスコード「404」の意味は？',
        options: ['Not Found', 'OK', 'Internal Server Error', 'Forbidden'],
        correct: 0,
        category: 'ネットワーク'
    },
    {
        question: 'HTTPステータスコード「200」の意味は？',
        options: ['OK', 'Not Found', 'Internal Server Error', 'Forbidden'],
        correct: 0,
        category: 'ネットワーク'
    },
    {
        question: 'RESTful APIの特徴でないのは？',
        options: ['ステートレス', 'キャッシュ可能', '統一インターフェース', 'ステートフル'],
        correct: 3,
        category: 'ネットワーク'
    },
    {
        question: 'WebSocketの特徴は？',
        options: ['双方向通信', '一方向通信のみ', 'HTTPのみ', 'TCPを使用しない'],
        correct: 0,
        category: 'ネットワーク'
    },
    {
        question: 'CDNの主な目的は？',
        options: ['コンテンツの配信速度向上', 'データの暗号化', '接続の管理', 'ログの記録'],
        correct: 0,
        category: 'ネットワーク'
    },
    {
        question: 'CORSの意味は？',
        options: ['Cross-Origin Resource Sharing', 'Cross-Origin Request Sharing', 'Cross-Origin Resource Security', 'Cross-Origin Request Security'],
        correct: 0,
        category: 'ネットワーク'
    },
    {
        question: 'OSI参照モデルの層数は？',
        options: ['7層', '5層', '4層', '3層'],
        correct: 0,
        category: 'ネットワーク'
    },
    {
        question: 'HTTPメソッド「PUT」の主な用途は？',
        options: ['リソースの更新', 'リソースの取得', 'リソースの削除', 'リソースの作成'],
        correct: 0,
        category: 'ネットワーク'
    },
    {
        question: 'HTTPメソッド「DELETE」の主な用途は？',
        options: ['リソースの削除', 'リソースの取得', 'リソースの更新', 'リソースの作成'],
        correct: 0,
        category: 'ネットワーク'
    },
    {
        question: 'Cookieの主な用途は？',
        options: ['クライアント側の状態管理', 'サーバー側の状態管理', 'データの暗号化', 'データの圧縮'],
        correct: 0,
        category: 'ネットワーク'
    },
    {
        question: 'JWTの意味は？',
        options: ['JSON Web Token', 'Java Web Token', 'JavaScript Web Token', 'Java Web Transfer'],
        correct: 0,
        category: 'ネットワーク'
    },
    
    // Security (10 questions)
    {
        question: 'SQLインジェクション攻撃を防ぐ方法は？',
        options: ['プリペアドステートメント', 'パスワードの複雑化', 'SSL/TLS', 'キャッシュの使用'],
        correct: 0,
        category: 'セキュリティ'
    },
    {
        question: 'XSS攻撃の意味は？',
        options: ['Cross-Site Scripting', 'Cross-Site Security', 'Cross-Site Storage', 'Cross-Site Session'],
        correct: 0,
        category: 'セキュリティ'
    },
    {
        question: 'CSRF攻撃の意味は？',
        options: ['Cross-Site Request Forgery', 'Cross-Site Resource Forgery', 'Cross-Site Request Filtering', 'Cross-Site Resource Filtering'],
        correct: 0,
        category: 'セキュリティ'
    },
    {
        question: 'ハッシュ関数の特徴は？',
        options: ['一方向性', '可逆性', '対称性', '線形性'],
        correct: 0,
        category: 'セキュリティ'
    },
    {
        question: '暗号化アルゴリズム「AES」の意味は？',
        options: ['Advanced Encryption Standard', 'Advanced Encoding Standard', 'Advanced Encryption System', 'Advanced Encoding System'],
        correct: 0,
        category: 'セキュリティ'
    },
    {
        question: 'OAuthの主な用途は？',
        options: ['認証・認可', 'データの暗号化', 'データの圧縮', 'ログの記録'],
        correct: 0,
        category: 'セキュリティ'
    },
    {
        question: 'HTTPSで使用されるプロトコルは？',
        options: ['TLS/SSL', 'HTTP', 'FTP', 'SMTP'],
        correct: 0,
        category: 'セキュリティ'
    },
    {
        question: 'パスワードの「ソルト（Salt）」の目的は？',
        options: ['レインボーテーブル攻撃の防止', 'パスワードの暗号化', 'パスワードの圧縮', 'パスワードの送信'],
        correct: 0,
        category: 'セキュリティ'
    },
    {
        question: '二要素認証の例でないのは？',
        options: ['パスワードとユーザー名', 'パスワードとSMSコード', 'パスワードと指紋', 'パスワードとトークン'],
        correct: 0,
        category: 'セキュリティ'
    },
    {
        question: '「ゼロデイ攻撃」とは？',
        options: ['未公開の脆弱性を利用した攻撃', '既知の脆弱性を利用した攻撃', 'パスワードクラッキング', 'DDoS攻撃'],
        correct: 0,
        category: 'セキュリティ'
    },
    
    // Software Engineering (10 questions)
    {
        question: 'アジャイル開発の特徴は？',
        options: ['反復的・漸進的開発', '一度にすべてを開発', '厳格な計画', '文書中心'],
        correct: 0,
        category: 'ソフトウェア工学'
    },
    {
        question: 'バージョン管理システム「Git」の特徴は？',
        options: ['分散型', '集中型のみ', 'クラウド型のみ', 'ローカル型のみ'],
        correct: 0,
        category: 'ソフトウェア工学'
    },
    {
        question: 'CI/CDの「CI」は何の略ですか？',
        options: ['Continuous Integration', 'Continuous Improvement', 'Continuous Implementation', 'Continuous Installation'],
        correct: 0,
        category: 'ソフトウェア工学'
    },
    {
        question: 'テスト駆動開発（TDD）の順序は？',
        options: ['Red → Green → Refactor', 'Green → Red → Refactor', 'Refactor → Red → Green', 'Red → Refactor → Green'],
        correct: 0,
        category: 'ソフトウェア工学'
    },
    {
        question: 'デザインパターン「Singleton」の目的は？',
        options: ['インスタンスを1つに制限', 'インスタンスを複数作成', 'インスタンスを削除', 'インスタンスを共有'],
        correct: 0,
        category: 'ソフトウェア工学'
    },
    {
        question: 'デザインパターン「Factory」の目的は？',
        options: ['オブジェクトの生成を抽象化', 'オブジェクトの削除', 'オブジェクトの更新', 'オブジェクトの検索'],
        correct: 0,
        category: 'ソフトウェア工学'
    },
    {
        question: 'リファクタリングの主な目的は？',
        options: ['コードの品質向上', '機能の追加', 'バグの修正', 'パフォーマンスの向上'],
        correct: 0,
        category: 'ソフトウェア工学'
    },
    {
        question: 'コードレビューの主な目的は？',
        options: ['コード品質の向上', 'コードの削除', 'コードの暗号化', 'コードの圧縮'],
        correct: 0,
        category: 'ソフトウェア工学'
    },
    {
        question: 'マイクロサービスアーキテクチャの特徴は？',
        options: ['小さな独立したサービス', '大きな単一サービス', 'データベースのみ', 'フロントエンドのみ'],
        correct: 0,
        category: 'ソフトウェア工学'
    },
    {
        question: 'DevOpsの主な目的は？',
        options: ['開発と運用の統合', '開発と運用の分離', '開発のみ', '運用のみ'],
        correct: 0,
        category: 'ソフトウェア工学'
    },
    
    // General IT (10 questions)
    {
        question: 'CPUの「クロック周波数」の単位は？',
        options: ['Hz（ヘルツ）', 'bps', 'GB', 'W'],
        correct: 0,
        category: 'IT一般'
    },
    {
        question: '1バイトは何ビットですか？',
        options: ['8ビット', '4ビット', '16ビット', '32ビット'],
        correct: 0,
        category: 'IT一般'
    },
    {
        question: 'RAMの意味は？',
        options: ['Random Access Memory', 'Read Access Memory', 'Random Allocation Memory', 'Read Allocation Memory'],
        correct: 0,
        category: 'IT一般'
    },
    {
        question: 'OSの「マルチタスク」とは？',
        options: ['複数のタスクを同時実行', '1つのタスクのみ実行', 'タスクの削除', 'タスクの停止'],
        correct: 0,
        category: 'IT一般'
    },
    {
        question: 'クラウドコンピューティングの「SaaS」は何の略ですか？',
        options: ['Software as a Service', 'System as a Service', 'Server as a Service', 'Storage as a Service'],
        correct: 0,
        category: 'IT一般'
    },
    {
        question: 'Linuxの特徴でないのは？',
        options: ['オープンソース', 'クローズドソース', 'マルチユーザー', 'マルチタスク'],
        correct: 1,
        category: 'IT一般'
    },
    {
        question: '仮想化技術の主な利点は？',
        options: ['リソースの効率的な利用', 'リソースの無駄', 'パフォーマンスの低下', 'セキュリティの低下'],
        correct: 0,
        category: 'IT一般'
    },
    {
        question: 'コンテナ技術「Docker」の特徴は？',
        options: ['アプリケーションのパッケージ化', 'OSのインストール', 'ハードウェアの管理', 'ネットワークの設定'],
        correct: 0,
        category: 'IT一般'
    },
    {
        question: 'APIの意味は？',
        options: ['Application Programming Interface', 'Application Process Interface', 'Application Protocol Interface', 'Application Program Interface'],
        correct: 0,
        category: 'IT一般'
    },
    {
        question: 'JSONの意味は？',
        options: ['JavaScript Object Notation', 'Java Object Notation', 'JavaScript Object Network', 'Java Object Network'],
        correct: 0,
        category: 'IT一般'
    }
];

