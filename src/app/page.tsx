import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full min-h-[100vh] h-full px-4">
      <Card className="max-w-[550px] w-full">
        <CardHeader className="p-0 mb-5">
          <Image
            src="/images/nebulosa.webp"
            width={600}
            height={600}
            alt="logo"
            className="w-full h-auto"
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <CardTitle className="text-primary text-2xl">Constellation</CardTitle>
          <CardTitle className="text-3xl">Welcome to the team.</CardTitle>
          <CardDescription>
            Connect with your team and achieve your goals. All in Team app
          </CardDescription>
          <Link href="/signin">
            <Button className="rounded-full w-full">Sign in</Button>
          </Link>
        </CardContent>
        <CardFooter className="justify-center">
          <CardDescription>
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="text-primary hover:text-primary/95 underline"
            >
              Sign up
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
