import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export const getServerAuthSession = async (
  ctx: Parameters<typeof createPagesServerClient>[0]
) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("session", session);
  if (!session) return;
  return session;
};
