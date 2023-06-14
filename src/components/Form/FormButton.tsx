import type { ButtonHTMLAttributes } from "react";
import { classNames } from "../../utils/class-names";
import { IconWrapper } from "../General/IconWrapper";

type Props = {
  preIcon?: JSX.Element;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FormButton = (props: Props) => {
  const { children, className, preIcon, ...buttonProps } = props;
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
        {preIcon && <IconWrapper>{preIcon}</IconWrapper>}
        {children}
      </>
    </button>
  );
};
