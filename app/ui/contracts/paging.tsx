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
						className={clsx({
							"opacity-50 pointer-events-none": currentPage <= 1,
						})}
						href={
							currentPage <= 1
								? createPageURL(1)
								: createPageURL(currentPage - 1)
						}
					/>
				</PaginationItem>
				{allPages.map((page) => {
					return (
						<PaginationItem key={page}>
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
						className={clsx({
							"opacity-50 pointer-events-none": currentPage >= totalPages,
						})}
						href={
							currentPage >= totalPages
								? createPageURL(totalPages)
								: createPageURL(currentPage + 1)
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
