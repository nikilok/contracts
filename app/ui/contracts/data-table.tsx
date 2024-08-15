"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/app/components/ui/table";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Rabbit } from "lucide-react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export default async function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		// columnResizeMode: "onChange",
		defaultColumn: {
			size: 50, //starting column size
			minSize: 50, //enforced during column resizing
			maxSize: 300, //enforced during column resizing
		},
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
				<h3>table view coming soon..</h3>
			</div>
			<Table className="hidden sm:hidden md:hidden lg:block xl:block pt-2 w-[calc(90vw)] overflow-x-auto">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										colSpan={header.colSpan}
										style={{
											minWidth: `${header.getSize()}px`,
										}}
										// className={`min-w-[${header.getSize()}px]`}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length &&
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
				</TableBody>
			</Table>
		</>
	);
}
