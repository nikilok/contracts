import { getContracts } from "@/app/lib/data";
import type { Status } from "@/app/types";
import { Rabbit } from "lucide-react";
import { columns } from "./columns";
import DataTable from "./data-table";
import MobileLayout from "./mobile-layout";

export default async function DataLayout({
	currentPage,
	status,
	query,
}: {
	currentPage: number;
	status: Status;
	query: string;
}) {
	const data = await getContracts({
		currentPage,
		status,
		query,
	});

	if (data.length === 0) {
		return (
			<main className="w-auto flex-col mx-auto justify-center text-center pt-2">
				<Rabbit
					className="w-full text-black dark:text-slate-400"
					size={148}
					absoluteStrokeWidth
				/>
				<h1 className="text-2xl">No contracts found here.</h1>
			</main>
		);
	}
	return (
		<>
			<div className="sm:block md:hidden lg:hidden">
				<MobileLayout data={data} device="mobile" />
			</div>
			<div className="hidden md:block lg:block xl:hidden">
				<MobileLayout data={data} device="tablet" />
			</div>
			<DataTable columns={columns} data={data} />
		</>
	);
}
