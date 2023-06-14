import type { EvaluableClass } from "../../utils/class-names";
import { classNames } from "../../utils/class-names";

interface Props {
  id: string;
  label: string;
  labelDescription?: string;
  className?: EvaluableClass;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  errorMessage?: string;
}

export const Checkbox = (props: Props) => (
  <div className={classNames("relative flex items-start", props.className)}>
    <div className="flex h-5 items-center">
      <input
        id={props.id}
        aria-describedby="comments-description"
        type="checkbox"
        {...props.inputProps}
        className="focus:[#2e026d] h-4 w-4 rounded border-gray-300 text-[#2e026d]"
      />
    </div>
    <div className="ml-3 text-sm">
      <label
        htmlFor={props.id}
        className="cursor-pointer font-medium text-gray-300"
      >
        {props.label}
      </label>
      <span id="comments-description" className="text-gray-500">
        <span className="sr-only">{`${props.label} `}</span>
        {props.labelDescription}
      </span>
    </div>
  </div>
);
