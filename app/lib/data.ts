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
		// return { message: "Database error: failed to get invoice pending" };
		throw new Error("Database error: failed to get invoice pending");
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
		// return { message: "Database error: failed to get invoice pending" };
		throw new Error("Database error: failed to get invoice pending");
	}
}
