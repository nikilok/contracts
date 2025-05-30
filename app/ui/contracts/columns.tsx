"use client";

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
import { intlFormatDistance } from "date-fns";
import { Check } from "lucide-react";
import { ActionMenuCell } from "./action-menu-cell";

const options: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "short",
	day: "numeric",
};
export const columns: ColumnDef<Contract>[] = [
	{
		id: "action",
		enableResizing: false,
		cell: ({ row }) => {
			const contract = row.original;
			return <ActionMenuCell contract={contract} />;
		},
	},
	{
		accessorKey: "supplier.name",
		header: "Supplier Name",
		size: 120,
		minSize: 120,
	},
	{
		accessorKey: "description",
		header: "Service Description",
		size: 220,
		minSize: 120,
	},
	{
		accessorKey: "subCategory",
		header: "Category",
		cell: ({ row }) => {
			const value = `${row.getValue("subCategory")}`;
			return getLabel(SubCategory, value);
		},
	},
	{
		accessorKey: "region",
		header: "Region",
		cell: ({ row }) => {
			const value = `${row.getValue("region")}`;
			return getLabel(Regions, value);
		},
	},
	{
		accessorKey: "serviceOwner",
		header: "Service Owner",
		size: 120,
		minSize: 120,
	},
	{
		accessorKey: "annualContractCurrency",
		header: "Current Annual Spend",
		cell: ({ row }) => {
			const data = row.original;
			return (
				<span className="text-right">
					{data.annualContractValue
						? getCurrency(data.annualContractCurrency).format(
								data.annualContractValue,
							)
						: null}
				</span>
			);
		},
	},
	{
		accessorKey: "savingsValue",
		header: "Savings",
		cell: ({ row }) => {
			const data = row.original;
			return (
				<span className="text-right">
					{data.savingsValue
						? getCurrency(data.annualContractCurrency).format(data.savingsValue)
						: null}
				</span>
			);
		},
	},
	{
		header: "Contract Term",
		enableResizing: true,
		size: 120,
		cell: ({ row }) => {
			const data = row.original;
			const baseDate = new Date();
			const dateTo = new Date(data.contractTo ?? 0);
			const isEverGreen = Boolean(data.everGreen);
			const contractTerm = intlFormatDistance(dateTo, baseDate);
			return isEverGreen ? "evergreen" : contractTerm;
		},
	},
	{
		accessorKey: "contractFrom",
		enableHiding: true,
		size: 150,
		header: "Contract From",
		enableResizing: false,
		cell: ({ row }) => {
			return new Date(row.getValue("contractFrom")).toLocaleDateString(
				"en-US",
				options,
			);
		},
	},
	{
		accessorKey: "contractTo",
		header: "Contract Expiry",
		enableResizing: false,
		size: 150,
		cell: ({ row }) => {
			return new Date(row.getValue("contractTo")).toLocaleDateString(
				"en-US",
				options,
			);
		},
	},
	{
		header: "Notify SO Date",
		enableResizing: false,
		size: 150,
		cell: ({ row }) => {
			const data = row.original;
			const contractTo = new Date(data.contractTo ?? 0);
			const daysToNotify = Number.parseInt(data.reviewPeriod ?? 0);
			const notifyDate = contractTo.setDate(
				contractTo.getDate() - daysToNotify,
			);
			return new Date(notifyDate).toLocaleDateString("en-US", options);
		},
	},
	{
		accessorKey: "renewalStrategy",
		header: "Renewal Strategy",
		cell: ({ row }) => {
			const value = `${row.getValue("renewalStrategy")}`;
			return getLabel(RenewalStrategy, value);
		},
	},
	{
		accessorKey: "contractType",
		header: "Contract Type",
		cell: ({ row }) => {
			const value = `${row.getValue("contractType")}`;
			return getLabel(ContractTypes, value);
		},
	},
	{
		accessorKey: "requestType",
		header: "Request Type",
		cell: ({ row }) => {
			const value = `${row.getValue("requestType")}`;
			return getLabel(RequestType, value);
		},
	},
	{
		accessorKey: "autoRenewal",
		header: "Auto Renewal",
		enableResizing: false,
		cell: ({ row }) => {
			const value = Boolean(row.getValue("autoRenewal"));
			return value && <Check />;
		},
	},
	{
		accessorKey: "sefComplete",
		header: "SEF Complete",
		enableResizing: false,
		cell: ({ row }) => {
			const value = Boolean(row.getValue("sefComplete"));
			return value && <Check />;
		},
	},
	{
		accessorKey: "poRequired",
		header: "Covered under PO",
		enableResizing: false,
		cell: ({ row }) => {
			const value = Boolean(row.getValue("poRequired"));
			return value && <Check />;
		},
	},
	{
		accessorKey: "infoSecInScope",
		header: "InfoSec Scope",
		enableResizing: false,
		cell: ({ row }) => {
			const value = Boolean(row.getValue("infoSecInScope"));
			return value && <Check />;
		},
	},
	{
		accessorKey: "infoSecAssessmentComplete",
		header: "InfoSec review complete",
		enableResizing: false,
		cell: ({ row }) => {
			const value = Boolean(row.getValue("infoSecAssessmentComplete"));
			return value && <Check />;
		},
	},
	{
		accessorKey: "piiScope",
		header: "PII Scope",
		enableResizing: false,
		cell: ({ row }) => {
			const value = Boolean(row.getValue("piiScope"));
			return value && <Check />;
		},
	},
	{
		accessorKey: "privacyAssessmentComplete",
		header: "DP Review Complete",
		enableResizing: false,
		cell: ({ row }) => {
			const value = Boolean(row.getValue("privacyAssessmentComplete"));
			return value && <Check />;
		},
	},
	{
		accessorKey: "riskClassification",
		header: "Criticality",
		cell: ({ row }) => {
			const value = `${row.getValue("riskClassification")}`;
			return getLabel(RiskClassification, value);
		},
	},
];
