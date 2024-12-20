import type { Metadata } from "next";

import { Afacad_Flux } from "next/font/google";

import { ConfigProvider } from "@/context/ConfigProvider";

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
} from '@clerk/nextjs'

import "./globals.css";

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
        <ClerkProvider>
            <html lang="pt">
                <body
                    className={`${afacadFlux.variable} antialiased`}
                >
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <ConfigProvider>
                            {children}
                        </ConfigProvider>
                    </SignedIn>
                </body>
            </html>
        </ClerkProvider>
    );
}
