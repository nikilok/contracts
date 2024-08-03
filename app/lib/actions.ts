"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
// import { redirect } from "next/navigation";
import type { State } from "../types";

const prisma = new PrismaClient();

const ContractsFormSchema = (isDraft: boolean) =>
	z
		.object({
			requestDate: isDraft ? z.string().optional() : z.string(),
			supplierId: z.string(),
			description: isDraft ? z.string().min(4).optional() : z.string().min(4),
			subCategory: isDraft ? z.coerce.number().optional() : z.coerce.number(),
			serviceOwner: isDraft ? z.string().min(3).optional() : z.string().min(3),
			contractFrom: isDraft ? z.coerce.date().optional() : z.coerce.date(),
			contractTo: isDraft ? z.coerce.date().optional() : z.coerce.date(),
			contractType: isDraft ? z.coerce.number().optional() : z.coerce.number(),
			requestType: isDraft ? z.coerce.number().optional() : z.coerce.number(),
			annualContractValue: z.coerce.number().optional(),
			annualContractCurrency: z.enum(["usd", "gbp", "eur"]).optional(),
			savingsValue: z.coerce.number().optional(),
			serviceCategory: isDraft
				? z.coerce.number().optional()
				: z.coerce.number(),
			riskClassification: isDraft
				? z.coerce.number().optional()
				: z.coerce.number(),
			region: z.string(),
			infoSecInScope: z.enum(["on", "null"]).optional(),
			infoSecAssessmentComplete: z.enum(["on", "null"]).optional(),
			piiScope: z.enum(["on", "null"]).optional(),
			privacyAssessmentComplete: z.enum(["on", "null"]).optional(),
			sefComplete: z.enum(["on", "null"]).optional(),
			reviewPeriod: isDraft ? z.coerce.number().optional() : z.coerce.number(),
			renewalStrategy: isDraft
				? z.coerce.number().optional()
				: z.coerce.number(),
			poRequired: z.enum(["on", "null"]).optional(),
			autoRenewal: z.enum(["on", "null"]).optional(),
			isDraft: z.enum(["true", "false"]),
		})
		.refine((data) => {
			return !(
				data.annualContractValue !== null &&
				data.annualContractCurrency !== null
			);
		}, "Annual currency must have a value, when currency is added");

export async function submitOrDraftContracts(
	prevState: State,
	formData: FormData,
) {
	const isDraft = formData.get("isDraft") === "true";
	const rawData = {
		supplierId: formData.get("supplier-id"),
		isDraft: formData.get("isDraft"),
		requestDate: formData.get("request-date"),
		serviceDescription: formData.get("service-description"),
		subCategory: formData.get("sub-category"),
		serviceOwner: formData.get("service-owner"),
		contractFrom: formData.get("contract-from"),
		contractTo: formData.get("contract-to"),
		contractType: formData.get("contract-type"),
		requestType: formData.get("request-type"),
		annualContractValue: formData.get("annual-contract-value"),
		annualContractCurrency: formData.get("annual-contract-currency"),
		savings: formData.get("savings"),
		serviceCategorization: formData.get("service-categorization"),
		riskClassification: formData.get("risk-classification"),
		region: formData.get("benefiting-region"),
		infoSecScope: formData.get("infosec-in-scope"),
		infoSecAssessmentComplete: formData.get("infosec-assesment"),
		piiScope: formData.get("pii-in-scope"),
		dataPrivacyAssessmentComplete: formData.get("pii-assessment-complete"),
		sefComplete: formData.get("sef-completed"),
		reviewPeriod: formData.get("contract-review-period"),
		customReviewPeriod: formData.get("custom-review-period"),
		renewalStrategy: formData.get("renewal-strategy"),
		poRequired: formData.get("po-required"),
		autoRenewal: formData.get("auto-renewal"),
	} as Record<string, string>;

	// console.info("🚀 ~ rawData:", rawData);
	const validatedFields = ContractsFormSchema(isDraft).safeParse(rawData);

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Create Invoice.",
		};
	}

	try {
		await prisma.contracts.create({
			data: {
				requestDate: new Date(rawData.requestDate),
				supplierId: rawData.supplierId,
				description: rawData.serviceDescription,
				subCategory: rawData.subCategory,
				serviceOwner: rawData.serviceOwner,
				contractFrom: rawData.contractFrom,
				contractTo: rawData.contractTo,
				contractType: rawData.contractType,
				requestType: rawData.requestType,
				annualContractValue: Number.parseInt(rawData.annualContractValue),
				annualContractCurrency: rawData.annualContractCurrency,
				savingsValue: Number.parseInt(rawData.savings),
				serviceCategory: rawData.serviceCategorization,
				riskClassification: rawData.riskClassification,
				region: rawData.region,
				infoSecInScope: rawData.infoSecScope === "on",
				infoSecAssessmentComplete: rawData.infoSecAssessmentComplete === "on",
				piiScope: rawData.piiScope === "on",
				privacyAssessmentComplete:
					rawData.dataPrivacyAssessmentComplete === "on",
				sefComplete: rawData.sefComplete === "on",
				reviewPeriod:
					rawData.reviewPeriod === "custom"
						? Number.parseInt(rawData.customReviewPeriod)
						: Number.parseInt(rawData.reviewPeriod),
				renewalStrategy: rawData.renewalStrategy,
				poRequired: rawData.poRequired === "on",
				autoRenewal: rawData.autoRenewal === "on",
				isDraft: rawData.isDraft === "true",
			},
		});
	} catch (err) {
		// return { message: "Database error: Failed to update invoice" };
		throw new Error("Database error: Failed to create contract");
	}

	if (isDraft) {
		redirect("/dashboard/contracts?status=draft");
	}

	if (!isDraft) {
		redirect("/dashboard/contracts");
	}
}
