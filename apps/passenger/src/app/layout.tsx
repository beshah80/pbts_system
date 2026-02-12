import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import '../styles/globals.css'

export const metadata = {
  title: 'AddisTransport - Smart Public Transport',
  description: 'Track buses in real-time and plan your journey across Addis Ababa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}