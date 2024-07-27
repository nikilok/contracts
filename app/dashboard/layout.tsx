import Header from "@/app/ui/header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<Header />
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] mt-10 flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
				{children}
			</main>
		</div>
	);
}
