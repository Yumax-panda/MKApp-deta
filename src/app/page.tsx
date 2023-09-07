"use client";

import { signIn, useSession, signOut, getSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Home() {
  const session = useSession();
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      const res = await getSession();
      setMsg(JSON.stringify(res));
    })();
  }, [session]);
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
      <p>{msg}: test</p>
    </>
  );
}
