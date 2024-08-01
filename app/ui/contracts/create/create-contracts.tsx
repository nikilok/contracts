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
import { addSupplier } from "@/app/lib/data";
import {
	Calendar as CalendarDaysIcon,
	Notebook,
	RocketIcon,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Form({
	suppliers,
}: {
	suppliers: { value: string; label: string }[];
}) {
	const [contractReviewPeriod, setContractReviewPeriod] = useState("30");
	const [infoSecComplete, setInfoSecComplete] = useState(false);
	const [piiComplete, setPiiComplete] = useState(false);
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const status = params.get("status");
	const [date, setDate] = useState<Date | undefined>();
	const [currency, setCurrency] = useState<string | undefined>();

	const onAddSupplier = (name: string) => {
		addSupplier(name);
	};

	return (
		<form>
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
					</div>
					<div className="space-y-2">
						<Label htmlFor="supplier-name">Supplier Name</Label>
						<ComboBox
							onAdd={onAddSupplier}
							placeholder="Select supplier"
							options={suppliers}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="service-description">Service Description</Label>
						<Textarea
							id="service-description"
							placeholder="Provide a description of the service"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="sub-category">Sub Category</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select sub-category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="hr">HR Technology</SelectItem>
								<SelectItem value="benefits">Benefits</SelectItem>
								<SelectItem value="payroll">Payroll</SelectItem>
								<SelectItem value="reward">Reward</SelectItem>
								<SelectItem value="talent">Talent</SelectItem>
								<SelectItem value="recruitment">Recruitment</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="service-owner">Service Owner</Label>
						<Input id="service-owner" placeholder="Enter service owner name" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="contract-period">Contract Period</Label>
						<div>
							<DateRangePicker
								onUpdate={(values) => console.log(values)}
								initialDateFrom={new Date().toLocaleDateString("en-CA")}
								initialDateTo={new Date().toLocaleDateString("en-CA")}
								align="start"
								locale="en-GB"
								showCompare={false}
							/>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="contract-type">Contract Type</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select contract type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="msa">MSA</SelectItem>
								<SelectItem value="sow">SOW</SelectItem>
								<SelectItem value="addendum">Addendum</SelectItem>
								<SelectItem value="extension">Extension</SelectItem>
								<SelectItem value="order-form">Order Form</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="request-type">Request Type</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select request type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="new-contract">New Contract</SelectItem>
								<SelectItem value="rfp">RFP</SelectItem>
								<SelectItem value="contract-renewal">
									Contract Renewal
								</SelectItem>
								<SelectItem value="amendmend">Amendmend</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="annual-contract-value">Annual Contract Value</Label>
						<div className="flex items-center gap-2">
							<Input
								id="annual-contract-value"
								type="number"
								placeholder="Enter value"
							/>
							<Select onValueChange={setCurrency}>
								<SelectTrigger>
									<SelectValue placeholder="Currency" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="usd">USD</SelectItem>
									<SelectItem value="gbp">GBP</SelectItem>
									<SelectItem value="eur">EUR</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="savings">Savings</Label>
						<div className="flex items-center gap-2">
							<Input
								className="max-w-[85%]"
								id="savings"
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
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select categorization" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="non-outsourcing">
									Non Outsourcing-Standard Service
								</SelectItem>
								<SelectItem value="material">Material</SelectItem>
								<SelectItem value="material-outsourcing">
									Material Outsourcing
								</SelectItem>
								<SelectItem value="outsourcing">Outsourcing</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="risk-classification">Risk Classification</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select risk classification" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="non-critical">Non Critical</SelectItem>
								<SelectItem value="critical">Critical</SelectItem>
								<SelectItem value="supportive">Supportive</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="benefiting-region">Benefiting Region</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select benefiting region" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="global">Global</SelectItem>
								<SelectItem value="uk">UK</SelectItem>
								<SelectItem value="us">US</SelectItem>
								<SelectItem value="BEL">Belgium</SelectItem>
								<SelectItem value="IRE">Ireland</SelectItem>
								<SelectItem value="LI">Lichtenstein</SelectItem>
								<SelectItem value="aus">AUS</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="flex flex-col gap-2">
						<div className="space-x-2">
							<Label htmlFor="infosec-in-scope">Infosec in Scope</Label>
							<Switch
								id="infosec-in-scope"
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
									aria-label="Data privacy assessment complete ?"
								/>
							</div>
						)}
					</div>
					<div className="space-x-2">
						<Label htmlFor="sef-completed">SEF Completed</Label>
						<Switch id="sef-completed" aria-label="SEF Completed" />
					</div>
					<div className="space-y-2">
						<Label htmlFor="contract-review-period">
							Contract Review Period
						</Label>
						<div className="flex items-center gap-2">
							<Select
								value={contractReviewPeriod}
								onValueChange={setContractReviewPeriod}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select period" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="30">30 days</SelectItem>
									<SelectItem value="60">60 days</SelectItem>
									<SelectItem value="90">90 days</SelectItem>
									<SelectItem value="180">180 days</SelectItem>
									<SelectItem value="custom">Custom</SelectItem>
								</SelectContent>
							</Select>
							{contractReviewPeriod === "custom" && (
								<Input
									id="contract-review-period"
									type="number"
									placeholder="Custom period"
									defaultValue="190"
								/>
							)}
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="renewal-strategy">Renewal Strategy</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select renewal strategy" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="rfp">RFP/Tender</SelectItem>
								<SelectItem value="direct">Direct Renewal</SelectItem>
								<SelectItem value="benchmark">Market Benchmark</SelectItem>
								<SelectItem value="increase">Price Increase Review</SelectItem>
								<SelectItem value="terminate">Terminate / Expire</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-x-2">
						<Label htmlFor="po-required">PO Required?</Label>
						<Switch id="po-required" aria-label="PO Required" />
					</div>
					<div className="space-x-2">
						<Label htmlFor="auto-renewal">Auto Renewal?</Label>
						<Switch id="auto-renewal" aria-label="Auto Renewal" />
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-end gap-3">
				<Link
					tabIndex={-1}
					href={{ pathname: "/dashboard/contracts", query: { status } }}
				>
					<Button tabIndex={-1} variant="link">
						Cancel
					</Button>
				</Link>
				<Button variant="outline" tabIndex={0} type="submit" className="gap-1">
					<Notebook className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Save draft
					</span>
				</Button>
				<Button tabIndex={0} type="submit" className="gap-1">
					<RocketIcon className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Submit
					</span>
				</Button>
			</CardFooter>
		</form>
	);
}
