import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { EvaluableClass } from "../../utils/class-names";
import { classNames } from "../../utils/class-names";
import { ErrorMessage } from "./ErrorMessage";
import { InputLabel } from "./InputLabel";

type Props = {
  id?: string;
  className?: EvaluableClass;
  label?: string;
  labelClassName?: EvaluableClass;
  inputClassName?: EvaluableClass;
  errorMessage?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextAreaInput = forwardRef<HTMLTextAreaElement, Props>(
  (props, ref) => {
    const {
      id,
      label,
      errorMessage,
      labelClassName,
      inputClassName,
      className,
      ...inputProps
    } = props;
    return (
      <div className={classNames(props.className)}>
        {label && (
          <InputLabel
            htmlFor={id}
            label={label}
            required={props.required}
            className={labelClassName}
          />
        )}
        <textarea
          rows={4}
          className={classNames(
            "w-full rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none",
            inputClassName,
            className
          )}
          aria-label={label}
          autoComplete="off"
          ref={ref}
          {...inputProps}
        />
        <ErrorMessage message={errorMessage} />
      </div>
    );
  }
);
TextAreaInput.displayName = "TextAreaInput";
