import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Contracts Management",
	description: "A contract storage app",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider defaultTheme="system">{children}</ThemeProvider>
				<SpeedInsights />
			</body>
		</html>
	);
}
