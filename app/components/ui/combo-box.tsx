"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PlusSquare } from "lucide-react";

import { cn } from "@/app/lib/utils";
import { useState } from "react";
import { Button } from "./button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function ComboBox({
	options = [],
	placeholder = "",
	onAdd,
}: {
	options: {
		value: string;
		label: string;
	}[];
	placeholder: string;
	onAdd: (name: string) => void;
}) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const [rawValue, setRawValue] = useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[calc(100%)] justify-between"
				>
					{value
						? options.find((option) => option.value.toLowerCase() === value)
								?.label
						: placeholder}

					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[270px] p-0">
				<Command>
					<CommandInput
						onInput={(input) => {
							setRawValue(input.currentTarget.value);
						}}
						placeholder={placeholder}
						className="h-9"
					/>
					<CommandEmpty>
						<Button
							onClick={() => {
								onAdd(rawValue);
							}}
						>
							Add {rawValue}
						</Button>
					</CommandEmpty>
					<CommandGroup>
						{options.map((option) => (
							<CommandItem
								key={option.value}
								value={option.value}
								onSelect={(currentValue) => {
									setValue(currentValue);
									setOpen(false);
								}}
							>
								{option.label}
								<CheckIcon
									className={cn(
										"ml-auto h-4 w-4",
										value === option.value ? "opacity-100" : "opacity-0",
									)}
								/>
							</CommandItem>
						))}
						{rawValue && (
							<div className="flex justify-center">
								<Button
									onClick={() => {
										onAdd(rawValue);
									}}
								>
									Add {rawValue}
								</Button>
							</div>
						)}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
