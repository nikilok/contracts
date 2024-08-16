"use client";

import { Button } from "@/app/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { TableCell } from "@/app/components/ui/table";
import {
	ContractTypes,
	Regions,
	RenewalStrategy,
	RequestType,
	RiskClassification,
	SubCategory,
} from "@/app/lib/constants";
import { getCurrency, getLabel } from "@/app/lib/utils";
import type { Contract } from "@/app/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Contract>[] = [
	{
		id: "action",
		cell: ({ row }) => {
			const data = row.original;

			return (
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
									pathname: `/dashboard/${data.id}/edit`,
									query: { status: "active" },
								}}
								className="w-full"
							>
								Update
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
	{
		accessorKey: "supplier.name",
		header: "Supplier Name",
		size: 120,
	},
	{
		accessorKey: "description",
		header: "Service Description",
		size: 220,
	},
	{
		accessorKey: "subCategory",
		header: "Category",
		cell: ({ row }) => {
			const value = `${row.getValue("subCategory")}`;
			return <TableCell>{getLabel(SubCategory, value)}</TableCell>;
		},
	},
	{
		accessorKey: "region",
		header: "Region",
		cell: ({ row }) => {
			const value = `${row.getValue("region")}`;
			return <TableCell>{getLabel(Regions, value)}</TableCell>;
		},
	},
	{
		accessorKey: "serviceOwner",
		header: "Service Owner",
		size: 120,
	},
	{
		accessorKey: "annualContractCurrency",
		header: "Current Annual Spend",
		// size: 220,
		cell: ({ row }) => {
			const data = row.original;
			return (
				<TableCell className="text-right">
					{data.annualContractValue
						? getCurrency(data.annualContractCurrency).format(
								data.annualContractValue,
							)
						: null}
				</TableCell>
			);
		},
	},
	{
		accessorKey: "savingsValue",
		header: "Savings",
		cell: ({ row }) => {
			const data = row.original;
			return (
				<TableCell className="text-right">
					{data.savingsValue
						? getCurrency(data.annualContractCurrency).format(data.savingsValue)
						: null}
				</TableCell>
			);
		},
	},
	{
		accessorKey: "contractFrom",
		header: "Contract From",
		cell: ({ row }) => {
			return (
				<TableCell>
					{new Date(row.getValue("contractFrom")).toLocaleDateString()}
				</TableCell>
			);
		},
	},
	{
		accessorKey: "contractTo",
		header: "Contract Expiry",
		cell: ({ row }) => {
			return (
				<TableCell>
					{new Date(row.getValue("contractTo")).toLocaleDateString()}
				</TableCell>
			);
		},
	},
	{
		header: "Notify SO Date",
		cell: ({ row }) => {
			const data = row.original;
			const contractTo = new Date(data.contractTo ?? 0);
			const daysToNotify = Number.parseInt(data.reviewPeriod ?? 0);
			const notifyDate = contractTo.setDate(
				contractTo.getDate() - daysToNotify,
			);
			return <TableCell>{new Date(notifyDate).toLocaleDateString()}</TableCell>;
		},
	},
	{
		accessorKey: "renewalStrategy",
		header: "Renewal Strategy",
		cell: ({ row }) => {
			const value = `${row.getValue("renewalStrategy")}`;
			return <TableCell>{getLabel(RenewalStrategy, value)}</TableCell>;
		},
	},
	{
		accessorKey: "contractType",
		header: "Contract Type",
		cell: ({ row }) => {
			const value = `${row.getValue("contractType")}`;
			return <TableCell>{getLabel(ContractTypes, value)}</TableCell>;
		},
	},
	{
		accessorKey: "requestType",
		header: "Request Type",
		cell: ({ row }) => {
			const value = `${row.getValue("requestType")}`;
			return <TableCell>{getLabel(RequestType, value)}</TableCell>;
		},
	},
	{
		accessorKey: "autoRenewal",
		header: "Auto Renewal",
		cell: ({ row }) => {
			const value = Boolean(row.getValue("autoRenewal"));
			return <TableCell>{value && <Check />}</TableCell>;
		},
	},
	{
		accessorKey: "sefComplete",
		header: "SEF Complete",
		cell: ({ row }) => {
			const value = Boolean(row.getValue("sefComplete"));
			return <TableCell>{value && <Check />}</TableCell>;
		},
	},
	{
		accessorKey: "poRequired",
		header: "Covered under PO",
		cell: ({ row }) => {
			const value = Boolean(row.getValue("poRequired"));
			return <TableCell>{value && <Check />}</TableCell>;
		},
	},
	{
		accessorKey: "infoSecInScope",
		header: "InfoSec Scope",
		cell: ({ row }) => {
			const value = Boolean(row.getValue("infoSecInScope"));
			return <TableCell>{value && <Check />}</TableCell>;
		},
	},
	{
		accessorKey: "infoSecAssessmentComplete",
		header: "InfoSec review complete",
		cell: ({ row }) => {
			const value = Boolean(row.getValue("infoSecAssessmentComplete"));
			return <TableCell>{value && <Check />}</TableCell>;
		},
	},
	{
		accessorKey: "piiScope",
		header: "PII Scope",
		cell: ({ row }) => {
			const value = Boolean(row.getValue("piiScope"));
			return <TableCell>{value && <Check />}</TableCell>;
		},
	},
	{
		accessorKey: "privacyAssessmentComplete",
		header: "DP Review Complete",
		cell: ({ row }) => {
			const value = Boolean(row.getValue("privacyAssessmentComplete"));
			return <TableCell>{value && <Check />}</TableCell>;
		},
	},
	{
		accessorKey: "riskClassification",
		header: "Criticality",
		cell: ({ row }) => {
			const value = `${row.getValue("riskClassification")}`;
			return <TableCell>{getLabel(RiskClassification, value)}</TableCell>;
		},
	},
];
