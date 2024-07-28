import Header from "@/app/ui/header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<Header />
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] px-1 md:px-10 py-14 flex-1 flex-col gap-4 bg-muted/40 md:gap-8 md:py-20">
				{children}
			</main>
		</div>
	);
}
