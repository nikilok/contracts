"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../components/ui/input";

export default function HeaderSearch({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const { replace } = useRouter();

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

	return (
		<form className="ml-auto flex-1 sm:flex-initial">
			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
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
