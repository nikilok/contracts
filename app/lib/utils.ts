import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};

export const getLabel = (
	obj: { value: string; label: string }[],
	value: string,
): string => {
	return obj.find((item) => item.value === value)?.label ?? "";
};

export const getCurrency = (currency = "USD") =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency || "gbp",
	});

export const replaceZeroWithEmptyString = (num: string) => {
	return Number.parseInt(num) === 0 ? "" : num;
};

interface NavigatorUAData extends Navigator {
	userAgentData?: {
		platform: string;
		brands?: Array<{ brand: string; version: string }>;
		mobile?: boolean;
	};
}

export const isMacPlatform = (): boolean => {
	let isMac = false;
	const nav = navigator as NavigatorUAData;
	// Use navigator.userAgentData if available
	if (nav.userAgentData?.platform) {
		isMac = nav.userAgentData.platform.toLowerCase() === "macos";
	} else if (navigator.platform) {
		// Fallback to navigator.platform (deprecated but still widely supported)
		isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
	} else {
		// Fallback for older browsers or environments where userAgentData and platform are unavailable
		isMac = navigator.userAgent.toUpperCase().indexOf("MAC") >= 0;
	}
	return isMac;
};
