import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json?.()
    const { name, email, subject, message } = body ?? {}

    if (!name?.trim?.() || !email?.trim?.() || !message?.trim?.()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const entry = {
      id: Date.now(),
      name: name?.trim?.() ?? '',
      email: email?.trim?.() ?? '',
      subject: subject?.trim?.() ?? '',
      message: message?.trim?.() ?? '',
      timestamp: new Date().toISOString(),
      status: 'new',
    }

    // Store in a JSON file (simple persistent storage)
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    const filePath = path.join(dataDir, 'contacts.json')
    let contacts: any[] = []
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8')
        contacts = JSON.parse(raw ?? '[]') ?? []
      }
    } catch {
      contacts = []
    }
    contacts.push(entry)
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2))

    return NextResponse.json({ success: true, id: entry?.id })
  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}
