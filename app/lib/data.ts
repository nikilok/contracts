"use server";

import { PrismaClient } from "@prisma/client";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getSuppliers() {
	noStore();
	try {
		const data = await prisma.suppliers.findMany();

		return data.map((row) => ({ value: row.name, label: row.name }));
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
