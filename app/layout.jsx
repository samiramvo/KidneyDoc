
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Providers from "./providers";

export const metadata = {
  title: 'KidneyDoc',
  description: 'The KidneyDoc web application aims to digitize and dematerialize patient information in the nephrology department at CNHU.',
}

export default function RootLayout({ children }) {

  return (
    <html lang='en'>
      <body>
        <main>
          <Providers>
            {children}
          </Providers>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={5000} />
      </body>
    </html>
  )
}
