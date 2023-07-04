import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function Navbar() {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar bg-base-100 px-6">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          <span className="text-[hsl(280,100%,70%)]">T3</span> Manage It
        </Link>
      </div>
      <Link className="px-4" href="/about">
        About
      </Link>
      {sessionData ? (
        <div className="flex-none gap-2">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <Image
                  src={sessionData?.user.image as string}
                  alt="Profile Image"
                  width={50}
                  height={50}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="w-52p-2 dropdown-content menu rounded-box menu-sm z-[1] mt-3 shadow hover:bg-base-100 hover:text-gray-500"
            >
              <Link href="/profile">
                <li>Profile</li>
              </Link>
              <li>
                <AuthShowcase />
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <AuthShowcase />
      )}
    </div>
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
        onClick={
          sessionData
            ? () => void signOut({ callbackUrl: "/" })
            : () => void signIn()
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
