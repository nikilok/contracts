"use client";

import clsx from "clsx";
import { Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HeaderLink } from "../types";

export default function NavLinks({
	links,
}: {
	links: HeaderLink[];
}) {
	const pathname = usePathname();
	return (
		<>
			<Link
				href="/dashboard"
				className="flex items-center gap-2 text-lg font-semibold"
			>
				<Package2 className="h-6 w-6" />
				<span className="sr-only">Acme Inc</span>
			</Link>
			{links.map(({ href, name }) => {
				return (
					<Link
						key={name}
						href={href}
						className={clsx("hover:text-foreground text-nowrap", {
							"text-muted-foreground opacity-70 border-b-[3px] border-transparent":
								pathname !== href,
							"font-bold text-foreground h-[64px] bold flex items-center border-b-[3px] border-slate-600 text-slate-700":
								pathname === href,
						})}
					>
						{name}
					</Link>
				);
			})}
		</>
	);
}
