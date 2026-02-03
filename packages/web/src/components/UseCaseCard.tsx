import type { UseCase } from '@claude-code-cases/core';
import { CategoryLabels } from '@claude-code-cases/core';

interface UseCaseCardProps {
  useCase: UseCase;
  onClick?: () => void;
}

const difficultyLabels = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
};

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

export function UseCaseCard({ useCase, onClick }: UseCaseCardProps) {
  return (
    <div
      className="card hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-lg">{useCase.title}</h3>
        <span className={`badge ${difficultyColors[useCase.difficulty]}`}>
          {difficultyLabels[useCase.difficulty]}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {useCase.description}
      </p>

      <div className="flex items-center gap-2 mb-3">
        <span className="badge badge-primary">
          {CategoryLabels[useCase.category]}
        </span>
        {useCase.estimatedTimeSaved && (
          <span className="badge badge-gray">
            削減: {useCase.estimatedTimeSaved}
          </span>
        )}
      </div>

      {useCase.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {useCase.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-xs text-gray-500">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
