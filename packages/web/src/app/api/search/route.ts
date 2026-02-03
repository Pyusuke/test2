import { NextRequest, NextResponse } from 'next/server';
import { SearchEngine } from '@claude-code-cases/core';
import { ensureStorageInitialized } from '@/lib/storage-init';

export async function GET(request: NextRequest) {
  ensureStorageInitialized();

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 }
    );
  }

  const searchEngine = new SearchEngine();
  const result = await searchEngine.fullTextSearch(query);

  // Serialize dates for JSON response
  const serializedUseCases = result.useCases.map((uc) => ({
    ...uc,
    createdAt: uc.createdAt.toISOString(),
    updatedAt: uc.updatedAt.toISOString(),
  }));

  return NextResponse.json({
    useCases: serializedUseCases,
    total: result.total,
  });
}
