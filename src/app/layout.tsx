import type { Metadata } from "next";
import React from "react";
import { cookies } from "next/headers";
import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Rest Countries API",
  description: "By Frontend Mentor",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const savedTheme = (await cookies()).get("color-theme");
  const theme = savedTheme?.value || "light";
  return (
    <html data-theme={theme} lang="en">
      <body className="font-sans text-300 font-light text-black bg-light-gray text-light-text min-h-dvh dark:bg-darker-blue dark:text-white">
        <ThemeProvider initialTheme={theme}>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
