'use client';

import { useState } from 'react';
import type { UseCase } from '@claude-code-cases/core';
import { UseCaseCard } from '@/components/UseCaseCard';
import { UseCaseDetail } from '@/components/UseCaseDetail';

export default function SuggestPage() {
  const [currentTask, setCurrentTask] = useState('');
  const [techStack, setTechStack] = useState('');
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [suggestions, setSuggestions] = useState<UseCase[]>([]);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentTask,
          techStack: techStack.split(',').map((s) => s.trim()).filter(Boolean),
          skillLevel,
        }),
      });

      const data = await res.json();
      setSuggestions(data.suggestions || []);
      setReason(data.reason || '');
    } catch (error) {
      console.error('Failed to get suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">活用事例の提案</h1>
      <p className="text-gray-600">
        現在のタスクや状況を入力すると、最適な活用事例を提案します
      </p>

      {/* Context Form */}
      <form onSubmit={handleSuggest} className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            現在のタスク・作業内容
          </label>
          <input
            type="text"
            placeholder="例: APIのユニットテストを作成する"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            使用技術（カンマ区切り）
          </label>
          <input
            type="text"
            placeholder="例: TypeScript, React, Node.js"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            スキルレベル
          </label>
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value as typeof skillLevel)}
            className="input"
          >
            <option value="beginner">初級</option>
            <option value="intermediate">中級</option>
            <option value="advanced">上級</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? '提案を取得中...' : '提案を受ける'}
        </button>
      </form>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-4">
          {reason && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-primary-800">
                <span className="font-semibold">提案理由:</span> {reason}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((useCase) => (
              <UseCaseCard
                key={useCase.id}
                useCase={useCase}
                onClick={() => setSelectedUseCase(useCase)}
              />
            ))}
          </div>
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
