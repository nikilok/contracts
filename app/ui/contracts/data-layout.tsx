import { getContracts } from "@/app/lib/data";
import type { Status } from "@/app/types";
import { Rabbit } from "lucide-react";
import { columns } from "./columns";
import DataTable from "./data-table";

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
					className="w-full"
					size={148}
					color="#000000"
					absoluteStrokeWidth
				/>
				<h1 className="text-2xl">No contracts found here.</h1>
			</main>
		);
	}
	return (
		<>
			<div className="sm:block md:hidden lg:hidden">
				<h3>mobile view coming soon..</h3>
			</div>
			<div className="hidden sm:hidden md:block lg:hidden">
				<h3>tablet view coming soon..</h3>
			</div>
			<DataTable columns={columns} data={data} />
		</>
	);
}
