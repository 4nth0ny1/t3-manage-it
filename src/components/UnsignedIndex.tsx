import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";

export function UnsignedIndexPage() {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.25 }}
        className="z-10 mt-20 flex flex-col items-center rounded-xl border-2 px-20 py-10 shadow-2xl backdrop-blur-xl"
      >
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8 ">
          <h1 className="tracking-tightsm:text-[5rem] text-5xl font-extrabold">
            <span className="text-[hsl(280,100%,70%)]">T3</span> Manage It
          </h1>
          <h2 className="text-2xl">Your Personal Project Manager</h2>
        </div>
        <AuthShowcase />
      </motion.main>

      {/* <div className="z-10 w-[50%] py-80 text-center text-2xl text-white">
        <p>
          Manage It is a todo app that helps you stay organized with multiple
          projects at the same time.
        </p>
        <p>
          Manage It is a todo app that helps you stay organized with multiple
          projects at the same time.
        </p>
      </div> */}
    </>
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
