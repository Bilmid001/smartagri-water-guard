import { NextResponse } from 'next/server';

// In-memory demo store (survives per server instance only).
// In production, replace with MongoDB or another persistent store.
const store = [];

export async function GET() {
  return NextResponse.json({ ok: true, history: store });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...body };
    store.unshift(record);
    return NextResponse.json({ ok: true, record });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}