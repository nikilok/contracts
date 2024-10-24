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
import { Separator } from "@/app/components/ui/separator";
import { Switch } from "@/app/components/ui/switch";
import { Textarea } from "@/app/components/ui/textarea";
import { submitOrDraftContracts } from "@/app/lib/actions";
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
import { Calendar as CalendarDaysIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { CreateButton, CreateDraftButton } from "../buttons";

export default function Form({
	suppliers,
}: {
	suppliers: { value: string; label: string }[];
}) {
	const [contractReviewPeriod, setContractReviewPeriod] = useState("0");
	const [infoSecComplete, setInfoSecComplete] = useState(false);
	const [piiComplete, setPiiComplete] = useState(false);
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const status = params.get("status");
	const [date, setDate] = useState<Date | undefined>();
	const [completeDate, setCompleteDate] = useState<Date | undefined>();
	const [currency, setCurrency] = useState<string | undefined>();
	const [supplierId, setSupplierId] = useState<string | null>(null);
	const [isDraft, setIsDraft] = useState<null | boolean>(null);
	const [contractFrom, setContractFrom] = useState<null | string>(null);
	const [contractTo, setContractTo] = useState<undefined | string>(undefined);

	const initialState = { message: null, errors: {} };
	const [state, dispatch] = useActionState(
		//@ts-expect-error ignore this
		submitOrDraftContracts,
		initialState,
	);

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
			<input
				type="hidden"
				name="request-complete-date"
				value={completeDate?.toISOString()}
			/>
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
						<Label>Request Complete Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="w-full justify-start font-normal"
								>
									<CalendarDaysIcon className="mr-2 h-4 w-4" />
									{completeDate ? completeDate?.toDateString() : "Pick a date"}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={completeDate}
									onSelect={setCompleteDate}
									className="rounded-md border shadow"
								/>
							</PopoverContent>
						</Popover>
						{state?.errors?.requestCompleteDate?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="supplier-name">Supplier Name</Label>
						<ComboBox
							onAdd={onAddSupplier}
							onSelect={onSelectHandler}
							placeholder="Select supplier"
							options={suppliers}
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
						<Select name="sub-category">
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
								initialDateFrom={new Date().toLocaleDateString("en-CA")}
								initialDateTo={new Date().toLocaleDateString("en-CA")}
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
						<Select name="contract-type">
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
						<Select name="request-type">
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
							/>
							<Select
								name="annual-contract-currency"
								onValueChange={setCurrency}
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
							/>
							<span className="uppercase text-xs opacity-50">{currency}</span>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="service-categorization">
							Service Categorization
						</Label>
						<Select name="service-categorization">
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
						<Select name="risk-classification">
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
						<Select name="benefiting-region">
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
									Data privacy assessment complete ?
								</Label>
								<Switch
									id="pii-assessment-complete"
									name="pii-assessment-complete"
									aria-label="Data privacy assessment complete ?"
								/>
							</div>
						)}
					</div>
					<div className="space-x-2">
						<Label htmlFor="sef-completed">SEF Completed</Label>
						<Switch
							id="sef-completed"
							name="sef-completed"
							aria-label="SEF Completed"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="contract-review-period">
							Contract Review Period
						</Label>
						<div className="flex items-center gap-2">
							<Select
								value={contractReviewPeriod}
								name="contract-review-period"
								onValueChange={setContractReviewPeriod}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select period" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="0">Please Select</SelectItem>
									<SelectItem value="30">30 days</SelectItem>
									<SelectItem value="60">60 days</SelectItem>
									<SelectItem value="90">90 days</SelectItem>
									<SelectItem value="180">180 days</SelectItem>
									<SelectItem value="-1">Custom</SelectItem>
								</SelectContent>
							</Select>
							{contractReviewPeriod === "-1" && (
								<Input
									id="contract-review-period"
									name="custom-review-period"
									type="number"
									placeholder="Custom period"
									defaultValue="190"
								/>
							)}
						</div>
						{state?.errors?.reviewPeriod?.map((error: string) => (
							<p className="mt-2 text-sm text-red-500" key={error}>
								{error}
							</p>
						))}
					</div>
					<div className="space-y-2">
						<Label htmlFor="renewal-strategy">Renewal Strategy</Label>
						<Select name="renewal-strategy">
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
							name="po-required"
							aria-label="PO Required"
						/>
					</div>
					<div className="space-x-2">
						<Label htmlFor="ever-green">Evergreen</Label>
						<Switch id="ever-green" name="ever-green" aria-label="Evergreen" />
					</div>
					<div className="space-x-2">
						<Label htmlFor="auto-renewal">Auto Renewal?</Label>
						<Switch
							id="auto-renewal"
							name="auto-renewal"
							aria-label="Auto Renewal"
						/>
					</div>
				</div>
				<Separator className="bg-slate-900/30" />
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
				<CreateDraftButton setIsDraft={setIsDraft} isDraft={isDraft} />
				<CreateButton setIsDraft={setIsDraft} isDraft={isDraft} />
			</CardFooter>
		</form>
	);
}
