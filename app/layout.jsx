import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./providers";
import { UserProvider } from "@/lib/AuthContext";
import { Toaster } from "react-hot-toast";
import Favicon from "/favicon.ico";
export const metadata = {
  title: "KidneyDoc",
  description:
    "The KidneyDoc web application aims to digitize and dematerialize patient information in the nephrology department at CNHU.",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <UserProvider>
            <Providers>{children}</Providers>
          </UserProvider>
        </main>
        <ToastContainer position="top-right" autoClose={5000} />

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2000,
            success: {
              duration: 2000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
