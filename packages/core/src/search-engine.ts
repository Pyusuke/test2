import type { UseCase, SearchQuery, SearchResult } from './types.js';
import { getStorage } from './storage.js';

export class SearchEngine {
  // 基本検索
  async search(query: SearchQuery): Promise<SearchResult> {
    const storage = getStorage();
    return storage.search(query);
  }

  // キーワード検索（シンプル版）
  async searchByKeyword(keyword: string): Promise<SearchResult> {
    return this.search({ keyword });
  }

  // カテゴリ検索
  async searchByCategory(category: string): Promise<SearchResult> {
    return this.search({ categories: [category as UseCase['category']] });
  }

  // タグ検索
  async searchByTags(tags: string[]): Promise<SearchResult> {
    return this.search({ tags });
  }

  // 関連事例の取得
  async getRelatedUseCases(useCase: UseCase, limit: number = 5): Promise<UseCase[]> {
    const storage = getStorage();
    const allUseCases = await storage.getAll();

    // スコアリング
    const scored = allUseCases
      .filter((uc) => uc.id !== useCase.id)
      .map((uc) => {
        let score = 0;

        // 同じカテゴリ
        if (uc.category === useCase.category) {
          score += 10;
        }

        // 共通タグ
        const commonTags = uc.tags.filter((tag) => useCase.tags.includes(tag));
        score += commonTags.length * 5;

        // 同じ難易度
        if (uc.difficulty === useCase.difficulty) {
          score += 2;
        }

        return { useCase: uc, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return scored.map((item) => item.useCase);
  }

  // 全文検索（より高度な検索）
  async fullTextSearch(text: string): Promise<SearchResult> {
    const storage = getStorage();
    const allUseCases = await storage.getAll();
    const searchTerms = text.toLowerCase().split(/\s+/).filter(Boolean);

    const scored = allUseCases.map((uc) => {
      let score = 0;
      const searchableText = [
        uc.title,
        uc.description,
        ...uc.tags,
        uc.prompt || '',
        uc.example || '',
        ...uc.benefits,
      ]
        .join(' ')
        .toLowerCase();

      for (const term of searchTerms) {
        const matches = (searchableText.match(new RegExp(term, 'g')) || []).length;
        score += matches;

        // タイトルマッチは高スコア
        if (uc.title.toLowerCase().includes(term)) {
          score += 5;
        }
      }

      return { useCase: uc, score };
    });

    const results = scored
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.useCase);

    return {
      useCases: results,
      total: results.length,
    };
  }
}

// シングルトンインスタンス
export const searchEngine = new SearchEngine();
