import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import StoreProvider from "@/lib/store/StoreProvider";

const font = Nunito_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: {
    template: "%s | TaskMaster",
    default: "TaskMaster",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={font.className}>
          <main>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
