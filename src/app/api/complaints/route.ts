import { NextResponse } from 'next/server';
  import { promises as fs } from 'fs';
  import path from 'path';

  const complaintsFile = path.join(process.cwd(), 'complaints.json');

  async function initializeComplaintsFile() {
    try {
      await fs.access(complaintsFile);
    } catch {
      await fs.writeFile(complaintsFile, JSON.stringify([]));
    }
  }

  export async function GET() {
    try {
      await initializeComplaintsFile();
      const data = await fs.readFile(complaintsFile, 'utf8');
      const complaints = JSON.parse(data);
      return NextResponse.json(complaints);
    } catch (err) {
      console.error('Error reading complaints:', err);
      return NextResponse.json({ error: 'Failed to load complaints' }, { status: 500 });
    }
  }

  export async function POST(req: Request) {
    try {
      const { title, description, place, imageUrl } = await req.json();
      if (!title || !description || !place) {
        return NextResponse.json({ error: 'Title, description, and place are required' }, { status: 400 });
      }

      await initializeComplaintsFile();
      const data = await fs.readFile(complaintsFile, 'utf8');
      const complaints = JSON.parse(data);
      const newId = complaints.length ? complaints[complaints.length - 1].id + 1 : 1;
      const complaint = {
        id: newId,
        title,
        description,
        place,
        date: new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'),
        solved: false,
        imageUrl: imageUrl || null,
        comments: []
      };
      complaints.push(complaint);
      await fs.writeFile(complaintsFile, JSON.stringify(complaints, null, 2));
      return NextResponse.json({ message: 'Complaint added successfully', complaint });
    } catch (err) {
      console.error('Error saving complaint:', err);
      return NextResponse.json({ error: 'Failed to save complaint' }, { status: 500 });
    }
  }

  