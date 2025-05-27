"use server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
// import { redirect } from "next/navigation";
import type { ContractDB, State } from "../types";
import { replaceZeroWithEmptyString } from "./utils";

const prisma = new PrismaClient();

const getFormSchema = (isDraft: boolean) =>
  z
    .object({
      requestDate: isDraft ? z.string().optional() : z.coerce.date(),
      requestCompleteDate: isDraft ? z.string().optional() : z.coerce.date(),
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
      everGreen: z.enum(["on"]).nullable(),
      autoRenewal: z.enum(["on"]).nullable(),
      isDraft: z.enum(["true", "false"]),
    })
    .refine(
      (data) => {
        if (
          ((data.annualContractValue || 0) > 0 ||
            (data.savingsValue || 0) > 0) &&
          (data.annualContractCurrency || "0") === "0"
        ) {
          return false;
        }

        return true;
      },
      {
        message: "Please select a currency",
        path: ["annualContractValue", "annualContractCurrency"],
      }
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
      }
    );

export async function submitOrDraftContracts(
  prevState: State | undefined,
  formData: FormData
) {
  const isDraft = formData.get("isDraft") === "true";
  const rawData = getRawData(formData);

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

  try {
    await prisma.contracts.create({
      data: transformForDB(rawData),
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

function transformForDB(rawData: Record<string, string>): ContractDB {
  return {
    requestDate:
      rawData.requestDate?.length > 0 ? new Date(rawData.requestDate) : null,
    requestCompleteDate:
      rawData.requestCompleteDate?.length > 0
        ? new Date(rawData.requestCompleteDate)
        : null,
    supplierId: rawData.supplierId,
    description: rawData.serviceDescription,
    subCategory: replaceZeroWithEmptyString(rawData.subCategory),
    serviceOwner: rawData.serviceOwner,
    contractFrom:
      rawData.contractFrom?.length > 0 ? new Date(rawData.contractFrom) : null,
    contractTo:
      rawData.contractTo?.length > 0 ? new Date(rawData.contractTo) : null,
    contractType: replaceZeroWithEmptyString(rawData.contractType),
    requestType: replaceZeroWithEmptyString(rawData.requestType),
    annualContractValue: Number.parseInt(rawData.annualContractValue),
    annualContractCurrency: replaceZeroWithEmptyString(
      rawData.annualContractCurrency
    ),
    savingsValue: Number.parseInt(rawData.savingsValue),
    serviceCategory: replaceZeroWithEmptyString(rawData.serviceCategorization),
    riskClassification: replaceZeroWithEmptyString(rawData.riskClassification),
    region: replaceZeroWithEmptyString(rawData.region),
    infoSecInScope: rawData.infoSecScope === "on",
    infoSecAssessmentComplete: rawData.infoSecAssessmentComplete === "on",
    piiScope: rawData.piiScope === "on",
    privacyAssessmentComplete: rawData.dataPrivacyAssessmentComplete === "on",
    sefComplete: rawData.sefComplete === "on",
    reviewPeriod:
      rawData.reviewPeriod === "-1"
        ? Number.parseInt(rawData.customReviewPeriod)
        : Number.parseInt(rawData.reviewPeriod),
    renewalStrategy: replaceZeroWithEmptyString(rawData.renewalStrategy),
    poRequired: rawData.poRequired === "on",
    everGreen: rawData.everGreen === "on",
    autoRenewal: rawData.autoRenewal === "on",
    isDraft: rawData.isDraft === "true",
  };
}

export async function updateContract(
  id: string,
  prevState: State | undefined,
  formData: FormData
) {
  const isDraft = formData.get("isDraft") === "true";
  const rawData = getRawData(formData);

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

  try {
    await prisma.contracts.update({
      where: {
        id,
      },
      data: transformForDB(rawData),
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

function getRawData(formData: FormData) {
  return {
    supplierId: formData.get("supplier-id"),
    isDraft: formData.get("isDraft"),
    requestDate: formData.get("request-date"),
    requestCompleteDate: formData.get("request-complete-date"),
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
    savingsValue: formData.get("savings"),
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
    everGreen: formData.get("ever-green"),
    autoRenewal: formData.get("auto-renewal"),
  } as Record<string, string>;
}
