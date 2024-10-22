import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Table } from "@/app/components/ui/table";
import { ITEMS_PER_PAGE } from "@/app/lib/constants";
import clsx from "clsx";
import { Edit, LoaderCircle, Trash } from "lucide-react";

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
export function ContractMobileSkeleton({
	device = "mobile",
}: { device: "mobile" | "tablet" }) {
	return (
		<div className="mt-4">
			{Array.from({ length: ITEMS_PER_PAGE }, (_, index) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					className="mb-2 w-full rounded-md bg-white p-4 shadow-md"
				>
					<div className="flex items-center justify-between border-b pb-4">
						<div>
							<div className="mb-2 flex items-center">
								<div className="flex items-center gap-3">
									<Skeleton className="h-6 w-[200px]" />
								</div>
							</div>
							<p className="text-sm text-gray-500">
								<Skeleton className="h-4 w-[100px]" />
							</p>
						</div>
					</div>
					<div
						className={clsx("grid gap-4 py-4", {
							"grid-cols-2": device === "mobile",
							"grid-cols-4": device === "tablet",
						})}
					>
						<div className="flex flex-col">
							<p className="text-xs">Annual Contract</p>
							<p className="font-medium">
								<Skeleton className="h-5 w-[100px]" />
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-xs">Savings</p>
							<p className="font-medium">
								<Skeleton className="h-5 w-[100px]" />
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-xs">Sub Category</p>
							<p className="font-medium">
								<Skeleton className="h-5 w-[100px]" />
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-xs">Region</p>
							<p className="font-medium">
								<Skeleton className="h-5 w-[100px]" />
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-xs">Service Owner</p>
							<p className="font-medium">
								<Skeleton className="h-5 w-[100px]" />
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-xs">Contract Term</p>
							<p className="font-medium">
								<Skeleton className="h-5 w-[100px]" />
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-xs">Contract To</p>
							<p className="font-medium">
								<Skeleton className="h-5 w-[100px]" />
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-xs">Notify SO Date</p>
							<p className="font-medium">
								<Skeleton className="h-5 w-[100px]" />
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-xs">Renewal Strategy</p>
							<p className="font-medium">
								<Skeleton className="h-5 w-[100px]" />
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-xs">Contract Type</p>
							<p className="font-medium">
								<Skeleton className="h-5 w-[100px]" />
							</p>
						</div>
						<div className="flex flex-col">
							<p className="text-xs">Request Type</p>
							<p className="font-medium">
								<Skeleton className="h-5 w-[100px]" />
							</p>
						</div>
					</div>
					<Separator />
					<div className="flex justify-between pt-2 gap-2">
						<Button size="sm" variant="ghost" className="h-7 gap-1">
							<Trash className="h-3.5 w-3.5 text-red-600" />
							<span className="sr-only sm:not-sr-only text-red-600 sm:whitespace-nowrap">
								Delete
							</span>
						</Button>
						<Button size="sm" variant="ghost" className="h-7 gap-1">
							<Edit className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Update
							</span>
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
export function ContractTableSkeleton() {
	return (
		<>
			<div className="sm:block md:hidden lg:hidden">
				<ContractMobileSkeleton device="mobile" />
			</div>
			<div className="hidden md:block lg:block xl:hidden">
				<ContractMobileSkeleton device="tablet" />
			</div>
			<Table className="hidden xl:block pt-2 w-[calc(90vw)] overflow-x-auto">
				<tbody className="hidden sm:hidden md:hidden lg:block xl:block pt-2 w-[calc(90vw)] overflow-x-auto bg-transparent">
					{Array.from({ length: ITEMS_PER_PAGE }, (_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<TableRowSkeleton key={index} />
					))}
				</tbody>
			</Table>
		</>
	);
}

export default function GenericLoader() {
	return (
		<main className="flex justify-center items-center h-[calc(100vh)]">
			<div className="w-10 h-10 flex justify-center items-center bg-slate-800/80 rounded-md">
				<LoaderCircle
					size={48}
					color="#ffffff"
					className="animate-spinner h-3.5 w-3.5"
				/>
			</div>
		</main>
	);
}
