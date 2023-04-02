"use client";

import { Suspense } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/global.css";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Loading from "./loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body>
          <Header />
          <Suspense fallback={<Loading />}>
            <main>{children}</main>
          </Suspense>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
