import { NextResponse } from 'next/server';
import { analyzeIrrigation } from '@/lib/engine';

export async function POST(req) {
  try {
    const body = await req.json();
    const { crop, temperature, humidity, rainProbability } = body;

    if (!crop || temperature == null || humidity == null || rainProbability == null) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = analyzeIrrigation({ crop, temperature, humidity, rainProbability });
    return NextResponse.json({ ok: true, result });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}