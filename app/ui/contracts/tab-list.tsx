"use client";
import { TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function TabList() {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const createPageURL = (status: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("status", status.toString());
		params.set("page", "1");
		return `${pathName}?${params.toString()}`;
	};
	return (
		<TabsList>
			<Link href={createPageURL("all")}>
				<TabsTrigger value="all">All</TabsTrigger>
			</Link>
			<Link href={createPageURL("active")}>
				<TabsTrigger value="active">Active </TabsTrigger>
			</Link>
			<Link href={createPageURL("expired")} className="hidden sm:flex">
				<TabsTrigger value="expired">Expired</TabsTrigger>
			</Link>
			<Link href={createPageURL("draft")}>
				<TabsTrigger value="draft">Draft</TabsTrigger>
			</Link>
		</TabsList>
	);
}
