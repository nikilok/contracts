import Header from "@/app/ui/header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen w-full flex-col  md:bg-right-bottom bg-right bg-background-texture-chrome">
			<Header />
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] px-1  md:px-10 py-20 flex-1 flex-col gap-4 bg-muted/50 md:gap-8">
				{children}
			</main>
		</div>
	);
}
