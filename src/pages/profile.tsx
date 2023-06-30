import { useSession } from "next-auth/react";
import Image from "next/image";
import { api } from "~/utils/api";
import type { User } from "../types";

export default function ProfilePage() {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id as string;

  const { data: user }: { data: User | undefined | null } =
    api.user.getUserProfile.useQuery({
      userId,
    });

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-8">
      <h2 className="text-3xl">{sessionData?.user.name}</h2>
      <Image
        src={sessionData?.user.image as string}
        width={100}
        height={100}
        alt="profile_image"
        className="rounded"
      />
      <h2>{sessionData?.user.email}</h2>
      {user?.theme}

      {/* instead of click lifting up state change to acid/night theme 
        create toggleMutation
        remove from navbar
      */}
      <input type="checkbox" className="toggle mx-4" />
    </div>
  );
}
