import type { Metadata } from 'next'
import { QueryProvider } from '@/providers/QueryProvider'
import './globals.css'
import './accessibility.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cronograma & Diário',
  description: 'Seu calendário pessoal com lembretes automáticos e diário inteligente',
  generator: 'Next.js',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
