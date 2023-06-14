import type { LinkProps } from "next/link";
import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { Button } from "./Button";

type Props = {
  href: string;
  text: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps;

export const Link = ({ href, text, ...rest }: Props) => {
  return (
    <NextLink href={href} {...rest}>
      <Button text={text} className={rest.className} />
    </NextLink>
  );
};
