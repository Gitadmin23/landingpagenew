import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"; 


const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chasescroll",
  description: 'We build memories',
  manifest: '/manifest.json',
  applicationName: 'Chasescroll'
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);  

  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body style={{ fontFamily: raleway.style.fontFamily }}>
        <Providers session={session} >
          {children}
        </Providers>
      </body>
    </html >
  );
}
