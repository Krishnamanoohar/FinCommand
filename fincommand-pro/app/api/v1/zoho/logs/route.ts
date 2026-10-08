import type { NextRequest } from 'next/server';
import { authenticate } from '@/lib/auth/permissions';
import { withErrorHandling, json } from '@/lib/utils/api-handler';
import { query } from '@/lib/db/neon';

export const runtime = 'nodejs';

export const GET = withErrorHandling(async (req: NextRequest) => {
  const user = await authenticate(req);
  const { rows } = await query(
    `SELECT * FROM sync_logs WHERE company_id=$1 ORDER BY started_at DESC LIMIT 20`,
    [user.company_id]
  );
  return json(rows);
});
