import { Button } from "@/app/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/app/components/ui/table";
import {
	ContractTypes,
	RenewalStrategy,
	RequestType,
	RiskClassification,
	SubCategory,
} from "@/app/lib/constants";
import { getContracts } from "@/app/lib/data";
import { getCurrency, getLabel } from "@/app/lib/utils";
import type { Status } from "@/app/types";
import { Check, MoreHorizontal, Rabbit } from "lucide-react";
import Link from "next/link";

export default async function ContractsTable({
	query,
	status,
	currentPage,
}: {
	query: string;
	status: Status;
	currentPage: number;
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
				<h3>table view coming soon..</h3>
			</div>
			<Table className="hidden sm:hidden md:hidden lg:block xl:block pt-2 w-[calc(90vw)] overflow-x-auto">
				<TableHeader>
					<TableRow>
						<TableHead>
							<span className="sr-only">Actions</span>
						</TableHead>
						<TableHead className="w-[300px]">Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Service Owner</TableHead>
						<TableHead>Contract Value</TableHead>
						<TableHead>From</TableHead>
						<TableHead>To</TableHead>
						<TableHead>Auto Renewal</TableHead>
						<TableHead>Sub Category</TableHead>
						<TableHead>Contract Type</TableHead>
						<TableHead>Request Type</TableHead>
						<TableHead>Request Date</TableHead>
						<TableHead>Savings</TableHead>
						<TableHead>PO Required</TableHead>
						<TableHead>Renewal Strategy</TableHead>
						<TableHead>Review Period</TableHead>
						<TableHead>SEF Complete</TableHead>
						<TableHead>Privacy Assesment</TableHead>
						<TableHead>InfoSec In Scope</TableHead>
						<TableHead>InfoSec Assessment</TableHead>
						<TableHead>PII Scope</TableHead>
						<TableHead>Risk Classifiation</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((row) => {
						return (
							<TableRow key={row.id}>
								<TableCell className="table-fixed right-0">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup="true" size="icon" variant="ghost">
												<MoreHorizontal className="h-4 w-4" />
												<span className="sr-only">Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem>
												<Link
													href={{
														pathname: `/dashboard/${row.id}/edit`,
														query: { status },
													}}
													className="w-full"
												>
													Update
												</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
								<TableCell className="font-medium text-nowrap">
									{row.supplier.name}
								</TableCell>
								{/* <TableCell className="font-medium">
													<Badge variant="outline">Active</Badge>
												</TableCell> */}
								<TableCell className="text-nowrap">{row.description}</TableCell>
								<TableCell className="text-nowrap">
									{row.serviceOwner}
								</TableCell>

								<TableCell className="text-right">
									{row.annualContractValue
										? getCurrency(row.annualContractCurrency).format(
												row.annualContractValue,
											)
										: null}
								</TableCell>
								<TableCell>
									{new Date(row.contractFrom).toLocaleDateString()}
								</TableCell>
								<TableCell>
									{new Date(row.contractTo).toLocaleDateString()}
								</TableCell>
								<TableCell>{row.autoRenewal && <Check />}</TableCell>
								<TableCell>{getLabel(SubCategory, row.subCategory)}</TableCell>
								<TableCell>
									{getLabel(ContractTypes, row.contractType)}
								</TableCell>
								<TableCell>{getLabel(RequestType, row.requestType)}</TableCell>
								<TableCell>
									{new Date(row.requestDate).toLocaleDateString()}
								</TableCell>
								<TableCell className="text-right">
									{row.savingsValue
										? getCurrency(row.annualContractCurrency).format(
												row.savingsValue,
											)
										: null}
								</TableCell>
								<TableCell>{row.poRequired && <Check />}</TableCell>
								<TableCell>
									{getLabel(RenewalStrategy, row.renewalStrategy)}
								</TableCell>
								<TableCell>{row.reviewPeriod?.toString()}</TableCell>
								<TableCell>{row.sefComplete && <Check />}</TableCell>
								<TableCell>
									{row.privacyAssessmentComplete && <Check />}
								</TableCell>
								<TableCell>{row.infoSecInScope && <Check />}</TableCell>
								<TableCell>
									{row.infoSecAssessmentComplete && <Check />}
								</TableCell>
								<TableCell>{row.piiScope && <Check />}</TableCell>
								<TableCell>
									{getLabel(RiskClassification, row.riskClassification)}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</>
	);
}
