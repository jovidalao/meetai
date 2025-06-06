"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AuthSocialView } from "./social-view";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});
export const SignInView = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message || "An error occurred while signing in.");
        }
      },
    )
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen bg-muted">
      <Card className="max-w-3xl w-full shadow-lg overflow-hidden p-0">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 p-0">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">
                    Welcome back
                  </h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your account
                  </p>
                </div>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-4">
                    {!!error && (
                      <Alert className="bg-destructive/10 border-none">
                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                        <AlertTitle>{error}</AlertTitle>
                      </Alert>
                    )}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={pending}
                    >
                      Sign in
                    </Button>
                    <AuthSocialView pending={pending} />
                    <div className="text-center text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Link href="/sign-up" className="underline underline-offset-4">
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.svg" alt="Meet.AI" className="h-[92px] w-[92px]" />
            <p className="text-2xl font-semibold text-white">
              Meet.AI
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:">
        By clicking continue, you agree to our <a href="/terms">Terms of Service</a> and <a href="/#">Privacy Policy</a>
      </div>
    </div>

  )
}