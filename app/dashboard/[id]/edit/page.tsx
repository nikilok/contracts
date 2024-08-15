import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import { getContract, getSuppliers } from "@/app/lib/data";
import Form from "@/app/ui/contracts/edit/edit-contracts";
import { Separator } from "@radix-ui/react-select";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	const suppliers = await getSuppliers();
	const contract = await getContract(id);

	return (
		<main className="py-8 px-2">
			<Card className="w-full max-w-4xl m-auto">
				<CardHeader>
					<CardTitle>Update Contract</CardTitle>
					<CardDescription>
						Update contract information for {contract.supplier.name}
					</CardDescription>
				</CardHeader>
				<Separator className="mb-4" />
				<Suspense fallback="loading...">
					<Form suppliers={suppliers} contract={contract} />
				</Suspense>
			</Card>
		</main>
	);
}
