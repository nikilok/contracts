import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import {
	ContractTypes,
	Regions,
	RenewalStrategy,
	RequestType,
	SubCategory,
} from "@/app/lib/constants";
import { getCurrency, getLabel } from "@/app/lib/utils";
import type { Contract } from "@/app/types";
import clsx from "clsx";
import { intlFormatDistance } from "date-fns";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

export default function MobileLayout({
	data,
	device,
}: { data: Contract[]; device: "mobile" | "tablet" }) {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};
	return (
		<div className="mt-4">
			{data?.map((row) => {
				const baseDate = new Date();
				const dateTo = new Date(row.contractTo ?? 0);
				const isEverGreen = Boolean(row.everGreen);
				const contractTerm = intlFormatDistance(dateTo, baseDate);
				const daysToNotify = Number.parseInt(row.reviewPeriod ?? 0);
				const notifyDate = dateTo.setDate(dateTo.getDate() - daysToNotify);

				return (
					<div
						key={row.id}
						className="mb-2 w-full rounded-md bg-white dark:bg-secondary/80 p-4 shadow-md"
					>
						<div className="flex items-center justify-between border-b pb-4">
							<div>
								<div className="mb-2 flex items-center">
									<div className="flex items-center gap-3">
										{row.supplier.name}
									</div>
								</div>
								<p className="text-sm text-gray-500">{row.description}</p>
							</div>
						</div>
						<div
							className={clsx("grid gap-4 py-4", {
								"grid-cols-2": device === "mobile",
								"grid-cols-4": device === "tablet",
							})}
						>
							<div className="flex flex-col">
								<p className="text-xs text-gray-500">Annual Contract</p>
								<p className="font-medium">
									{row.annualContractValue
										? getCurrency(row.annualContractCurrency).format(
												row.annualContractValue,
											)
										: null}
								</p>
							</div>
							<div className="flex flex-col">
								<p className="text-xs text-gray-500">Savings</p>
								<p className="font-medium">
									{row.annualContractValue
										? getCurrency(row.annualContractCurrency).format(
												row.savingsValue,
											)
										: null}
								</p>
							</div>
							<div className="flex flex-col">
								<p className="text-xs text-gray-500">Sub Category</p>
								<p className="font-medium">
									{getLabel(SubCategory, row.subCategory)}
								</p>
							</div>
							<div className="flex flex-col">
								<p className="text-xs text-gray-500">Region</p>
								<p className="font-medium">{getLabel(Regions, row.region)}</p>
							</div>
							<div className="flex flex-col">
								<p className="text-xs text-gray-500">Service Owner</p>
								<p className="font-medium">{row.serviceOwner}</p>
							</div>
							<div className="flex flex-col">
								<p className="text-xs text-gray-500">Contract Term</p>
								<p className="font-medium">
									{isEverGreen ? "evergreen" : contractTerm}
								</p>
							</div>
							<div className="flex flex-col">
								<p className="text-xs text-gray-500">Contract To</p>
								<p className="font-medium">
									{new Date(row.contractTo).toLocaleDateString(
										"en-US",
										options,
									)}
								</p>
							</div>
							<div className="flex flex-col">
								<p className="text-xs text-gray-500">Notify SO Date</p>
								<p className="font-medium">
									{new Date(notifyDate).toLocaleDateString("en-US", options)}
								</p>
							</div>
							<div className="flex flex-col text-gray-500">
								<p className="text-xs">Renewal Strategy</p>
								<p className="font-medium">
									{getLabel(RenewalStrategy, row.renewalStrategy)}
								</p>
							</div>
							<div className="flex flex-col">
								<p className="text-xs text-gray-500">Contract Type</p>
								<p className="font-medium">
									{getLabel(ContractTypes, row.contractType)}
								</p>
							</div>
							<div className="flex flex-col">
								<p className="text-xs text-gray-500">Request Type</p>
								<p className="font-medium">
									{getLabel(RequestType, row.requestType)}
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
							<Link
								href={{
									pathname: `/dashboard/${row.id}/edit`,
									query: { status: "active" },
								}}
							>
								<Button size="sm" variant="ghost" className="h-7 gap-1">
									<Edit className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
										Update
									</span>
								</Button>
							</Link>
						</div>
					</div>
				);
			})}
		</div>
	);
}
