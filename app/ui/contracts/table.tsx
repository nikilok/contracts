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
	Currency,
	RenewalStrategy,
	RequestType,
	RiskClassification,
	SubCategory,
} from "@/app/lib/constants";
import { getContracts } from "@/app/lib/data";
import { getLabel, getSymbol } from "@/app/lib/utils";
import type { Status } from "@/app/types";
import { MoreHorizontal } from "lucide-react";

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
	return (
		<>
			<div className="block md:hidden">
				<h3>mobile view coming soon..</h3>
			</div>
			<Table className="hidden md:table-cell">
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Service Owner</TableHead>
						<TableHead className="hidden md:table-cell">
							Contract Value
						</TableHead>
						<TableHead className="hidden md:table-cell">From</TableHead>
						<TableHead className="hidden md:table-cell">To</TableHead>
						<TableHead className="hidden md:table-cell">Auto Renewal</TableHead>
						<TableHead className="hidden md:table-cell">Sub Category</TableHead>
						<TableHead className="hidden md:table-cell">
							Contract Type
						</TableHead>
						<TableHead className="hidden md:table-cell">Request Type</TableHead>
						<TableHead className="hidden md:table-cell">Request Date</TableHead>
						<TableHead className="hidden md:table-cell">Savings</TableHead>
						<TableHead className="hidden md:table-cell">PO Required</TableHead>
						<TableHead className="hidden md:table-cell">
							Renewal Strategy
						</TableHead>
						<TableHead className="hidden md:table-cell">
							Review Period
						</TableHead>
						<TableHead className="hidden md:table-cell">SEF Complete</TableHead>
						<TableHead className="hidden md:table-cell">
							Privacy Assesment
						</TableHead>
						<TableHead className="hidden md:table-cell">
							Risk Classifiation
						</TableHead>
						<TableHead>
							<span className="sr-only">Actions</span>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.map((row) => {
						return (
							<TableRow key={row.id}>
								<TableCell className="font-medium">
									{row.supplier.name}
								</TableCell>
								{/* <TableCell className="font-medium">
													<Badge variant="outline">Active</Badge>
												</TableCell> */}
								<TableCell>{row.description}</TableCell>
								<TableCell className="hidden md:table-cell">
									{row.serviceOwner}
								</TableCell>

								<TableCell className="hidden md:table-cell">
									{row.annualContractValue
										? `${row.annualContractValue} ${getSymbol(Currency, row.annualContractCurrency)}`
										: null}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{new Date(row.contractFrom).toLocaleDateString()}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{new Date(row.contractTo).toLocaleDateString()}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{row.autoRenewal.toString()}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{getLabel(SubCategory, row.subCategory)}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{getLabel(ContractTypes, row.contractType)}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{getLabel(RequestType, row.requestType)}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{new Date(row.requestDate).toLocaleDateString()}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{row.savingsValue
										? `${row.savingsValue} ${getSymbol(Currency, row.annualContractCurrency)}`
										: null}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{row.poRequired.toString()}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{getLabel(RenewalStrategy, row.renewalStrategy)}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{row.reviewPeriod?.toString()}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{row.sefComplete.toString()}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{row.privacyAssessmentComplete.toString()}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{getLabel(RiskClassification, row.riskClassification)}
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup="true" size="icon" variant="ghost">
												<MoreHorizontal className="h-4 w-4" />
												<span className="sr-only">Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</>
	);
}
