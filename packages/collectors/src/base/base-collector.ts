import type { UseCase } from '@claude-code-cases/core';

export interface CollectorConfig {
  name: string;
  enabled: boolean;
}

export interface CollectResult {
  success: boolean;
  useCases: UseCase[];
  errors?: string[];
}

/**
 * 活用事例を収集するための抽象基底クラス
 */
export abstract class BaseCollector {
  protected config: CollectorConfig;

  constructor(config: CollectorConfig) {
    this.config = config;
  }

  /**
   * コレクターの名前を取得
   */
  getName(): string {
    return this.config.name;
  }

  /**
   * コレクターが有効かどうか
   */
  isEnabled(): boolean {
    return this.config.enabled;
  }

  /**
   * 活用事例を収集する（サブクラスで実装）
   */
  abstract collect(): Promise<CollectResult>;

  /**
   * 収集前の検証
   */
  protected validate(): boolean {
    return this.isEnabled();
  }

  /**
   * 安全に収集を実行
   */
  async safeCollect(): Promise<CollectResult> {
    if (!this.validate()) {
      return {
        success: false,
        useCases: [],
        errors: [`Collector "${this.getName()}" is not enabled or validation failed`],
      };
    }

    try {
      return await this.collect();
    } catch (error) {
      return {
        success: false,
        useCases: [],
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      };
    }
  }
}
