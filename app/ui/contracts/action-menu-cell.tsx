"use client";

import { Button } from "@/app/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { deleteContract } from "@/app/lib/actions";
import type { Contract } from "@/app/types";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";

interface ActionMenuCellProps {
	contract: Contract;
}

export function ActionMenuCell({ contract }: ActionMenuCellProps) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button aria-haspopup="true" size="icon" variant="ghost">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem asChild>
					<Link
						href={{
							pathname: `/dashboard/${contract.id}/edit`,
							query: { status: "active" },
						}}
						className="w-full"
					>
						Update
					</Link>
				</DropdownMenuItem>
				<DeleteConfirmationDialog
					contractName={contract.description}
					onConfirm={async () => {
						await deleteContract(contract.id);
					}}
					open={isDeleteDialogOpen}
					onOpenChange={setIsDeleteDialogOpen}
				>
					<DropdownMenuItem
						onSelect={(e) => {
							e.preventDefault();
							setIsDeleteDialogOpen(true);
						}}
						className="text-red-600 hover:text-red-700 focus:text-red-700 focus:bg-red-100 dark:hover:text-red-500 dark:focus:text-red-500 dark:focus:bg-red-700/10"
					>
						Delete
					</DropdownMenuItem>
				</DeleteConfirmationDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
