// import "@/styles/globals.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import  SidebarProvider  from "./SidebarContext";
// import Providers from "./providers";
// import { Toaster } from "react-hot-toast";
// import Favicon from "/favicon.ico";
// export const metadata = {
//   title: "KidneyDoc",
//   description:
//     "The KidneyDoc web application aims to digitize and dematerialize patient information in the nephrology department at CNHU.",
//   icons: [{ rel: "icon", url: Favicon.src }],
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <main>
//           <SidebarProvider>
//             <Providers>{children}</Providers>
//           </SidebarProvider>
//         </main>
//         <ToastContainer position="top-right" autoClose={5000} />

//         <Toaster
//           position="top-right"
//           reverseOrder={false}
//           toastOptions={{
//             duration: 2000,
//             success: {
//               duration: 2000,
//               theme: {
//                 primary: "green",
//                 secondary: "black",
//               },
//             },
//           }}
//         />
//       </body>
//     </html>
//   );
// }
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarProvider from "./SidebarContext";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import Favicon from "/favicon.ico";

export const metadata = {
  title: "KidneyDoc",
  description:
    "The KidneyDoc web application aims to digitize and dematerialize patient information in the nephrology department at CNHU.",
  icons: [
    { rel: "icon", url: Favicon.src },
    { rel: "manifest", url: "/manifest.json" },
  ],
};

export const themeColor = "#000000";
export const viewport =
  "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <main>
          <SidebarProvider>
            <Providers>{children}</Providers>
          </SidebarProvider>
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
