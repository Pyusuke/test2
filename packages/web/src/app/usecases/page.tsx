'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import type { UseCase } from '@claude-code-cases/core';
import { CategoryLabels } from '@claude-code-cases/core';
import { UseCaseCard } from '@/components/UseCaseCard';
import { UseCaseDetail } from '@/components/UseCaseDetail';

function UseCasesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  const fetchUseCases = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (keyword) params.set('keyword', keyword);
      if (category) params.set('category', category);

      const res = await fetch(`/api/usecases?${params}`);
      const data = await res.json();
      setUseCases(data.useCases || []);
    } catch (error) {
      console.error('Failed to fetch use cases:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUseCases();
  }, [category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUseCases();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">活用事例一覧</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="キーワードで検索..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="input"
            />
          </div>
          <div className="md:w-48">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
            >
              <option value="">すべてのカテゴリ</option>
              {Object.entries(CategoryLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            検索
          </button>
        </div>
      </form>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      ) : useCases.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">該当する事例が見つかりませんでした</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <UseCaseCard
              key={useCase.id}
              useCase={useCase}
              onClick={() => setSelectedUseCase(useCase)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedUseCase && (
        <UseCaseDetail
          useCase={selectedUseCase}
          onClose={() => setSelectedUseCase(null)}
        />
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">活用事例一覧</h1>
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">読み込み中...</p>
      </div>
    </div>
  );
}

export default function UseCasesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <UseCasesContent />
    </Suspense>
  );
}
