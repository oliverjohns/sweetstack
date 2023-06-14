import { Link } from "./Link";

interface Props {
  title: string;
  shortDescription: string;
  longDescription: string;

  ctaLabel: string;
  ctaHref: string;
  ctaOnClick?: () => void;
}

export const ErrorSection = (props: Props) => {
  return (
    <div className="flex max-w-lg flex-col items-center gap-3">
      <h1 className="text-center text-5xl font-bold tracking-tight  sm:text-[5rem]">
        {props.title}
      </h1>

      <p className="text-center font-bold">{props.shortDescription}</p>
      <p className="pb-3 text-center">{props.longDescription}</p>

      <Link
        text={props.ctaLabel}
        href={props.ctaHref}
        onClick={props.ctaOnClick}
      />
    </div>
  );
};
