"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {

  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
    }, {
      onSuccess: (ctx) => {
        window.alert("Sign up successful");
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    })
  }

  const onLogin = () => {
    authClient.signIn.email({
      password,
      email,
    }, {
      onSuccess: (ctx) => {
        window.alert("Sign in successful");
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    })
  }

  if (session) {
    return <div className="flex flex-col p-4 gap-4">
      Logged in as {session.user.name}
      <Button onClick={() => authClient.signOut()}>Sign Out</Button>
    </div>
  }

  return (
    <div>
      <div>
      <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>Sign Up</Button>
    </div>
    <div>
      <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onLogin}>Log in</Button>
    </div>
    </div>
  );
}