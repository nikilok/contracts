"use server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
// import { redirect } from "next/navigation";
import type { State } from "../types";

const prisma = new PrismaClient();

const getFormSchema = (isDraft: boolean) =>
	z
		.object({
			requestDate: isDraft ? z.string().optional() : z.coerce.date(),
			supplierId: z.string().min(3, "Select a supplier"),
			serviceDescription: isDraft ? z.string().optional() : z.string().min(4),
			subCategory: isDraft
				? z.coerce.number().optional()
				: z.coerce.number().gt(0, "Select a valid option"),
			serviceOwner: isDraft ? z.string().optional() : z.string().min(3),
			contractFrom: isDraft
				? z.string().optional()
				: z.coerce.date({
						errorMap: () => ({
							message: "Invalid from date",
						}),
					}),
			contractTo: isDraft
				? z.string().optional()
				: z.coerce.date({
						errorMap: () => ({
							message: "Invalid to date",
						}),
					}),
			contractType: isDraft
				? z.coerce.number().optional()
				: z.coerce.number().gt(0, "Select a valid option"),
			requestType: isDraft
				? z.coerce.number().optional()
				: z.coerce.number().gt(0, "Select a valid option"),
			annualContractValue: z.coerce.number().optional(),
			annualContractCurrency: z.string().optional(),
			savingsValue: z.coerce.number().optional(),
			serviceCategorization: isDraft
				? z.coerce.number().optional()
				: z.coerce.number().gt(0, "Select a valid option"),
			riskClassification: isDraft
				? z.coerce.number().optional()
				: z.coerce.number().gt(0, "Select a valid option"),
			region: isDraft
				? z.coerce.number().optional()
				: z.coerce.number().gt(0, "Select a valid option"),
			infoSecScope: z.enum(["on"]).nullable(),
			infoSecAssessmentComplete: z.enum(["on"]).nullable(),
			piiScope: z.enum(["on"]).nullable(),
			dataPrivacyAssessmentComplete: z.enum(["on"]).nullable(),
			sefComplete: z.enum(["on"]).nullable(),
			reviewPeriod: isDraft
				? z.coerce.number().optional()
				: z.coerce.number().gt(0, "Select a valid option"),
			customReviewPeriod: z.coerce.number().optional(),
			renewalStrategy: isDraft
				? z.coerce.number().optional()
				: z.coerce.number().gt(0, "Select a valid option"),
			poRequired: z.enum(["on"]).nullable(),
			autoRenewal: z.enum(["on"]).nullable(),
			isDraft: z.enum(["true", "false"]),
		})
		.refine(
			(data) => {
				if (
					!isDraft &&
					(data.annualContractValue ?? 0) > 0 &&
					(data.annualContractCurrency ?? "") === ""
				) {
					return false;
				}

				return true;
			},
			{
				message: "Annual currency must have a value, when currency is added",
				path: ["annualContractValue"],
			},
		)
		.refine(
			(data) => {
				if (
					!isDraft &&
					data.reviewPeriod === 1 &&
					(data.customReviewPeriod ?? 0) === 0
				) {
					return false;
				}
				return true;
			},
			{
				message: "Custom review period, must be greater than 0",
				path: ["reviewPeriod"],
			},
		);

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
		customReviewPeriod: formData.get("custom-review-period"),
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
		renewalStrategy: formData.get("renewal-strategy"),
		poRequired: formData.get("po-required"),
		autoRenewal: formData.get("auto-renewal"),
	} as Record<string, string>;

	const validatedFields = getFormSchema(isDraft).safeParse(rawData);

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validatedFields.success) {
		const errors = {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing Fields. Failed to Create Contract.",
		};
		console.error("🚀 ~ errors:", errors);
		return errors;
	}
	const dataForDB: Record<string, string> = {};

	for (const [key, value] of Object.entries(rawData)) {
		if (value?.length > 0) {
			dataForDB[key] = value;
		}
	}
	try {
		await prisma.contracts.create({
			data: {
				requestDate:
					dataForDB.requestDate?.length > 0
						? new Date(dataForDB.requestDate)
						: null,
				supplierId: dataForDB.supplierId,
				description: dataForDB.serviceDescription,
				subCategory: dataForDB.subCategory,
				serviceOwner: dataForDB.serviceOwner,
				contractFrom: dataForDB.contractFrom,
				contractTo: dataForDB.contractTo,
				contractType: dataForDB.contractType,
				requestType: dataForDB.requestType,
				annualContractValue: Number.parseInt(dataForDB.annualContractValue),
				annualContractCurrency: dataForDB.annualContractCurrency ?? null,
				savingsValue: Number.parseInt(dataForDB.savings),
				serviceCategory: dataForDB.serviceCategorization,
				riskClassification: dataForDB.riskClassification,
				region: dataForDB.region,
				infoSecInScope: dataForDB.infoSecScope === "on",
				infoSecAssessmentComplete: dataForDB.infoSecAssessmentComplete === "on",
				piiScope: dataForDB.piiScope === "on",
				privacyAssessmentComplete:
					dataForDB.dataPrivacyAssessmentComplete === "on",
				sefComplete: dataForDB.sefComplete === "on",
				reviewPeriod:
					dataForDB.reviewPeriod === "1"
						? Number.parseInt(dataForDB.customReviewPeriod)
						: Number.parseInt(dataForDB.reviewPeriod),
				renewalStrategy: dataForDB.renewalStrategy,
				poRequired: dataForDB.poRequired === "on",
				autoRenewal: dataForDB.autoRenewal === "on",
				isDraft: dataForDB.isDraft === "true",
			},
		});
	} catch (err) {
		console.error("🚀 ~ err:", err);
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
