import { getStore } from '@netlify/blobs';

const STORAGE_KEY = 'cablaka_v2_data';

export default async (req) => {
  const store = getStore({ name: 'app-data', consistency: 'strong' });

  if (req.method === 'GET') {
    const data = await store.get(STORAGE_KEY, { type: 'json' });
    return Response.json(data || { izin: [] });
  }

  if (req.method === 'POST') {
    const body = await req.json();
    await store.setJSON(STORAGE_KEY, body);
    return Response.json({ ok: true });
  }

  return new Response('Method not allowed', { status: 405 });
};

export const config = {
  path: '/api/storage',
};
