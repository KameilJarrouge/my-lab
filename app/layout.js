import "./globals.css";
import { cookies } from "next/headers";
import StoreInitializer from "./_components/StoreInitializer";
import "react-tooltip/dist/react-tooltip.css";
import "./_customCSS/DateTimePicker.css";
import "./_customCSS/Calendar.css";
import Header from "./_components/Header";

export const metadata = {
  title: "My Lab",
  description: "Lab software",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={
          "bg-primary text-text w-[100vw] h-[100vh] overflow-y-visible overflow-x-hidden "
        }
        id="body"
      >
        <StoreInitializer isLoggedIn={!!cookies().get("authToken")} />
        <Header />
        <main className="w-full h-[calc(100vh-5.5rem)] py-[1rem] px-[2rem]">
          {children}
        </main>
      </body>
    </html>
  );
}
