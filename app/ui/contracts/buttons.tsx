"use client";

import { Button } from "@/app/components/ui/button";
import { Loader, Notebook, Rocket, RocketIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

export function EditUpdateButton({
	setIsDraft,
	isDraft,
}: { setIsDraft: (val: boolean) => void; isDraft: boolean | null }) {
	const { pending } = useFormStatus();

	return (
		<Button
			aria-disabled={pending}
			tabIndex={0}
			name="createContract"
			type="submit"
			onClick={() => setIsDraft(false)}
			className="gap-1"
		>
			{pending && !isDraft ? (
				<Rocket className="animate-rocket-launch h-3.5 w-3.5" />
			) : (
				<Rocket className="h-3.5 w-3.5" />
			)}
			<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
				Update Contract
			</span>
		</Button>
	);
}

export function EditSaveDraftButton({
	setIsDraft,
	isDraft,
}: { setIsDraft: (val: boolean) => void; isDraft: boolean | null }) {
	const { pending } = useFormStatus();

	return (
		<Button
			variant="outline"
			tabIndex={0}
			name="draftContract"
			onClick={() => setIsDraft(true)}
			type="submit"
			className="gap-1"
		>
			{pending && isDraft ? (
				<Loader className="h-3.5" />
			) : (
				<Notebook className="h-3.5 w-3.5" />
			)}
			<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
				Save draft
			</span>
		</Button>
	);
}

export function CreateDraftButton({
	setIsDraft,
	isDraft,
}: { setIsDraft: (val: boolean) => void; isDraft: boolean | null }) {
	const { pending } = useFormStatus();

	return (
		<Button
			variant="outline"
			tabIndex={0}
			name="draftContract"
			onClick={() => setIsDraft(true)}
			type="submit"
			className="gap-1"
		>
			{pending && isDraft ? (
				<Loader className="h-3.5" />
			) : (
				<Notebook className="h-3.5 w-3.5" />
			)}
			<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
				Save draft
			</span>
		</Button>
	);
}

export function CreateButton({
	setIsDraft,
	isDraft,
}: { setIsDraft: (val: boolean) => void; isDraft: boolean | null }) {
	const { pending } = useFormStatus();

	return (
		<Button
			tabIndex={0}
			name="createContract"
			type="submit"
			onClick={() => setIsDraft(false)}
			className="gap-1"
		>
			{pending && !isDraft ? (
				<Rocket className="animate-rocket-launch h-3.5 w-3.5" />
			) : (
				<Rocket className="h-3.5 w-3.5" />
			)}
			<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
				Create Contract
			</span>
		</Button>
	);
}
