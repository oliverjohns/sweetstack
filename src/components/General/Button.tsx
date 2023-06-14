import { classNames } from "@/utils/class-names";
import { HashLoader } from "./HashLoader";

type Props = {
  text: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  text,
  onClick,
  className,
  loading,
  disabled,
  ...buttonProps
}: Props) => {
  const disabledOrLoading = disabled || loading;

  return (
    <button
      className={classNames(
        "rounded-md bg-white px-5  py-2 text-dark-text shadow-[0_0px_1px_1px_rgba(0,0,0,0.09)] transition hover:border-[#C8CACD] hover:bg-[#F4F5F8]",
        className,
        disabledOrLoading && "pointer-events-none bg-gray-300 opacity-60"
      )}
      onClick={onClick}
      disabled={disabledOrLoading}
      {...buttonProps}
    >
      {loading ? <HashLoader className="mx-auto" size={14} /> : text}
    </button>
  );
};
