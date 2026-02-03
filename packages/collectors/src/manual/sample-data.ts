import type { UseCase } from '@claude-code-cases/core';

// UUIDを生成するヘルパー関数
function createUUID(num: number): string {
  const hex = num.toString(16).padStart(8, '0');
  return `${hex}-0000-4000-8000-000000000000`;
}

const now = new Date();

/**
 * 12カテゴリに対応した12件のサンプル事例
 */
export const sampleUseCases: UseCase[] = [
  // 1. コード生成
  {
    id: createUUID(1),
    title: 'APIエンドポイントの自動生成',
    description: 'REST APIのCRUDエンドポイントをデータモデルから自動生成します。型安全なコードを素早く作成できます。',
    category: 'code-generation',
    tags: ['API', 'REST', 'TypeScript', 'CRUD'],
    prompt: 'Userモデルに対するCRUDエンドポイントを作成してください。Express.jsとTypeScriptを使用し、バリデーションも含めてください。',
    example: `// 生成されるコード例
router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});`,
    benefits: ['開発時間を80%削減', '一貫性のあるAPI設計', 'バグの少ないコード'],
    difficulty: 'beginner',
    estimatedTimeSaved: '2-3時間',
    source: 'community',
    createdAt: now,
    updatedAt: now,
  },

  // 2. コードレビュー
  {
    id: createUUID(2),
    title: 'プルリクエストの自動レビュー',
    description: 'コードの品質、セキュリティ、パフォーマンスの観点から自動的にレビューコメントを生成します。',
    category: 'code-review',
    tags: ['PR', 'レビュー', '品質', 'ベストプラクティス'],
    prompt: '以下のコードをレビューしてください。セキュリティ、パフォーマンス、可読性の観点からフィードバックをお願いします。',
    benefits: ['レビュー時間の短縮', '見落としの防止', '学習効果'],
    difficulty: 'intermediate',
    estimatedTimeSaved: '30分-1時間/PR',
    source: 'community',
    createdAt: now,
    updatedAt: now,
  },

  // 3. デバッグ
  {
    id: createUUID(3),
    title: 'エラースタックトレースの解析',
    description: 'エラーメッセージとスタックトレースから原因を特定し、修正方法を提案します。',
    category: 'debugging',
    tags: ['エラー', 'スタックトレース', 'トラブルシューティング'],
    prompt: '以下のエラーが発生しています。原因と解決策を教えてください：[エラーメッセージ]',
    example: `Error: Cannot read property 'map' of undefined
    at UserList.render (UserList.js:15)

解決策：データのnullチェックを追加
const users = data?.users || [];`,
    benefits: ['デバッグ時間の短縮', '根本原因の特定', '再発防止'],
    difficulty: 'beginner',
    estimatedTimeSaved: '30分-2時間',
    source: 'community',
    createdAt: now,
    updatedAt: now,
  },

  // 4. テスト
  {
    id: createUUID(4),
    title: 'ユニットテストの自動生成',
    description: '関数やコンポーネントに対するユニットテストを自動生成します。エッジケースも網羅します。',
    category: 'testing',
    tags: ['テスト', 'Jest', 'ユニットテスト', 'TDD'],
    prompt: '以下の関数に対するJestテストを作成してください。正常系、異常系、エッジケースを含めてください。',
    example: `describe('calculateTotal', () => {
  it('should return sum of items', () => {
    expect(calculateTotal([100, 200])).toBe(300);
  });
  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});`,
    benefits: ['テストカバレッジ向上', 'テスト作成時間の削減', '品質向上'],
    difficulty: 'intermediate',
    estimatedTimeSaved: '1-2時間',
    source: 'community',
    createdAt: now,
    updatedAt: now,
  },

  // 5. ドキュメント作成
  {
    id: createUUID(5),
    title: 'API仕様書の自動生成',
    description: 'コードからOpenAPI/Swagger形式のAPI仕様書を自動生成します。',
    category: 'documentation',
    tags: ['ドキュメント', 'OpenAPI', 'Swagger', 'API'],
    prompt: '以下のAPIコードからOpenAPI 3.0形式の仕様書を生成してください。',
    benefits: ['ドキュメント作成時間の削減', '常に最新の状態を維持', 'チーム連携の向上'],
    difficulty: 'intermediate',
    estimatedTimeSaved: '2-4時間',
    source: 'community',
    createdAt: now,
    updatedAt: now,
  },

  // 6. リファクタリング
  {
    id: createUUID(6),
    title: 'レガシーコードのモダン化',
    description: '古いJavaScriptコードをモダンなES6+/TypeScript構文にリファクタリングします。',
    category: 'refactoring',
    tags: ['リファクタリング', 'TypeScript', 'ES6', 'モダン化'],
    prompt: '以下のコードをTypeScriptとES6+の構文を使用してリファクタリングしてください。',
    example: `// Before
var self = this;
promise.then(function(data) {
  self.data = data;
});

// After
promise.then((data) => {
  this.data = data;
});`,
    benefits: ['コード品質の向上', '保守性の向上', 'パフォーマンス改善'],
    difficulty: 'intermediate',
    estimatedTimeSaved: '1-3時間',
    source: 'community',
    createdAt: now,
    updatedAt: now,
  },

  // 7. 学習・理解
  {
    id: createUUID(7),
    title: 'コードベースの理解支援',
    description: '大規模なコードベースの構造や設計パターンを解説し、理解を支援します。',
    category: 'learning',
    tags: ['学習', 'コード理解', 'アーキテクチャ', 'オンボーディング'],
    prompt: 'このプロジェクトの全体構造を説明してください。主要なコンポーネントとその関係性を教えてください。',
    benefits: ['オンボーディング時間の短縮', '設計意図の理解', 'チーム全体の生産性向上'],
    difficulty: 'beginner',
    estimatedTimeSaved: '数日-1週間',
    source: 'community',
    createdAt: now,
    updatedAt: now,
  },

  // 8. 自動化
  {
    id: createUUID(8),
    title: 'シェルスクリプトの作成',
    description: '繰り返し作業を自動化するシェルスクリプトを作成します。',
    category: 'automation',
    tags: ['自動化', 'シェル', 'Bash', 'スクリプト'],
    prompt: 'データベースのバックアップを毎日実行し、7日以上古いバックアップを削除するシェルスクリプトを作成してください。',
    example: `#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d)
pg_dump mydb > "$BACKUP_DIR/backup_$DATE.sql"
find "$BACKUP_DIR" -name "*.sql" -mtime +7 -delete`,
    benefits: ['作業時間の削減', 'ヒューマンエラーの防止', '一貫性の確保'],
    difficulty: 'intermediate',
    estimatedTimeSaved: '毎回15-30分',
    source: 'community',
    createdAt: now,
    updatedAt: now,
  },

  // 9. 設計・アーキテクチャ
  {
    id: createUUID(9),
    title: 'システム設計の相談',
    description: 'マイクロサービス、データベース設計、APIアーキテクチャなどの設計相談に対応します。',
    category: 'architecture',
    tags: ['設計', 'アーキテクチャ', 'マイクロサービス', 'スケーラビリティ'],
    prompt: 'ECサイトのマイクロサービスアーキテクチャを設計したいです。ユーザー、商品、注文、決済の各サービスの分割方法と通信方式を提案してください。',
    benefits: ['設計品質の向上', '将来の拡張性確保', 'チーム間の認識合わせ'],
    difficulty: 'advanced',
    estimatedTimeSaved: '1-2週間',
    source: 'community',
    createdAt: now,
    updatedAt: now,
  },

  // 10. データ分析
  {
    id: createUUID(10),
    title: 'SQLクエリの最適化',
    description: '遅いSQLクエリを分析し、最適化の提案とインデックス設計を行います。',
    category: 'data-analysis',
    tags: ['SQL', 'データベース', '最適化', 'パフォーマンス'],
    prompt: '以下のSQLクエリが遅いです。実行計画を分析し、最適化方法を提案してください。',
    example: `-- Before: Full table scan
SELECT * FROM orders WHERE status = 'pending';

-- After: Index使用
CREATE INDEX idx_orders_status ON orders(status);
SELECT id, customer_id, total FROM orders WHERE status = 'pending';`,
    benefits: ['クエリ実行時間の短縮', 'サーバー負荷の軽減', 'コスト削減'],
    difficulty: 'intermediate',
    estimatedTimeSaved: '1-4時間',
    source: 'community',
    createdAt: now,
    updatedAt: now,
  },

  // 11. DevOps・CI/CD
  {
    id: createUUID(11),
    title: 'GitHub Actionsワークフロー作成',
    description: 'CI/CDパイプラインをGitHub Actionsで構築します。テスト、ビルド、デプロイを自動化します。',
    category: 'devops',
    tags: ['GitHub Actions', 'CI/CD', 'デプロイ', '自動化'],
    prompt: 'Node.jsプロジェクト用のGitHub Actionsワークフローを作成してください。テスト実行、ビルド、Vercelへのデプロイを含めてください。',
    example: `name: CI/CD
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: npm run build`,
    benefits: ['デプロイの自動化', '品質の一貫性', 'リリース頻度の向上'],
    difficulty: 'intermediate',
    estimatedTimeSaved: '数時間-1日',
    source: 'community',
    createdAt: now,
    updatedAt: now,
  },

  // 12. セキュリティ
  {
    id: createUUID(12),
    title: 'セキュリティ脆弱性のスキャン',
    description: 'コードのセキュリティ脆弱性を検出し、修正方法を提案します。OWASP Top 10に対応。',
    category: 'security',
    tags: ['セキュリティ', 'OWASP', '脆弱性', 'XSS', 'SQLインジェクション'],
    prompt: '以下のコードにセキュリティ上の問題がないか確認してください。脆弱性がある場合は修正方法を教えてください。',
    example: `// 脆弱なコード
const query = "SELECT * FROM users WHERE id = " + userId;

// 修正後
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);`,
    benefits: ['セキュリティリスクの低減', '早期発見・修正', 'コンプライアンス対応'],
    difficulty: 'advanced',
    estimatedTimeSaved: '数時間-数日',
    source: 'community',
    createdAt: now,
    updatedAt: now,
  },
];
