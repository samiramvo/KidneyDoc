"use client";
import { useLanguage } from "@/app/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="px-3 py-1 text-sm bg-violetdesc text-white rounded-md  transition-colors"
    >
      {language === 'en' ? 'FR' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;