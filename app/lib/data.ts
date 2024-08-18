"use server";

import { type Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import type { Contract, Status } from "../types";
import { ITEMS_PER_PAGE } from "./constants";

const prisma = new PrismaClient();

export async function getSuppliers() {
	noStore();
	try {
		const data = await prisma.suppliers.findMany();

		return data.map(({ id, name }) => ({ value: id, label: name }));
	} catch (err) {
		throw new Error("Database error: failed to get suppliers");
	}
}

export async function addSupplier(name: string) {
	noStore();
	try {
		await prisma.suppliers.create({
			data: {
				name,
			},
		});

		revalidatePath("/dashboard/create");
	} catch (err) {
		throw new Error("Database error: failed to add supplier");
	}
}

const select: Prisma.ContractsSelect<DefaultArgs> = {
	id: true,
	requestDate: true,
	supplierId: true,
	supplier: {
		select: {
			name: true,
		},
	},
	description: true,
	subCategory: true,
	serviceOwner: true,
	contractFrom: true,
	contractTo: true,
	contractType: true,
	requestType: true,
	annualContractValue: true,
	annualContractCurrency: true,
	savingsValue: true,
	serviceCategory: true,
	riskClassification: true,
	region: true,
	infoSecInScope: true,
	infoSecAssessmentComplete: true,
	piiScope: true,
	privacyAssessmentComplete: true,
	sefComplete: true,
	reviewPeriod: true,
	renewalStrategy: true,
	poRequired: true,
	everGreen: true,
	autoRenewal: true,
	isDraft: true,
};
export async function getContracts({
	query = "",
	currentPage = 1,
	status = "active",
}: { query?: string; currentPage: number; status: Status }): Promise<
	Contract[]
> {
	noStore();
	const currentDate = new Date().toISOString();
	try {
		switch (status) {
			case "active": {
				const data = await prisma.contracts.findMany({
					select,
					where: {
						AND: [
							{
								contractFrom: {
									lte: currentDate,
								},
							},
							{
								contractTo: {
									gte: currentDate,
								},
							},
							{
								isDraft: false,
							},
						],
						OR: [
							{
								supplier: {
									name: {
										contains: query,
										mode: "insensitive",
									},
								},
							},
							{
								description: {
									contains: query,
									mode: "insensitive",
								},
							},
						],
					},
					skip: (currentPage - 1) * ITEMS_PER_PAGE,
					take: ITEMS_PER_PAGE,
				});
				return data as unknown as Contract[];
			}
			case "expired": {
				const data = await prisma.contracts.findMany({
					select,
					where: {
						AND: [
							{
								contractTo: {
									lt: currentDate,
								},
							},
							{
								isDraft: false,
							},
						],
						OR: [
							{
								supplier: {
									name: {
										contains: query,
										mode: "insensitive",
									},
								},
							},
							{
								description: {
									contains: query,
									mode: "insensitive",
								},
							},
						],
					},
					skip: (currentPage - 1) * ITEMS_PER_PAGE,
					take: ITEMS_PER_PAGE,
				});
				return data as unknown as Contract[];
			}
			case "draft": {
				const data = await prisma.contracts.findMany({
					select,
					where: {
						AND: [
							{
								isDraft: true,
							},
						],
						OR: [
							{
								supplier: {
									name: {
										contains: query,
										mode: "insensitive",
									},
								},
							},
							{
								description: {
									contains: query,
									mode: "insensitive",
								},
							},
						],
					},
					skip: (currentPage - 1) * ITEMS_PER_PAGE,
					take: ITEMS_PER_PAGE,
				});
				return data as unknown as Contract[];
			}
			case "all": {
				const data = await prisma.contracts.findMany({
					select,
					where: {
						OR: [
							{
								supplier: {
									name: {
										contains: query,
										mode: "insensitive",
									},
								},
							},
							{
								description: {
									contains: query,
									mode: "insensitive",
								},
							},
						],
					},
					skip: (currentPage - 1) * ITEMS_PER_PAGE,
					take: ITEMS_PER_PAGE,
				});
				return data as unknown as Contract[];
			}
			default:
				return [];
		}
	} catch (err) {
		console.error("Db error getting contracts", err);
		throw new Error("Db error getting contracts");
	}
}

export async function getContractsPageCount({
	query = "",
	status = "active",
}: { query?: string; status: Status }): Promise<{
	count: number;
	totalPages: number;
}> {
	noStore();
	const currentDate = new Date().toISOString();
	try {
		switch (status) {
			case "active": {
				const count = await prisma.contracts.count({
					where: {
						AND: [
							{
								contractFrom: {
									lte: currentDate,
								},
							},
							{
								contractTo: {
									gte: currentDate,
								},
							},
							{
								isDraft: false,
							},
						],
						OR: [
							{
								supplier: {
									name: {
										contains: query,
										mode: "insensitive",
									},
								},
							},
							{
								description: {
									contains: query,
									mode: "insensitive",
								},
							},
						],
					},
				});
				return {
					count,
					totalPages: Math.ceil((count ?? 1) / ITEMS_PER_PAGE),
				};
			}
			case "draft": {
				const count = await prisma.contracts.count({
					where: {
						AND: [
							{
								isDraft: true,
							},
						],
						OR: [
							{
								supplier: {
									name: {
										contains: query,
										mode: "insensitive",
									},
								},
							},
							{
								description: {
									contains: query,
									mode: "insensitive",
								},
							},
						],
					},
				});
				return {
					count,
					totalPages: Math.ceil((count ?? 1) / ITEMS_PER_PAGE),
				};
			}
			case "all": {
				const count = await prisma.contracts.count({
					where: {
						OR: [
							{
								supplier: {
									name: {
										contains: query,
										mode: "insensitive",
									},
								},
							},
							{
								description: {
									contains: query,
									mode: "insensitive",
								},
							},
						],
					},
				});
				return {
					count,
					totalPages: Math.ceil((count ?? 1) / ITEMS_PER_PAGE),
				};
			}
			case "expired": {
				const count = await prisma.contracts.count({
					where: {
						AND: [
							{
								contractTo: {
									lt: currentDate,
								},
							},
							{
								isDraft: false,
							},
						],
						OR: [
							{
								supplier: {
									name: {
										contains: query,
										mode: "insensitive",
									},
								},
							},
							{
								description: {
									contains: query,
									mode: "insensitive",
								},
							},
						],
					},
				});
				return {
					count,
					totalPages: Math.ceil((count ?? 1) / ITEMS_PER_PAGE),
				};
			}
			default:
				return { count: 1, totalPages: 1 };
		}
	} catch (err) {
		console.error("Db error getting contracts count", err);
		throw new Error("Database error: failed to get contracts count");
	}
}

export async function getContract(id: string): Promise<Contract> {
	noStore();
	try {
		const data = await prisma.contracts.findUnique({
			select,
			where: {
				id,
			},
		});

		return data as unknown as Contract;
	} catch (err) {
		throw new Error("Database error: failed to get suppliers");
	}
}
