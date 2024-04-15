"use client"
import "./globals.css";
import { ThemeProvider } from '@mui/material';
import theme from "@/theme";
import { MyContextProvider } from "@/context/store";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang='en' >
      <body className={`min-h-screen px-[46px] py-[26px] bg-white`}>
        <ThemeProvider theme={theme}>
          <MyContextProvider>
            <Header />
            {children}
          </MyContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}