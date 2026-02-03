import { z } from 'zod';

// 12カテゴリの定義
export const UseCaseCategory = z.enum([
  'code-generation',      // コード生成
  'code-review',          // コードレビュー
  'debugging',            // デバッグ
  'testing',              // テスト
  'documentation',        // ドキュメント作成
  'refactoring',          // リファクタリング
  'learning',             // 学習・理解
  'automation',           // 自動化
  'architecture',         // 設計・アーキテクチャ
  'data-analysis',        // データ分析
  'devops',               // DevOps・CI/CD
  'security',             // セキュリティ
]);

export type UseCaseCategory = z.infer<typeof UseCaseCategory>;

export const CategoryLabels: Record<UseCaseCategory, string> = {
  'code-generation': 'コード生成',
  'code-review': 'コードレビュー',
  'debugging': 'デバッグ',
  'testing': 'テスト',
  'documentation': 'ドキュメント作成',
  'refactoring': 'リファクタリング',
  'learning': '学習・理解',
  'automation': '自動化',
  'architecture': '設計・アーキテクチャ',
  'data-analysis': 'データ分析',
  'devops': 'DevOps・CI/CD',
  'security': 'セキュリティ',
};

// 活用事例のスキーマ
export const UseCaseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  category: UseCaseCategory,
  tags: z.array(z.string()).default([]),
  prompt: z.string().optional(),
  example: z.string().optional(),
  benefits: z.array(z.string()).default([]),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
  estimatedTimeSaved: z.string().optional(),
  source: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UseCase = z.infer<typeof UseCaseSchema>;

// 検索クエリのスキーマ
export const SearchQuerySchema = z.object({
  keyword: z.string().optional(),
  categories: z.array(UseCaseCategory).optional(),
  tags: z.array(z.string()).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;

// 提案コンテキストのスキーマ
export const SuggestionContextSchema = z.object({
  currentTask: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  previousUseCases: z.array(z.string()).optional(),
});

export type SuggestionContext = z.infer<typeof SuggestionContextSchema>;

// 検索結果
export interface SearchResult {
  useCases: UseCase[];
  total: number;
}

// 提案結果
export interface SuggestionResult {
  suggestions: UseCase[];
  reason: string;
}
