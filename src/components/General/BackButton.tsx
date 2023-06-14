import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { classNames } from "../../utils/class-names";
import { Button } from "./Button";
import { Link } from "./Link";

type Props = {
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const BackButton = (props: Props) => {
  const { t } = useTranslation("common");
  const { href, className } = props;
  const router = useRouter();

  if (!href) {
    return (
      <Button
        className={classNames(className, "mb-5")}
        text={t("goBack")}
        onClick={() => router.back()}
      />
    );
  }

  return (
    <Link
      className={classNames(className, "mb-5")}
      text={t("goBack")}
      href={href}
    />
  );
};
