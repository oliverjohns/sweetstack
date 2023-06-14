import { forwardRef } from "react";
import type { EvaluableClass } from "../../utils/class-names";
import { classNames } from "../../utils/class-names";
import { ErrorMessage } from "./ErrorMessage";
import { InputLabel } from "./InputLabel";

type Props = {
  label?: string;
  labelClassName?: EvaluableClass;
  errorMessage?: string;
  innerRef?: React.Ref<HTMLElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    className,
    labelClassName,
    label,
    type = "text",
    errorMessage,
    ...rest
  } = props;

  return (
    <div className={classNames(className)}>
      {label && (
        <InputLabel
          htmlFor={props.id}
          label={props.label}
          required={props.required}
          className={labelClassName}
        />
      )}
      <input
        className={classNames(
          "w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none",
          className
        )}
        aria-label={props["aria-label"] ?? label}
        type={type}
        autoComplete="off"
        ref={ref}
        {...rest}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
});
TextInput.displayName = "TextInput";
