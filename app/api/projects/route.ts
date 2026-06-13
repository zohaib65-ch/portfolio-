import { NextRequest, NextResponse } from 'next/server';
import { getProjects, saveProject, deleteProject } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET() {
  try {
    const list = await getProjects();
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
    if (!payload.id || !payload.title) {
      return NextResponse.json({ success: false, error: 'Required fields: id, title' }, { status: 400 });
    }

    await saveProject(payload);
    return NextResponse.json({ success: true, message: 'Project saved successfully' });
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

    await deleteProject(id);
    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 });
  }
}
