import { useSession } from "next-auth/react";
import Image from "next/image";
import { api } from "~/utils/api";
import type { User } from "../types";
import { useEffect } from "react";

type ThemeProps = {
  switchClick: () => void;
  theme: string;
};

export default function ProfilePage({ switchClick, theme }: ThemeProps) {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id as string;

  const ctx = api.useContext();

  const { data: user }: { data: User | undefined | null } =
    api.user.getUserProfile.useQuery({
      userId,
    });

  const { mutate: toggleThemeMutation } = api.user.toggleTheme.useMutation({
    onSettled: async () => {
      switchClick();
      await ctx.user.getUserProfile.invalidate();
    },
  });

  useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement;
    html.setAttribute("data-theme", user?.theme as string);
  }, [user?.theme]);

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

      <input
        type="checkbox"
        className="toggle mx-4"
        onClick={() => toggleThemeMutation({ userId, theme })}
      />
    </div>
  );
}
