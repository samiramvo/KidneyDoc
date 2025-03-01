"use client";
import { useTranslation } from "@/app/hooks/useTranslation";

const TranslatedContent = ({ translationKey, className = "" }) => {
  const { t } = useTranslation();
  return <span className={className}>{t(translationKey)}</span>;
};

export default TranslatedContent;