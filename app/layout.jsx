
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Providers from "./providers";
import ThemeSwitcher from "./ThemeSwitcher";

export const metadata = {
  title: 'KidneyDoc',
  description: 'The KidneyDoc web application aims to digitize and dematerialize patient information in the nephrology department at CNHU.',
}

export default function RootLayout({ children }) {
  const isDashboardLayout = true;

  return (
    <html lang='en'>
      <body>
        <main>
          <Providers>
            <div >
              {isDashboardLayout ? null : <ThemeSwitcher />}
            </div>
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
