import { NextRequest, NextResponse } from 'next/server';
import { ensureStorageInitialized } from '@/lib/storage-init';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const storage = ensureStorageInitialized();
  const useCase = await storage.getById(params.id);

  if (!useCase) {
    return NextResponse.json(
      { error: 'Use case not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ...useCase,
    createdAt: useCase.createdAt.toISOString(),
    updatedAt: useCase.updatedAt.toISOString(),
  });
}
