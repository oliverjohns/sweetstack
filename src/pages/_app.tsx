import "@/styles/globals.css";
import { api } from "@/utils/api";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  type Session,
} from "@supabase/auth-helpers-react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const MyApp: AppType<{ initialSession: Session | null }> = ({
  Component,
  pageProps,
}) => {
  const [authClient] = useState(() => createPagesBrowserClient());
  return (
    <SessionContextProvider
      supabaseClient={authClient}
      initialSession={pageProps.initialSession}
    >
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
};

export default api.withTRPC(MyApp);
