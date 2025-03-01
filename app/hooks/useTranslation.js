import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key) => {
    return translations[language][key] || key;
  };

  return { t };
}