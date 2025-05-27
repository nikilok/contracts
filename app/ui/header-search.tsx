"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../components/ui/input";

export default function HeaderSearch({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);

		if (term) {
			params.set("page", "1");
			params.set("query", term);
		} else {
			params.delete("query");
		}

		replace(`/dashboard/contracts?${params.toString()}`);
	}, 500);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const term = inputRef.current?.value || "";
		handleSearch(term);
		handleSearch.flush();
	};

	return (
		<form className="ml-auto flex-1 sm:flex-initial" onSubmit={handleSubmit}>
			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					ref={inputRef}
					type="search"
					className="shadow-inner pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
					placeholder={placeholder}
					onChange={(e) => handleSearch(e.target.value)}
					defaultValue={searchParams.get("query")?.toString()}
				/>
			</div>
		</form>
	);
}
