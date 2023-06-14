import type { EvaluableClass } from "@/utils/class-names";
import { classNames } from "@/utils/class-names";
import type { ButtonHTMLAttributes } from "react";
import { IconWrapper } from "./IconWrapper";

type Props = {
  className?: EvaluableClass;
  icon: JSX.Element;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = (props: Props) => {
  const { children, className, icon, ...buttonProps } = props;
  return (
    <button
      className={classNames(
        className,
        children && "px-5",
        "text-grey inline-flex justify-center gap-2 rounded-full p-2 transition-colors hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:grow-0"
      )}
      {...buttonProps}
    >
      <>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {children}
      </>
    </button>
  );
};
