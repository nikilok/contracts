"use server";
import { redirect } from "next/navigation";
// import { z } from 'zod';
// import { PrismaClient } from "@prisma/client";
// import { redirect } from "next/navigation";
import type { State } from "../types";

export async function submitOrDraftContracts(
	prevState: State,
	formData: FormData,
) {
	const rawData = {
		selectType: formData.get("select-type"),
		isDraft: formData.get("isDraft"),
	};

	if (rawData.isDraft === "true") {
		redirect("/dashboard/contracts?status=draft");
	}

	if (rawData.isDraft === "false") {
		redirect("/dashboard/contracts");
	}
}
