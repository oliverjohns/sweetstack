import { useTranslation } from "next-i18next";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

export const SEOHead = ({ title, description }: Props) => {
  const { t } = useTranslation('seo')

  return (
    <Head>
      <title>{title ?? t('title')}</title>
      <meta name="description" content={description ?? t('description') ?? undefined} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
