"use client";

import { getThemeCookie, setThemeCookie } from "@/app/lib/actions";
import React from "react";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: "system",
	setTheme: () => null,
};

const ThemeProviderContext =
	React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "vite-ui-theme",
	...props
}: ThemeProviderProps) {
	const [theme, setThemeState] = React.useState<Theme>(defaultTheme);

	React.useEffect(() => {
		// Initialize theme state with defaultTheme passed from the server
		setThemeState(defaultTheme);
	}, [defaultTheme]); // Re-run if defaultTheme changes

	React.useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");

		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";
			root.classList.add(systemTheme);
			setThemeCookie(storageKey, systemTheme); // Store the resolved theme
		} else {
			root.classList.add(theme);
			setThemeCookie(storageKey, theme);
		}
	}, [theme, storageKey]);

	const value = {
		theme,
		setTheme: (newTheme: Theme) => {
			setThemeState(newTheme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = React.useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
