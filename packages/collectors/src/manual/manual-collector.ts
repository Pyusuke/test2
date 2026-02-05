import type { UseCase } from '@claude-code-cases/core';
import { BaseCollector, type CollectResult, type CollectorConfig } from '../base/base-collector';
import { sampleUseCases } from './sample-data';

export interface ManualCollectorConfig extends CollectorConfig {
  useCases?: UseCase[];
}

/**
 * 手動入力用コレクター
 * 初期データとしてサンプル事例を提供
 */
export class ManualCollector extends BaseCollector {
  private useCases: UseCase[];

  constructor(config?: Partial<ManualCollectorConfig>) {
    super({
      name: 'manual',
      enabled: true,
      ...config,
    });
    this.useCases = config?.useCases || sampleUseCases;
  }

  async collect(): Promise<CollectResult> {
    return {
      success: true,
      useCases: this.useCases,
    };
  }

  /**
   * 手動で事例を追加
   */
  addUseCase(useCase: UseCase): void {
    this.useCases.push(useCase);
  }

  /**
   * 事例を削除
   */
  removeUseCase(id: string): boolean {
    const index = this.useCases.findIndex((uc) => uc.id === id);
    if (index !== -1) {
      this.useCases.splice(index, 1);
      return true;
    }
    return false;
  }
}
