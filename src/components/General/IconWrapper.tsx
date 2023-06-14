import { classNames } from "@/utils/class-names";
import type { HTMLAttributes } from "react";

type Props = {
  children: JSX.Element;
} & HTMLAttributes<HTMLDivElement>;

export const IconWrapper = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <div className={className}>
      <div className={classNames("block h-6 w-6")} {...rest}>
        {children}
      </div>
    </div>
  );
};
