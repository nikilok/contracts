"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import type * as React from "react";

interface DeleteConfirmationDialogProps {
	contractName: string;
	onConfirm: () => Promise<void> | void;
	children: React.ReactNode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function DeleteConfirmationDialog({
	contractName,
	onConfirm,
	children,
	open,
	onOpenChange,
}: DeleteConfirmationDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					Are you sure you want to delete contract "{contractName}"? This action
					cannot be undone.
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => onConfirm()}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
