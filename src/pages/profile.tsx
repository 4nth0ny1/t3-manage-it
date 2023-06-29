import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: sessionData } = useSession();
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
    </div>
  );
}
