import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET() {
  try {
    const list = await getTestimonials();
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Database error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authorized = verifySession(req);
    if (!authorized) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access denied' }, { status: 401 });
    }

    const payload = await req.json();
    if (!payload.id || !payload.name || !payload.text) {
      return NextResponse.json({ success: false, error: 'Required fields: id, name, text' }, { status: 400 });
    }

    payload.rating = Number(payload.rating || 5);

    await saveTestimonial(payload);
    return NextResponse.json({ success: true, message: 'Testimonial saved successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authorized = verifySession(req);
    if (!authorized) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access denied' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing parameter: id' }, { status: 400 });
    }

    await deleteTestimonial(id);
    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 });
  }
}
