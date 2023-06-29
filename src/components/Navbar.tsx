import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

type ThemeProps = {
  switchClick: () => void;
};

export function Navbar({ switchClick }: ThemeProps) {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          <span className="text-[hsl(280,100%,70%)]">T3</span> Manage It
        </Link>
      </div>
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
              className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-gray-300 p-2 text-black shadow hover:bg-base-100 hover:text-white"
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
      <input onClick={switchClick} type="checkbox" className="toggle mx-4" />
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
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
