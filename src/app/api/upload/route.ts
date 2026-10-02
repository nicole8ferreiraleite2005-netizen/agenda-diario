import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) throw new Error('Nenhum arquivo enviado')

    // Mock upload - retorna URL fake para teste
    // Em produção, substitua com upload real ao Supabase
    const mockUrl = `https://via.placeholder.com/300?text=${encodeURIComponent(file.name)}`

    return NextResponse.json({ url: mockUrl }, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erro ao fazer upload'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
