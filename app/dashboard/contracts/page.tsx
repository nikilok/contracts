import { Button } from "@/app/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Tabs, TabsContent } from "@/app/components/ui/tabs";
import { ITEMS_PER_PAGE } from "@/app/lib/constants";
import { getContractsPageCount } from "@/app/lib/data";
import type { Status } from "@/app/types";
import DataLayout from "@/app/ui/contracts/data-layout";
import { Paging } from "@/app/ui/contracts/paging";
import TabList from "@/app/ui/contracts/tab-list";
import { ContractTableSkeleton } from "@/app/ui/skeletons";
import { File, ListFilter, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({
	searchParams,
}: {
	searchParams: {
		status: Status;
		page: string;
		query: string;
	};
}) {
	const currentPage = Number.parseInt(searchParams?.page ?? 1);
	const status = searchParams?.status ?? "active";
	const query = searchParams?.query ?? "";

	const { count, totalPages } = await getContractsPageCount({
		query,
		status,
	});
	const fromPage = (currentPage - 1) * ITEMS_PER_PAGE + 1;
	const toPage =
		count <= currentPage * ITEMS_PER_PAGE
			? count
			: currentPage * ITEMS_PER_PAGE;

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 md:gap-8">
			<Tabs defaultValue="active" value={status}>
				<div className="flex items-center">
					<TabList />
					<div className="ml-auto flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="h-7 gap-1">
									<ListFilter className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
										Filter
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Filter by</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem checked>
									Active
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button size="sm" variant="outline" className="h-7 gap-1">
							<File className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Export
							</span>
						</Button>
						<Link
							href={{
								pathname: "/dashboard/create",
								query: { status },
							}}
						>
							<Button size="sm" className="h-7 gap-1">
								<PlusCircle className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
									Create Contract
								</span>
							</Button>
						</Link>
					</div>
				</div>
				<TabsContent value="active">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Active Contracts</CardTitle>
							<CardDescription>
								Manage all your active contracts here.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Suspense
								key={query + currentPage}
								fallback={<ContractTableSkeleton />}
							>
								<DataLayout
									currentPage={currentPage}
									status={status}
									query={query}
								/>
							</Suspense>
						</CardContent>
						<CardFooter>
							<div className="text-xs text-muted-foreground">
								Showing{" "}
								<strong>
									{fromPage} - {toPage}{" "}
								</strong>
								of <strong>{count}</strong> contracts
							</div>
						</CardFooter>
						<CardFooter>
							<div className="relative w-full">
								<div className="absolute inset-x-0 -bottom-20 h-8 left-0">
									<div className="flex justify-center">
										<Paging totalPages={totalPages} />
									</div>
								</div>
							</div>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="all">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>All Contracts</CardTitle>
							<CardDescription>Manage all your contracts here.</CardDescription>
						</CardHeader>
						<CardContent>
							<Suspense
								key={query + currentPage}
								fallback={<ContractTableSkeleton />}
							>
								<DataLayout
									currentPage={currentPage}
									status={status}
									query={query}
								/>
							</Suspense>
						</CardContent>
						<CardFooter>
							<div className="text-xs text-muted-foreground">
								Showing{" "}
								<strong>
									{fromPage} - {toPage}{" "}
								</strong>
								of <strong>{count}</strong> contracts
							</div>
						</CardFooter>
						<CardFooter>
							<div className="relative w-full">
								<div className="absolute inset-x-0 -bottom-20 h-8 left-0">
									<div className="flex justify-center">
										<Paging totalPages={totalPages} />
									</div>
								</div>
							</div>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="draft">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Draft Contracts</CardTitle>
							<CardDescription>
								Manage all your draft contracts here.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Suspense
								key={query + currentPage}
								fallback={<ContractTableSkeleton />}
							>
								<DataLayout
									currentPage={currentPage}
									status={status}
									query={query}
								/>
							</Suspense>
						</CardContent>
						<CardFooter>
							<div className="text-xs text-muted-foreground">
								Showing{" "}
								<strong>
									{fromPage} - {toPage}{" "}
								</strong>
								of <strong>{count}</strong> contracts
							</div>
						</CardFooter>
						<CardFooter>
							<div className="relative w-full">
								<div className="absolute inset-x-0 -bottom-20 h-8 left-0">
									<div className="flex justify-center">
										<Paging totalPages={totalPages} />
									</div>
								</div>
							</div>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="expired">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>All Expired Contracts</CardTitle>
							<CardDescription>
								Manage all your expired contracts here.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Suspense
								key={query + currentPage}
								fallback={<ContractTableSkeleton />}
							>
								<DataLayout
									currentPage={currentPage}
									status={status}
									query={query}
								/>
							</Suspense>
						</CardContent>
						<CardFooter>
							<div className="text-xs text-muted-foreground">
								Showing{" "}
								<strong>
									{fromPage} - {toPage}{" "}
								</strong>
								of <strong>{count}</strong> contracts
							</div>
						</CardFooter>
						<CardFooter>
							<div className="relative w-full">
								<div className="absolute inset-x-0 -bottom-20 h-8 left-0">
									<div className="flex justify-center">
										<Paging totalPages={totalPages} />
									</div>
								</div>
							</div>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	);
}
