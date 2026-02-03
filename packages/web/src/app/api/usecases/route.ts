import { NextRequest, NextResponse } from 'next/server';
import { SearchQuerySchema, type UseCaseCategory } from '@claude-code-cases/core';
import { ensureStorageInitialized } from '@/lib/storage-init';

export async function GET(request: NextRequest) {
  const storage = ensureStorageInitialized();
  const searchParams = request.nextUrl.searchParams;

  const keyword = searchParams.get('keyword') || undefined;
  const categoryParam = searchParams.get('category');
  const tagsParam = searchParams.get('tags');
  const difficulty = searchParams.get('difficulty') as 'beginner' | 'intermediate' | 'advanced' | undefined;

  const query = {
    keyword,
    categories: categoryParam ? [categoryParam as UseCaseCategory] : undefined,
    tags: tagsParam ? tagsParam.split(',') : undefined,
    difficulty,
  };

  // Validate query
  const parseResult = SearchQuerySchema.safeParse(query);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters', details: parseResult.error },
      { status: 400 }
    );
  }

  const result = await storage.search(parseResult.data);

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
