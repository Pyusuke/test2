import { NextRequest, NextResponse } from 'next/server';
import {
  SuggestionContextSchema,
  SuggestionEngine,
  initializeStorage,
  MemoryStorage,
} from '@claude-code-cases/core';
import { sampleUseCases } from '@claude-code-cases/collectors';
import { ensureStorageInitialized } from '@/lib/storage-init';

export async function POST(request: NextRequest) {
  ensureStorageInitialized();

  try {
    const body = await request.json();

    // Validate context
    const parseResult = SuggestionContextSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parseResult.error },
        { status: 400 }
      );
    }

    const suggestionEngine = new SuggestionEngine();
    const result = await suggestionEngine.suggest(parseResult.data);

    // Serialize dates for JSON response
    const serializedSuggestions = result.suggestions.map((uc) => ({
      ...uc,
      createdAt: uc.createdAt.toISOString(),
      updatedAt: uc.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      suggestions: serializedSuggestions,
      reason: result.reason,
    });
  } catch (error) {
    console.error('Suggestion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
