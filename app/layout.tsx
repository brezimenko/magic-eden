import './globals.css'
import { Inter } from 'next/font/google'
import ReactQueryProvider from "@/app/components/ReactQuery";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col">{children}</main>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
