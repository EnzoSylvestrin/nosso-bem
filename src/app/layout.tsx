import type { Metadata } from "next";
import { Afacad_Flux } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const afacadFlux = Afacad_Flux({
  variable: "--font-afacad-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nosso bem",
  description: "Site do nosso joguinho 💜",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
        <body
            className={`${afacadFlux.variable} antialiased`}
        >
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </body>
    </html>
  );
}
