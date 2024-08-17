import { Table } from "../components/ui/table";
import { ITEMS_PER_PAGE } from "../lib/constants";
import { columns } from "./contracts/columns";
import DataTable from "./contracts/data-table";

export function TableRowSkeleton() {
	return (
		<tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
			{/* Actions */}
			<td className="whitespace-nowrap py-3 pl-6 pr-3">
				<div className="flex justify-end gap-3">
					<div className="h-[38px] w-[38px] rounded bg-gray-100" />
					<div className="h-[38px] w-[38px] rounded bg-gray-100" />
				</div>
			</td>
			{/* Customer Name and Image */}
			<td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
				<div className="flex items-center gap-3">
					<div className="h-8 w-8 rounded-full bg-gray-100" />
					<div className="h-6 w-24 rounded bg-gray-100" />
				</div>
			</td>

			{Array.from({ length: 10 }, (_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<td key={index} className="whitespace-nowrap px-3 py-3">
					<div className="h-6 w-32 rounded bg-gray-100" />
				</td>
			))}
		</tr>
	);
}
export function InvoicesMobileSkeleton() {
	return (
		<div className="mb-2 w-full rounded-md bg-white p-4">
			<div className="flex items-center justify-between border-b border-gray-100 pb-8">
				<div className="flex items-center">
					<div className="mr-2 h-8 w-8 rounded-full bg-gray-100" />
					<div className="h-6 w-16 rounded bg-gray-100" />
				</div>
				<div className="h-6 w-16 rounded bg-gray-100" />
			</div>
			<div className="flex w-full items-center justify-between pt-4">
				<div>
					<div className="h-6 w-16 rounded bg-gray-100" />
					<div className="mt-2 h-6 w-24 rounded bg-gray-100" />
				</div>
				<div className="flex justify-end gap-2">
					<div className="h-10 w-10 rounded bg-gray-100" />
					<div className="h-10 w-10 rounded bg-gray-100" />
				</div>
			</div>
		</div>
	);
}
export function InvoicesTableSkeleton() {
	return (
		<Table>
			<tbody className="hidden sm:hidden md:hidden lg:block xl:block pt-2 w-[calc(90vw)] overflow-x-auto bg-transparent">
				{Array.from({ length: ITEMS_PER_PAGE }, (_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<TableRowSkeleton key={index} />
				))}
			</tbody>
		</Table>
	);
}
