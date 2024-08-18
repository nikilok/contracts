"use client";

import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import { CardContent, CardFooter } from "@/app/components/ui/card";
import { ComboBox } from "@/app/components/ui/combo-box";
import { DateRangePicker } from "@/app/components/ui/date-range-picker";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/app/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { Textarea } from "@/app/components/ui/textarea";
import { updateContract } from "@/app/lib/actions";
import {
	ContractTypes,
	Currency,
	Regions,
	RenewalStrategy,
	RequestType,
	RiskClassification,
	ServiceCategorization,
	SubCategory,
} from "@/app/lib/constants";
import { addSupplier } from "@/app/lib/data";
import type { Contract } from "@/app/types";
import {
	Calendar as CalendarDaysIcon,
	Notebook,
	RocketIcon,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";
import { EditSaveDraftButton, EditUpdateButton } from "../buttons";

export default function Form({
	suppliers,
	contract,
}: {
	suppliers: { value: string; label: string }[];
	contract: Contract;
}) {
	const [infoSecComplete, setInfoSecComplete] = useState(
		Boolean(contract.infoSecInScope),
	);
	const [piiComplete, setPiiComplete] = useState(Boolean(contract.piiScope));
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const status = params.get("status");
	const [date, setDate] = useState<Date | undefined>(
		new Date(contract.requestDate),
	);
	const [currency, setCurrency] = useState<string | undefined>();
	const [supplierId, setSupplierId] = useState<string | null>(
		contract.supplierId,
	);
	const [isDraft, setIsDraft] = useState<null | boolean>(
		Boolean(contract.isDraft),
	);
	const [contractFrom, setContractFrom] = useState<null | string>(
		new Date(contract.contractFrom).toISOString(),
	);
	const [contractTo, setContractTo] = useState<undefined | string>(
		new Date(contract.contractTo).toISOString(),
	);

	const initialState = { message: null, errors: {} };
	const updateContractWithId = updateContract.bind(null, contract.id);
	//@ts-expect-error ignore this for now.
	const [state, dispatch] = useFormState(updateContractWithId, initialState);

	const onAddSupplier = (name: string) => {
		addSupplier(name);
	};

	const onSelectHandler = (select: { value: string; label: string }) => {
		setSupplierId(select.value);
	};

	return (
		<form action={dispatch}>
			<input type="hidden" name="supplier-id" value={supplierId ?? ""} />
			<input type="hidden" name="request-date" value={date?.toISOString()} />
			<input type="hidden" name="isDraft" value={`${isDraft}`} />
			<input type="hidden" name="contract-from" value={contractFrom ?? ""} />
			<input type="hidden" name="contract-to" value={contractTo ?? ""} />
			<CardContent className="grid gap-6">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					<div className="space-y-2">
						<Label htmlFor="request-date">Request Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="w-full justify-start font-normal"
								>
									<CalendarDaysIcon className="mr-2 h-4 w-4" />
									{date ? date?.toDateString() : "Pick a date"}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
									className="rounded-md border shadow"
								/>
							</PopoverContent>
						</Popover>
						{state?.errors?.requestDate?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="supplier-name">Supplier Name</Label>
						<ComboBox
							disabled
							onAdd={onAddSupplier}
							onSelect={onSelectHandler}
							placeholder="Select supplier"
							options={suppliers}
							defaultValue={supplierId}
						/>
						{state?.errors?.supplierId?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="service-description">Service Description</Label>
						<Textarea
							id="service-description"
							name="service-description"
							defaultValue={contract.description}
							placeholder="Provide a description of the service"
						/>

						{state?.errors?.serviceDescription?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="sub-category">Sub Category</Label>
						<Select name="sub-category" defaultValue={contract.subCategory}>
							<SelectTrigger>
								<SelectValue placeholder="Select sub-category" />
							</SelectTrigger>
							<SelectContent>
								{SubCategory.map(({ label, value }) => {
									return (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
						{state?.errors?.subCategory?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="service-owner">Service Owner</Label>
						<Input
							id="service-owner"
							name="service-owner"
							placeholder="Enter service owner name"
							defaultValue={contract.serviceOwner}
						/>
						{state?.errors?.serviceOwner?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="contract-period">Contract Period</Label>
						<div>
							<DateRangePicker
								onUpdate={(values) => {
									setContractFrom(values.range.from.toISOString());
									setContractTo(values.range.to?.toISOString());
								}}
								initialDateFrom={new Date(
									contractFrom ?? "",
								).toLocaleDateString("en-CA")}
								initialDateTo={new Date(contractTo ?? "").toLocaleDateString(
									"en-CA",
								)}
								align="start"
								locale="en-GB"
								showCompare={false}
							/>
						</div>
						{state?.errors?.contractFrom?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
						{state?.errors?.contractTo?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="contract-type">Contract Type</Label>
						<Select
							name="contract-type"
							defaultValue={contract.contractType ?? ""}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select contract type" />
							</SelectTrigger>
							<SelectContent>
								{ContractTypes.map(({ value, label }) => {
									return (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
						{state?.errors?.contractType?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="request-type">Request Type</Label>
						<Select
							name="request-type"
							defaultValue={contract.requestType ?? ""}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select request type" />
							</SelectTrigger>
							<SelectContent>
								{RequestType.map(({ value, label }) => {
									return (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
						{state?.errors?.requestType?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="annual-contract-value">Annual Contract Value</Label>
						<div className="flex items-center gap-2">
							<Input
								id="annual-contract-value"
								name="annual-contract-value"
								type="number"
								placeholder="Enter value"
								defaultValue={contract.annualContractValue}
							/>
							<Select
								name="annual-contract-currency"
								onValueChange={setCurrency}
								defaultValue={contract.annualContractCurrency ?? ""}
							>
								<SelectTrigger>
									<SelectValue placeholder="Currency" />
								</SelectTrigger>
								<SelectContent>
									{Currency.map(({ value, label }) => {
										return (
											<SelectItem key={value} value={value}>
												{label}
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
						</div>
						{state?.errors?.annualContractValue?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
						{state?.errors?.annualContractCurrency?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="savings">Savings</Label>
						<div className="flex items-center gap-2">
							<Input
								className="max-w-[85%]"
								id="savings"
								name="savings"
								type="number"
								placeholder="Enter value"
								defaultValue={contract.savingsValue}
							/>
							<span className="uppercase text-xs opacity-50">{currency}</span>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="service-categorization">
							Service Categorization
						</Label>
						<Select
							name="service-categorization"
							defaultValue={contract.serviceCategory ?? ""}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select categorization" />
							</SelectTrigger>
							<SelectContent>
								{ServiceCategorization.map(({ value, label }) => {
									return (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
						{state?.errors?.serviceCategorization?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="risk-classification">Risk Classification</Label>
						<Select
							name="risk-classification"
							defaultValue={contract.riskClassification ?? ""}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select risk classification" />
							</SelectTrigger>
							<SelectContent>
								{RiskClassification.map(({ value, label }) => {
									return (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
						{state?.errors?.riskClassification?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="benefiting-region">Benefiting Region</Label>
						<Select
							name="benefiting-region"
							defaultValue={contract.region ?? ""}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select benefiting region" />
							</SelectTrigger>
							<SelectContent>
								{Regions.map(({ value, label }) => {
									return (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
						{state?.errors?.region?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="flex flex-col gap-2">
						<div className="space-x-2">
							<Label htmlFor="infosec-in-scope">Infosec in Scope</Label>
							<Switch
								id="infosec-in-scope"
								name="infosec-in-scope"
								checked={infoSecComplete}
								onCheckedChange={setInfoSecComplete}
								aria-label="Infosec in Scope"
							/>
						</div>
						{infoSecComplete === true && (
							<div className="space-x-2">
								<Label htmlFor="infosec-assesment">
									Infosec assesment complete ?
								</Label>
								<Switch
									id="infosec-assesment"
									name="infosec-assesment"
									defaultChecked={Boolean(contract.infoSecAssessmentComplete)}
									aria-label="Infosec Assessment Complete"
								/>
							</div>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<div className="space-x-2">
							<Label htmlFor="pii-in-scope">PII in Scope</Label>
							<Switch
								id="pii-in-scope"
								name="pii-in-scope"
								checked={piiComplete}
								onCheckedChange={setPiiComplete}
								aria-label="PII in Scope"
							/>
						</div>
						{piiComplete === true && (
							<div className="space-x-2">
								<Label htmlFor="pii-assessment-complete">
									Privacy assessment complete ?
								</Label>
								<Switch
									id="pii-assessment-complete"
									name="pii-assessment-complete"
									defaultChecked={Boolean(contract.privacyAssessmentComplete)}
									aria-label="Data privacy assessment complete ?"
								/>
							</div>
						)}
					</div>
					<div className="space-x-2">
						<Label htmlFor="sef-completed">SEF Completed</Label>
						<Switch
							id="sef-completed"
							defaultChecked={Boolean(contract.sefComplete)}
							name="sef-completed"
							aria-label="SEF Completed"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="contract-review-period">
							Contract Review Period
						</Label>
						<div className="flex items-center gap-2">
							<Input
								id="contract-review-period"
								name="contract-review-period"
								type="number"
								placeholder="Custom period"
								defaultValue={contract.reviewPeriod}
							/>
						</div>
						{state?.errors?.reviewPeriod?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="renewal-strategy">Renewal Strategy</Label>
						<Select
							name="renewal-strategy"
							defaultValue={contract.renewalStrategy ?? ""}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select renewal strategy" />
							</SelectTrigger>
							<SelectContent>
								{RenewalStrategy.map(({ value, label }) => {
									return (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
						{state?.errors?.renewalStrategy?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-x-2">
						<Label htmlFor="po-required">PO Required?</Label>
						<Switch
							id="po-required"
							defaultChecked={Boolean(contract.poRequired)}
							name="po-required"
							aria-label="PO Required"
						/>
					</div>
					<div className="space-x-2">
						<Label htmlFor="ever-green">Ever Green?</Label>
						<Switch
							id="ever-green"
							defaultChecked={Boolean(contract.everGreen)}
							name="ever-green"
							aria-label="Ever Green"
						/>
					</div>
					<div className="space-x-2">
						<Label htmlFor="auto-renewal">Auto Renewal?</Label>
						<Switch
							id="auto-renewal"
							defaultChecked={Boolean(contract.autoRenewal)}
							name="auto-renewal"
							aria-label="Auto Renewal"
						/>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-end gap-3">
				<Link
					tabIndex={-1}
					href={{
						pathname: "/dashboard/contracts",
						query: { status },
					}}
				>
					<Button tabIndex={-1} variant="link">
						Cancel
					</Button>
				</Link>
				{Boolean(contract.isDraft) && (
					<EditSaveDraftButton setIsDraft={setIsDraft} isDraft={isDraft} />
				)}
				<EditUpdateButton setIsDraft={setIsDraft} isDraft={isDraft} />
			</CardFooter>
		</form>
	);
}
