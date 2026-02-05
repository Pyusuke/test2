import type { UseCase, SearchQuery, SearchResult } from './types';

// ストレージインターフェース
export interface IStorage {
  getAll(): Promise<UseCase[]>;
  getById(id: string): Promise<UseCase | null>;
  add(useCase: UseCase): Promise<void>;
  update(id: string, useCase: Partial<UseCase>): Promise<void>;
  delete(id: string): Promise<void>;
  search(query: SearchQuery): Promise<SearchResult>;
}

// メモリストレージ（Vercel対応）
export class MemoryStorage implements IStorage {
  private useCases: Map<string, UseCase> = new Map();

  constructor(initialData: UseCase[] = []) {
    for (const useCase of initialData) {
      this.useCases.set(useCase.id, useCase);
    }
  }

  async getAll(): Promise<UseCase[]> {
    return Array.from(this.useCases.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getById(id: string): Promise<UseCase | null> {
    return this.useCases.get(id) || null;
  }

  async add(useCase: UseCase): Promise<void> {
    this.useCases.set(useCase.id, useCase);
  }

  async update(id: string, updates: Partial<UseCase>): Promise<void> {
    const existing = this.useCases.get(id);
    if (existing) {
      this.useCases.set(id, { ...existing, ...updates, updatedAt: new Date() });
    }
  }

  async delete(id: string): Promise<void> {
    this.useCases.delete(id);
  }

  async search(query: SearchQuery): Promise<SearchResult> {
    let results = Array.from(this.useCases.values());

    // キーワード検索
    if (query.keyword) {
      const keyword = query.keyword.toLowerCase();
      results = results.filter(
        (uc) =>
          uc.title.toLowerCase().includes(keyword) ||
          uc.description.toLowerCase().includes(keyword) ||
          uc.tags.some((tag) => tag.toLowerCase().includes(keyword))
      );
    }

    // カテゴリフィルター
    if (query.categories && query.categories.length > 0) {
      results = results.filter((uc) => query.categories!.includes(uc.category));
    }

    // タグフィルター
    if (query.tags && query.tags.length > 0) {
      results = results.filter((uc) =>
        query.tags!.some((tag) => uc.tags.includes(tag))
      );
    }

    // 難易度フィルター
    if (query.difficulty) {
      results = results.filter((uc) => uc.difficulty === query.difficulty);
    }

    return {
      useCases: results.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      ),
      total: results.length,
    };
  }
}

// シングルトンインスタンス
let storageInstance: IStorage | null = null;

export function initializeStorage(storage: IStorage): void {
  storageInstance = storage;
}

export function getStorage(): IStorage {
  if (!storageInstance) {
    throw new Error('Storage not initialized. Call initializeStorage first.');
  }
  return storageInstance;
}
