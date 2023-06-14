import { classNames } from "../../utils/class-names";

type Props = {
  message?: string;
  className?: string;
};

export const ErrorMessage = (props: Props) => {
  return (
    <p className={classNames(props.className, "h-4 text-xs text-red-400")}>
      {props.message ?? ""}
    </p>
  );
};
