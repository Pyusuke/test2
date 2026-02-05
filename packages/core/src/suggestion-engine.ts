import type { UseCase, SuggestionContext, SuggestionResult, UseCaseCategory } from './types';
import { getStorage } from './storage';

// タスクキーワードとカテゴリのマッピング
const taskCategoryMapping: Record<string, UseCaseCategory[]> = {
  // コード生成関連
  'コード': ['code-generation'],
  '実装': ['code-generation', 'architecture'],
  '作成': ['code-generation', 'documentation'],
  '生成': ['code-generation'],

  // レビュー関連
  'レビュー': ['code-review'],
  'チェック': ['code-review', 'security'],
  '確認': ['code-review'],

  // デバッグ関連
  'デバッグ': ['debugging'],
  'バグ': ['debugging'],
  'エラー': ['debugging'],
  '修正': ['debugging', 'refactoring'],

  // テスト関連
  'テスト': ['testing'],
  '単体テスト': ['testing'],
  'ユニットテスト': ['testing'],

  // ドキュメント関連
  'ドキュメント': ['documentation'],
  '文書': ['documentation'],
  'README': ['documentation'],
  'コメント': ['documentation'],

  // リファクタリング関連
  'リファクタリング': ['refactoring'],
  '改善': ['refactoring'],
  '最適化': ['refactoring'],

  // 学習関連
  '理解': ['learning'],
  '学習': ['learning'],
  '説明': ['learning'],

  // 自動化関連
  '自動化': ['automation'],
  'スクリプト': ['automation'],

  // アーキテクチャ関連
  '設計': ['architecture'],
  'アーキテクチャ': ['architecture'],
  '構造': ['architecture'],

  // データ分析関連
  'データ': ['data-analysis'],
  '分析': ['data-analysis'],

  // DevOps関連
  'デプロイ': ['devops'],
  'CI': ['devops'],
  'CD': ['devops'],
  'パイプライン': ['devops'],

  // セキュリティ関連
  'セキュリティ': ['security'],
  '脆弱性': ['security'],
  '認証': ['security'],
};

export class SuggestionEngine {
  // コンテキストに基づく提案
  async suggest(context: SuggestionContext): Promise<SuggestionResult> {
    const storage = getStorage();
    const allUseCases = await storage.getAll();

    const scored = allUseCases.map((uc) => {
      let score = 0;
      const reasons: string[] = [];

      // タスクベースのマッチング
      if (context.currentTask) {
        const taskLower = context.currentTask.toLowerCase();
        for (const [keyword, categories] of Object.entries(taskCategoryMapping)) {
          if (taskLower.includes(keyword.toLowerCase())) {
            if (categories.includes(uc.category)) {
              score += 20;
              reasons.push(`タスク「${context.currentTask}」に関連`);
            }
          }
        }

        // タグマッチング
        for (const tag of uc.tags) {
          if (taskLower.includes(tag.toLowerCase())) {
            score += 10;
            reasons.push(`タグ「${tag}」がマッチ`);
          }
        }
      }

      // 技術スタックマッチング
      if (context.techStack && context.techStack.length > 0) {
        const matchingTags = uc.tags.filter((tag) =>
          context.techStack!.some(
            (tech) => tech.toLowerCase() === tag.toLowerCase()
          )
        );
        if (matchingTags.length > 0) {
          score += matchingTags.length * 15;
          reasons.push(`技術スタック「${matchingTags.join(', ')}」に対応`);
        }
      }

      // スキルレベルマッチング
      if (context.skillLevel) {
        if (uc.difficulty === context.skillLevel) {
          score += 5;
          reasons.push('スキルレベルに適合');
        }
      }

      // 既に使用した事例は除外
      if (context.previousUseCases?.includes(uc.id)) {
        score = 0;
      }

      return { useCase: uc, score, reasons };
    });

    const topSuggestions = scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const uniqueReasons = [
      ...new Set(topSuggestions.flatMap((item) => item.reasons)),
    ];

    return {
      suggestions: topSuggestions.map((item) => item.useCase),
      reason:
        uniqueReasons.length > 0
          ? uniqueReasons.join('、')
          : '一般的な活用事例を提案',
    };
  }

  // カテゴリベースの提案
  async suggestByCategory(category: UseCaseCategory, limit: number = 5): Promise<UseCase[]> {
    const storage = getStorage();
    const result = await storage.search({ categories: [category] });
    return result.useCases.slice(0, limit);
  }

  // 初心者向け提案
  async suggestForBeginners(limit: number = 5): Promise<UseCase[]> {
    const storage = getStorage();
    const result = await storage.search({ difficulty: 'beginner' });
    return result.useCases.slice(0, limit);
  }

  // 人気の活用事例（シンプルに最新を返す）
  async getPopularUseCases(limit: number = 5): Promise<UseCase[]> {
    const storage = getStorage();
    const allUseCases = await storage.getAll();
    return allUseCases.slice(0, limit);
  }
}

// シングルトンインスタンス
export const suggestionEngine = new SuggestionEngine();
