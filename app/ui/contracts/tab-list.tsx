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
			<TabsTrigger value="all">
				<Link href={createPageURL("all")}>All</Link>
			</TabsTrigger>
			<TabsTrigger value="active">
				<Link href={createPageURL("active")}>Active</Link>
			</TabsTrigger>
			<TabsTrigger value="expired">
				<Link href={createPageURL("expired")}>Expired</Link>
			</TabsTrigger>
			<TabsTrigger value="draft" className="hidden sm:flex">
				<Link href={createPageURL("draft")}>Draft</Link>
			</TabsTrigger>
		</TabsList>
	);
}
