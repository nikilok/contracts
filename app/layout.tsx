import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getThemeCookie } from "@/app/lib/actions";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Theme, ThemeProvider } from "./components/theme-provider";

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieTheme = await getThemeCookie("theme");
	let initialTheme: Theme;
	if (
		cookieTheme === "dark" ||
		cookieTheme === "light" ||
		cookieTheme === "system"
	) {
		initialTheme = cookieTheme;
	} else {
		initialTheme = "system";
	}
	let htmlClassName = inter.className;
	if (initialTheme === "dark" || initialTheme === "light") {
		htmlClassName = `${inter.className} ${initialTheme}`;
	}
	return (
		<html lang="en" suppressHydrationWarning className={htmlClassName}>
			<body className={inter.className}>
				<ThemeProvider defaultTheme={initialTheme}>{children}</ThemeProvider>
				<SpeedInsights />
			</body>
		</html>
	);
}
