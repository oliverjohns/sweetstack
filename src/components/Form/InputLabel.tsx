import type { EvaluableClass } from "@/utils/class-names";
import { classNames } from "@/utils/class-names";

type Props = {
  className?: EvaluableClass;
  htmlFor?: string;
  label?: string;
  required?: boolean;
};

export const InputLabel = (props: Props) => {
  return (
    <label
      className={classNames(
        "mb-2 block text-sm font-bold text-gray-800",
        props.className
      )}
      htmlFor={props.htmlFor}
    >
      {props.label}
      {props.required ? (
        <span className="font-bold text-red-400">*</span>
      ) : null}
    </label>
  );
};
