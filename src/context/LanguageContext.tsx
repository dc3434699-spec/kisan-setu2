import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'mr';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
}

export const translations: Translations = {
  appName: {
    en: 'KisanSetu',
    hi: 'किसानसेतु',
    mr: 'किसानसेतू'
  },
  tagline: {
    en: 'Connecting Farmers Directly to Consumers',
    hi: 'किसानों को सीधे उपभोक्ताओं से जोड़ना',
    mr: 'शेतकऱ्यांना थेट ग्राहकांशी जोडणे'
  },
  farm2home: {
    en: 'From Farm to Home — Fresh. Healthy. Direct.',
    hi: 'खेत से घर तक — ताज़ा। शुद्ध। सीधा।',
    mr: 'शेतातून थेट घरी — ताजे. सकस. थेट.'
  },
  home: {
    en: 'Home',
    hi: 'होम',
    mr: 'मुख्यपृष्ठ'
  },
  marketplace: {
    en: 'Marketplace',
    hi: 'बाज़ार',
    mr: 'शेतमाल बाजार'
  },
  agroTourism: {
    en: 'Farm Visits',
    hi: 'खेत भ्रमण',
    mr: 'कृषी पर्यटन'
  },
  schemes: {
    en: 'Govt Schemes',
    hi: 'सरकारी योजनाएं',
    mr: 'शासकीय योजना'
  },
  equipment: {
    en: 'Machinery & Tools',
    hi: 'कृषि उपकरण व यंत्र',
    mr: 'कृषी अवजारे'
  },
  labour: {
    en: 'Farm Labour',
    hi: 'कृषि मजदूर',
    mr: 'कृषी मजूर'
  },
  krishiMitra: {
    en: 'Krishi Mitra (AI)',
    hi: 'कृषि मित्र (एआई)',
    mr: 'कृषी मित्र (AI)'
  },
  weather: {
    en: 'Weather',
    hi: 'मौसम',
    mr: 'हवामान'
  },
  mandiRates: {
    en: 'Mandi Rates',
    hi: 'मंडी भाव',
    mr: 'बाजार भाव'
  },
  cart: {
    en: 'Cart',
    hi: 'कार्ट',
    mr: 'खरेदी टोपली'
  },
  orders: {
    en: 'My Orders',
    hi: 'मेरे ऑर्डर',
    mr: 'माझे ऑर्डर्स'
  },
  farmerPortal: {
    en: 'Farmer Dashboard',
    hi: 'किसान डैशबोर्ड',
    mr: 'शेतकरी डॅशबोर्ड'
  },
  adminPortal: {
    en: 'Admin Oversight',
    hi: 'व्यवस्थापक पोर्टल',
    mr: 'प्रशासक पोर्टल'
  },
  login: {
    en: 'Login',
    hi: 'लॉग इन',
    mr: 'लॉग इन'
  },
  register: {
    en: 'Register',
    hi: 'पंजीकरण करें',
    mr: 'नोंदणी करा'
  },
  logout: {
    en: 'Logout',
    hi: 'लॉग आउट',
    mr: 'लॉग आउट'
  },
  switchDemoRole: {
    en: 'Quick Demo Switcher',
    hi: 'त्वरित डेमो स्विचर',
    mr: 'झटपट डेमो स्विचर'
  },
  searchPlaceholder: {
    en: 'Search organic vegetables, fruits, grains, honey...',
    hi: 'जैविक सब्जियां, फल, अनाज, शहद खोजें...',
    mr: 'सेंद्रिय भाजीपाला, फळे, धान्य, मध शोधा...'
  },
  all: {
    en: 'All',
    hi: 'सभी',
    mr: 'सर्व'
  },
  vegetables: {
    en: 'Vegetables',
    hi: 'सब्जियां',
    mr: 'भाजीपाला'
  },
  fruits: {
    en: 'Fruits',
    hi: 'फल',
    mr: 'फळे'
  },
  grains: {
    en: 'Grains & Pulses',
    hi: 'अनाज व दालें',
    mr: 'धान्य आणि कडधान्ये'
  },
  dairy: {
    en: 'Dairy & Honey',
    hi: 'डेयरी व शहद',
    mr: 'दुग्धजन्य व मध'
  },
  spices: {
    en: 'Spices & Herbs',
    hi: 'मसाले व जड़ी-बूटियां',
    mr: 'मसाले'
  },
  addToCart: {
    en: 'Add to Cart',
    hi: 'कार्ट में जोड़ें',
    mr: 'टोपलीत जोडा'
  },
  bookVisit: {
    en: 'Book Farm Visit',
    hi: 'खेत भ्रमण बुक करें',
    mr: 'शेत भेट बुक करा'
  },
  traceability: {
    en: 'Trace Harvest Origin',
    hi: 'उत्पत्ति की जांच करें',
    mr: 'उत्पत्ती तपासा'
  },
  sustainability: {
    en: 'Impact & Sustainability',
    hi: 'स्थिरता व प्रभाव',
    mr: 'पर्यावरणीय प्रभाव'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('kisansetu_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kisansetu_lang', lang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
