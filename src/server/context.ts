import { type Session } from "@supabase/auth-helpers-react";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import { db } from "@/db/db";
import { type NodePgDatabase } from "drizzle-orm/node-postgres";
import { getServerAuthSession } from "./common/get-server-auth-session";
type CreateContextOptions = {
  session?: Session;
};

export const createContextInner = (opts?: CreateContextOptions) => {
  return {
    session: opts?.session,
    db,
  } as { db: NodePgDatabase<Record<string, never>>; session?: Session };
};

export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getServerAuthSession(opts);
  return createContextInner({
    session: session ? session : undefined,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
