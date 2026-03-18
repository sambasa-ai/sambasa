"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/");
    }
  }

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold">Create an account</h1>
      </CardHeader>

      <CardContent>
        <FieldGroup>
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input name="name" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                name="email"
                type="email"
                placeholder="user@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                name="password"
                type="password"
                required
                placeholder="********"
              />
            </Field>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </CardFooter>
    </Card>
  );
}
