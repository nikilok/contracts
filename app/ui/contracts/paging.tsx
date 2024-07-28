"use client";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/app/components/ui/pagination";
import { generatePagination } from "@/app/lib/utils";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";

export function Paging({ totalPages = 0 }: { totalPages: number }) {
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;
	const allPages = generatePagination(currentPage, totalPages);

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", pageNumber.toString());
		return `${pathName}?${params.toString()}`;
	};

	return (
		<Pagination className="p-4 bg-transparent">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						isDisabled={currentPage <= 1}
						href={createPageURL(currentPage - 1)}
					/>
				</PaginationItem>
				{allPages.map((page, index) => {
					return (
						<PaginationItem
							key={`${page} ${
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								index
							}`}
						>
							{page === "..." ? (
								<PaginationEllipsis />
							) : (
								<PaginationLink
									href={createPageURL(page)}
									isActive={currentPage === page}
								>
									{page}
								</PaginationLink>
							)}
						</PaginationItem>
					);
				})}
				<PaginationItem>
					<PaginationNext
						isDisabled={currentPage >= totalPages}
						href={createPageURL(currentPage + 1)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}