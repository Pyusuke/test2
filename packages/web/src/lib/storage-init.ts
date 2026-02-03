import { MemoryStorage, initializeStorage, getStorage, type IStorage } from '@claude-code-cases/core';
import { sampleUseCases } from '@claude-code-cases/collectors';

let initialized = false;

export function ensureStorageInitialized(): IStorage {
  if (!initialized) {
    const storage = new MemoryStorage(sampleUseCases);
    initializeStorage(storage);
    initialized = true;
  }
  return getStorage();
}
