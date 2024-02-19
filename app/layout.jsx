import "@/styles/globals.css";


export const metadata = {
  title: 'KidneyDoc',
  description: 'The KidneyDoc web application aims to digitize and dematerialize patient information in the nephrology department at CNHU.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}