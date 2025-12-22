import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        let text = '';

        if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
            const data = await pdf(buffer);
            text = data.text;
        } else if (
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.name.endsWith('.docx')
        ) {
            const result = await mammoth.extractRawText({ buffer });
            text = result.value;
        } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
            text = buffer.toString('utf-8');
        } else {
            return NextResponse.json({ error: 'Unsupported file format. Please upload PDF, DOCX, or TXT.' }, { status: 400 });
        }

        // Basic clean up
        text = text.replace(/\s+/g, ' ').trim();

        return NextResponse.json({ text });

    } catch (error) {
        console.error('Error parsing file:', error);
        return NextResponse.json({ error: 'Failed to parse resume file.' }, { status: 500 });
    }
}
