import { Badge } from "@/app/components/ui/badge";
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
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/app/components/ui/table";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/app/components/ui/tabs";
import TabList from "@/app/ui/contracts/tab-list";
import { ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";

export default function Page({
	searchParams,
}: {
	searchParams: {
		status: string;
	};
}) {
	const status = searchParams?.status || "active";

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
							{/* <File className="h-3.5 w-3.5" /> */}
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Export
							</span>
						</Button>
						<Button size="sm" className="h-7 gap-1">
							<PlusCircle className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Create Contract
							</span>
						</Button>
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
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Price</TableHead>
										<TableHead className="hidden md:table-cell">
											Total Sales
										</TableHead>
										<TableHead className="hidden md:table-cell">
											Created at
										</TableHead>
										<TableHead>
											<span className="sr-only">Actions</span>
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">
											Laser Lemonade Machine
										</TableCell>
										<TableCell>
											<Badge variant="outline">Draft</Badge>
										</TableCell>
										<TableCell>$499.99</TableCell>
										<TableCell className="hidden md:table-cell">25</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-07-12 10:42 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Hypernova Headphones
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$129.99</TableCell>
										<TableCell className="hidden md:table-cell">100</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-10-18 03:21 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											AeroGlow Desk Lamp
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$39.99</TableCell>
										<TableCell className="hidden md:table-cell">50</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-11-29 08:15 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											TechTonic Energy Drink
										</TableCell>
										<TableCell>
											<Badge variant="secondary">Draft</Badge>
										</TableCell>
										<TableCell>$2.99</TableCell>
										<TableCell className="hidden md:table-cell">0</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-12-25 11:59 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Gamer Gear Pro Controller
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$59.99</TableCell>
										<TableCell className="hidden md:table-cell">75</TableCell>
										<TableCell className="hidden md:table-cell">
											2024-01-01 12:00 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Luminous VR Headset
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$199.99</TableCell>
										<TableCell className="hidden md:table-cell">30</TableCell>
										<TableCell className="hidden md:table-cell">
											2024-02-14 02:14 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
						<CardFooter>
							<div className="text-xs text-muted-foreground">
								Showing <strong>1-10</strong> of <strong>32</strong> contracts
							</div>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="all">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>All Contracts</CardTitle>
							<CardDescription>
								Manage all your contracts here. This includes active, draft and
								expired contracts.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Price</TableHead>
										<TableHead className="hidden md:table-cell">
											Total Sales
										</TableHead>
										<TableHead className="hidden md:table-cell">
											Created at
										</TableHead>
										<TableHead>
											<span className="sr-only">Actions</span>
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">
											Some Foo Contract
										</TableCell>
										<TableCell>
											<Badge variant="outline">Draft</Badge>
										</TableCell>
										<TableCell>$199.99</TableCell>
										<TableCell className="hidden md:table-cell">25</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-06-12 10:42 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Hypernova Headphones
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$129.99</TableCell>
										<TableCell className="hidden md:table-cell">100</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-10-18 03:21 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											AeroGlow Desk Lamp
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$39.99</TableCell>
										<TableCell className="hidden md:table-cell">50</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-11-29 08:15 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											TechTonic Energy Drink
										</TableCell>
										<TableCell>
											<Badge variant="secondary">Draft</Badge>
										</TableCell>
										<TableCell>$2.99</TableCell>
										<TableCell className="hidden md:table-cell">0</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-12-25 11:59 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Gamer Gear Pro Controller
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$59.99</TableCell>
										<TableCell className="hidden md:table-cell">75</TableCell>
										<TableCell className="hidden md:table-cell">
											2024-01-01 12:00 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Luminous VR Headset
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$199.99</TableCell>
										<TableCell className="hidden md:table-cell">30</TableCell>
										<TableCell className="hidden md:table-cell">
											2024-02-14 02:14 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Some Foo Contract
										</TableCell>
										<TableCell>
											<Badge variant="outline">Draft</Badge>
										</TableCell>
										<TableCell>$199.99</TableCell>
										<TableCell className="hidden md:table-cell">25</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-06-12 10:42 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Hypernova Headphones
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$129.99</TableCell>
										<TableCell className="hidden md:table-cell">100</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-10-18 03:21 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											AeroGlow Desk Lamp
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$39.99</TableCell>
										<TableCell className="hidden md:table-cell">50</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-11-29 08:15 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											TechTonic Energy Drink
										</TableCell>
										<TableCell>
											<Badge variant="secondary">Draft</Badge>
										</TableCell>
										<TableCell>$2.99</TableCell>
										<TableCell className="hidden md:table-cell">0</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-12-25 11:59 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Gamer Gear Pro Controller
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$59.99</TableCell>
										<TableCell className="hidden md:table-cell">75</TableCell>
										<TableCell className="hidden md:table-cell">
											2024-01-01 12:00 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Luminous VR Headset
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$199.99</TableCell>
										<TableCell className="hidden md:table-cell">30</TableCell>
										<TableCell className="hidden md:table-cell">
											2024-02-14 02:14 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Some Foo Contract
										</TableCell>
										<TableCell>
											<Badge variant="outline">Draft</Badge>
										</TableCell>
										<TableCell>$199.99</TableCell>
										<TableCell className="hidden md:table-cell">25</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-06-12 10:42 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Hypernova Headphones
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$129.99</TableCell>
										<TableCell className="hidden md:table-cell">100</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-10-18 03:21 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											AeroGlow Desk Lamp
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$39.99</TableCell>
										<TableCell className="hidden md:table-cell">50</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-11-29 08:15 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											TechTonic Energy Drink
										</TableCell>
										<TableCell>
											<Badge variant="secondary">Draft</Badge>
										</TableCell>
										<TableCell>$2.99</TableCell>
										<TableCell className="hidden md:table-cell">0</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-12-25 11:59 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Gamer Gear Pro Controller
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$59.99</TableCell>
										<TableCell className="hidden md:table-cell">75</TableCell>
										<TableCell className="hidden md:table-cell">
											2024-01-01 12:00 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Luminous VR Headset
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$199.99</TableCell>
										<TableCell className="hidden md:table-cell">30</TableCell>
										<TableCell className="hidden md:table-cell">
											2024-02-14 02:14 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Some Foo Contract
										</TableCell>
										<TableCell>
											<Badge variant="outline">Draft</Badge>
										</TableCell>
										<TableCell>$199.99</TableCell>
										<TableCell className="hidden md:table-cell">25</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-06-12 10:42 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Hypernova Headphones
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$129.99</TableCell>
										<TableCell className="hidden md:table-cell">100</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-10-18 03:21 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											AeroGlow Desk Lamp
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$39.99</TableCell>
										<TableCell className="hidden md:table-cell">50</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-11-29 08:15 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											TechTonic Energy Drink
										</TableCell>
										<TableCell>
											<Badge variant="secondary">Draft</Badge>
										</TableCell>
										<TableCell>$2.99</TableCell>
										<TableCell className="hidden md:table-cell">0</TableCell>
										<TableCell className="hidden md:table-cell">
											2023-12-25 11:59 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Gamer Gear Pro Controller
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$59.99</TableCell>
										<TableCell className="hidden md:table-cell">75</TableCell>
										<TableCell className="hidden md:table-cell">
											2024-01-01 12:00 AM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">
											Luminous VR Headset
										</TableCell>
										<TableCell>
											<Badge variant="outline">Active</Badge>
										</TableCell>
										<TableCell>$199.99</TableCell>
										<TableCell className="hidden md:table-cell">30</TableCell>
										<TableCell className="hidden md:table-cell">
											2024-02-14 02:14 PM
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Delete</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
						<CardFooter>
							<div className="text-xs text-muted-foreground">
								Showing <strong>1-10</strong> of <strong>32</strong> contracts
							</div>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	);
}
