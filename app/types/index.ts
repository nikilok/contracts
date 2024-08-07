export type HeaderLink = { name: string; href: string };

export type State = {
	errors?: Record<string, string[]>;
	message?: string | null;
};
