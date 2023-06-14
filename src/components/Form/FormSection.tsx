import type { DetailedHTMLProps, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title: string;
  description?: string | boolean | null;
};

export const FormSection = (props: Props) => {
  const { title, description, children, ...divProps } = props;
  return (
    <div className="mb-5 flex flex-col gap-5 text-white" {...divProps}>
      <h2 className="text-lg font-bold text-white">{title}</h2>
      {description && <p className="text-slate-400">{description}</p>}

      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
};
