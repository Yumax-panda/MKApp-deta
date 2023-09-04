"use client";

import { signIn, useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
      <p>{JSON.stringify(session)}: test</p>
    </>
  );
}
