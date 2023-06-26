import { signIn, signOut, useSession } from "next-auth/react";

export function UnsignedIndexPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8 ">
        <h1 className="tracking-tightsm:text-[5rem] text-5xl font-extrabold">
          <span className="text-[hsl(280,100%,70%)]">T3</span> Manage It
        </h1>
        <h2 className="text-2xl">Your Personal Project Manager</h2>
      </div>
      <AuthShowcase />
    </main>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl ">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="btn-accent btn rounded-full px-10 py-3 font-semibold no-underline transition"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
