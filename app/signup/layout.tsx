import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sign Up",
  description: "HI-ME is a social media platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="p-6">{children}</main>;
}
