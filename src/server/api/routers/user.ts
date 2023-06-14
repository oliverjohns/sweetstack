import { users } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    return {
      users: await ctx.db.select().from(users).execute(),
    };
  }),
});
