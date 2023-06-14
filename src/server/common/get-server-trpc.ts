import { db } from "@/db/db";
import type { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "../api/root";
import { getServerAuthSession } from "./get-server-auth-session";
export const getServerTrpc = async (
  ctx: Parameters<typeof createPagesServerClient>[0]
) => {
  const session = await getServerAuthSession(ctx);
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { db, session },
    transformer: superjson,
  });
  return ssg;
};
