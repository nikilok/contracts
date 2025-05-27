import { Button } from "@/app/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { CircleUser, Menu } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ThemeToggle } from "../components/theme-toggle";
import HeaderSearch from "./header-search";
import NavLinks from "./navLinks";

const links = [
	{ name: "Home", href: "/dashboard" },
	{
		name: "Contracts",
		href: "/dashboard/contracts",
	},
	{ name: "Service Owners", href: "/dashboard/service-owners" },
	{ name: "Suppliers", href: "/dashboard/suppliers" },
];

export default function Header() {
	return (
		<div className="shadow-lg h-16 w-full fixed top-0 z-50">
			<header className="shadow-md flex h-16 items-center gap-4 border-b px-4 md:px-6 w-full bg-white/60 z-50 backdrop-blur-md">
				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<NavLinks links={links} />
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden"
						>
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="grid gap-6 text-lg font-medium">
							<NavLinks links={links} />
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<Suspense fallback="loading...">
						<HeaderSearch placeholder="Search Contracts..." />
					</Suspense>
					<ThemeToggle />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link href="/" className="w-full">
									Logout
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
		</div>
	);
}
