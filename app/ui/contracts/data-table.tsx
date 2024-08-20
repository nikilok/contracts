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
import clsx from "clsx";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export default function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		columnResizeMode: "onChange",
		defaultColumn: {
			size: 50, //starting column size
			minSize: 50, //enforced during column resizing
			maxSize: 300, //enforced during column resizing
		},
	});

	return (
		<Table className="hidden xl:block pt-2 w-[calc(90vw)] overflow-x-auto">
			<TableHeader className="select-none">
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead
									key={header.id}
									colSpan={header.colSpan}
									className="relative"
									style={{
										minWidth: `${header.getSize()}px`,
									}}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
									<div
										{...{
											onDoubleClick: () => header.column.resetSize(),
											onMouseDown: header.getResizeHandler(),
											onTouchStart: header.getResizeHandler(),
											className: clsx({
												"hover:cursor-col-resize resizer":
													header.column.getCanResize(),
												isResizing: header.column.getIsResizing(),
											}),
										}}
									>
										<div className="absolute -right-[-2px] top-0 w-[1px] h-[calc(100%)] bg-slate-300" />
										<div
											className={clsx({
												"z-1 absolute top-[26.5%] right-0 w-[5px] h-[calc(40%)] rounded border-[1px] border-slate-300 bg-white ":
													header.column.getCanResize(),
											})}
										/>
									</div>
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
	);
}
