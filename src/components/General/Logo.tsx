import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <h1 className="bg-primary bg-gradient-to-r bg-clip-text text-4xl font-extrabold text-transparent">
        $
      </h1>
    </Link>
  );
};
