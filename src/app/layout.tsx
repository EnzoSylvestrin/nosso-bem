import type { Metadata } from "next";

import { Afacad_Flux } from "next/font/google";

import { ConfigProvider } from "@/context/ConfigProvider";

import {
    ClerkProvider,
    SignIn,
    SignedIn,
    SignedOut,
} from '@clerk/nextjs'

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { BaseLayout } from "@/components/baseLayout";

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
                        <div className="min-h-screen flex items-center justify-center">
                            <SignIn routing="hash" />
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <ConfigProvider>
                            <BaseLayout>
                                {children}
                            </BaseLayout>
                        </ConfigProvider>
                    </SignedIn>
                    <Toaster 
                        closeButton={true}
                        duration={4000}
                        theme="system"
                        gap={8}
                        pauseWhenPageIsHidden={true}
                    />
                </body>
            </html>
        </ClerkProvider>
    );
}
