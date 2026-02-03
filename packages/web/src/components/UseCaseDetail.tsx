'use client';

import type { UseCase } from '@claude-code-cases/core';
import { CategoryLabels } from '@claude-code-cases/core';

interface UseCaseDetailProps {
  useCase: UseCase;
  onClose: () => void;
}

const difficultyLabels = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
};

export function UseCaseDetail({ useCase, onClose }: UseCaseDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{useCase.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            <span className="badge badge-primary">
              {CategoryLabels[useCase.category]}
            </span>
            <span className="badge badge-gray">
              {difficultyLabels[useCase.difficulty]}
            </span>
            {useCase.estimatedTimeSaved && (
              <span className="badge badge-gray">
                削減: {useCase.estimatedTimeSaved}
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{useCase.description}</p>

          {useCase.prompt && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">プロンプト例</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                {useCase.prompt}
              </div>
            </div>
          )}

          {useCase.example && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">コード例</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
                <code>{useCase.example}</code>
              </pre>
            </div>
          )}

          {useCase.benefits.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">メリット</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {useCase.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {useCase.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {useCase.tags.map((tag) => (
                  <span key={tag} className="badge badge-gray">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button onClick={onClose} className="btn btn-secondary">
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
