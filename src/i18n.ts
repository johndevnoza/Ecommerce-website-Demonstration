import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          navigation: "Navigation",
          allProducts: "All Products",
          categories: "Categories",
          aboutUs: "About Us",
          contact: "Contact",
          offices: "Offices",
          map: "Map",
          profile: "Profile",
          myAccount: "My Account",
          inbox: "Inbox",
          subscription: "Subscription",
          logOut: "Log Out",
          light: "Light",
          toggleTheme: "Toggle Theme",
          dark: "Dark",
          system: "System",
          languages: "Languages",
          english: "English",
          georgian: "Georgian",
        },
      },
      ge: {
        translation: {
          navigation: "ნავიგაცია",
          allProducts: "პროდუქტები",
          categories: "კატეგორიები",
          aboutUs: "ჩვენს შესახებ",
          contact: "კონტაქტი",
          offices: "ოფისები",
          map: "რუკა",
          profile: "პროფილი",
          myAccount: "ჩემი პროფილი",
          inbox: "წერილები",
          subscription: "გამოწერა",
          logOut: "გამოსვლა",
          toggleTheme: "შეცვალე თემა",
          light: "ნათელი",
          dark: "მუქი",
          system: "სისტემის",
          languages: "ენები",
          english: "ინგლისური",
          georgian: "ქართული",
        },
      },
    },
  });
