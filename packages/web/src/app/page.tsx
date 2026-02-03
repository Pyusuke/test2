import Link from 'next/link';
import { CategoryLabels } from '@claude-code-cases/core';

export default function HomePage() {
  const categories = Object.entries(CategoryLabels);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Claude Code 活用事例管理システム
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Claude Codeの業務効率化活用事例を「収集 → 整理 → 検索 → 提案」するシステム
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/usecases" className="btn btn-primary">
            事例を探す
          </Link>
          <Link href="/suggest" className="btn btn-secondary">
            提案を受ける
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">カテゴリ</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/usecases?category=${key}`}
              className="card hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900">{label}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {getCategoryDescription(key)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">機能</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-gray-900 mb-2">検索機能</h3>
            <p className="text-gray-600 text-sm">
              キーワード、カテゴリ、タグで活用事例を検索できます
            </p>
          </div>
          <div className="card">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="font-semibold text-gray-900 mb-2">提案機能</h3>
            <p className="text-gray-600 text-sm">
              現在のタスクや技術スタックに基づいて最適な活用事例を提案します
            </p>
          </div>
          <div className="card">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">12カテゴリ</h3>
            <p className="text-gray-600 text-sm">
              コード生成からセキュリティまで12のカテゴリで分類
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    'code-generation': 'コードの自動生成',
    'code-review': 'コード品質の確認',
    'debugging': 'バグの特定と修正',
    'testing': 'テストの作成と実行',
    'documentation': '文書の作成',
    'refactoring': 'コードの改善',
    'learning': 'コードの理解',
    'automation': '作業の自動化',
    'architecture': 'システム設計',
    'data-analysis': 'データの分析',
    'devops': 'CI/CDの構築',
    'security': 'セキュリティ対策',
  };
  return descriptions[category] || '';
}
