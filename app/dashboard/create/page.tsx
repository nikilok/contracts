import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import Form from "@/app/ui/contracts/create/create-contracts";
import { Suspense } from "react";

export default function Page() {
	return (
		<main className="py-8 px-2">
			<Card className="w-full max-w-4xl m-auto">
				<CardHeader>
					<CardTitle>Create Contract</CardTitle>
					<CardDescription>
						Please fill out the form to submit a new contract request.
					</CardDescription>
				</CardHeader>
				<Separator className="mb-4" />
				<Suspense fallback="loading...">
					<Form />
				</Suspense>
			</Card>
		</main>
	);
}
