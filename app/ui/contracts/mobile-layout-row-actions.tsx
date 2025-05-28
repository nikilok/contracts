"use client";

import { Button } from "@/app/components/ui/button";
import { deleteContract } from "@/app/lib/actions";
import type { Contract } from "@/app/types";
import { Trash } from "lucide-react";
import { useState } from "react";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";

interface MobileLayoutRowActionsProps {
	contract: Contract;
}

export function MobileLayoutRowActions({
	contract,
}: MobileLayoutRowActionsProps) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	return (
		<DeleteConfirmationDialog
			contractName={contract.description}
			onConfirm={async () => {
				await deleteContract(contract.id);
			}}
			open={isDeleteDialogOpen}
			onOpenChange={setIsDeleteDialogOpen}
		>
			<Button
				size="sm"
				variant="ghost"
				className="h-7 gap-1"
				onClick={() => setIsDeleteDialogOpen(true)}
			>
				<Trash className="h-3.5 w-3.5 text-red-600" />
				<span className="sr-only sm:not-sr-only text-red-600 sm:whitespace-nowrap">
					Delete
				</span>
			</Button>
		</DeleteConfirmationDialog>
	);
}
