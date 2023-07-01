import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [theme, setTheme] = useState("night");

  const toggleTheme = () => {
    if (theme === "night") {
      setTheme("acid");
    } else {
      setTheme("night");
    }
  };

  useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement;
    html.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component theme={theme} switchClick={toggleTheme} {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
