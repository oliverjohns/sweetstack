import { TextInput } from "@/components/Form/TextInput";
import { Button } from "@/components/General/Button";
import { RootContainer } from "@/components/General/RootContainer";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignInPage = () => {
  const formSchema = z.object({
    email: z.string(),
    password: z.string(),
  });
  type FormData = z.infer<typeof formSchema>;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const authClient = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async ({ email, password }: FormData) => {
    setLoading(true);
    try {
      const res = await authClient.auth.signInWithPassword({
        email,
        password,
      });
      console.log("res", res);
      if (res.error) {
        return setErrorMessage(res.error.message);
      }
      const url = router.query.redirectedFrom;
      if (url && typeof url === "string") {
        return router.push(url);
      }
      await router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RootContainer>
      <h1 className="text-2xl">Login to SweetStack</h1>
      <form
        className="mx-auto mt-8 w-full max-w-sm space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
          })}
          errorMessage={errors.email && errors.email.message}
        />
        <TextInput
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          errorMessage={errors.password && errors.password.message}
        />
        <Button
          type="submit"
          text="Sign In"
          className="w-full"
          loading={loading}
        />
      </form>
      {errorMessage && <p className="h-4 text-red-400">{errorMessage}</p>}
    </RootContainer>
  );
};

export default SignInPage;
