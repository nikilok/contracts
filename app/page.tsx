import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";

export default function Component() {
	return (
		<div className="flex min-h-screen">
			<div className="relative w-1/2 bg-muted">
				<Image
					src="/assets/login.jpeg"
					alt="Login Artwork"
					fill
					className="object-cover"
				/>
			</div>
			<div className="flex flex-col justify-center w-1/2 p-8">
				<div className="max-w-sm mx-auto">
					<Card className="w-full max-w-sm">
						<CardHeader>
							<CardTitle className="text-2xl">Login</CardTitle>
							<CardDescription>
								Enter your email below to login to your account.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input id="password" type="password" required />
							</div>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Link href="/dashboard">
								<Button className="w-full">Sign in</Button>
							</Link>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
