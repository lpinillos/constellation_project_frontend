import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";
import LoginForm from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Constellation - Sign in",
  description: "Fill in your credentials to access your account",
};

export default function Signin() {
  return (
    <Card className="max-w-[550px] w-full">
      <CardHeader>
        <CardTitle className="text-primary text-2xl mb-5">Constellation</CardTitle>
        <CardTitle className="text-3xl">Sign in.</CardTitle>
        <CardDescription>Fill in your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <LoginForm />
      </CardContent>
      <CardFooter className="justify-center">
        <CardDescription>
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="text-primary hover:text-primary/95 underline"
          >
            Sign up.
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
