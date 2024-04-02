import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          // navigation
          navigation: "Navigation",
          allProducts: "All Products",
          categories: "Categories",
          aboutUs: "About Us",
          contact: "Contact",
          offices: "Offices",
          map: "Map",
          // profile
          profile: "Profile",
          myAccount: "My Account",
          favorites: "Favorites",
          inbox: "Inbox",
          subscription: "Subscription",
          logOut: "Log Out",
          // theme
          light: "Light",
          toggleTheme: "Toggle Theme",
          dark: "Dark",
          system: "System",
          // multi language
          languages: "Languages",
          english: "English",
          georgian: "Georgian",
          // footer
          // footer nav
          termsAndConditions: "Terms and Conditions",
          corporateSales: "Corporate Sales",
          deliveriService: "Deliveri Service",
          career: "Career",
          tradeIn: "Trade In",
          // footer payments
          payments: "Payments",
          paymentMethods: "Payment Methods",
          guarrantees: "Guarrantees",
          installments: "Installments",
          itemReturns: "Item Returns",
          howToBuyOnline: "How To Buy Online",
          // footer Follow us
          followUs: "Follow Us",
          facebook: "Facebook",
          youtube: "Youtube",
          instagram: "Instagram",
          tiktok: "Tik Tok",
        },
      },
      ge: {
        translation: {
          // navigation
          navigation: "ნავიგაცია",
          allProducts: "პროდუქტები",
          categories: "კატეგორიები",
          aboutUs: "ჩვენს შესახებ",
          contact: "კონტაქტი",
          offices: "ოფისები",
          map: "რუკა",
          // profile
          profile: "პროფილი",
          myAccount: "ჩემი პროფილი",
          favorites: "ფავორიტები",
          inbox: "წერილები",
          subscription: "გამოწერა",
          logOut: "გამოსვლა",
          // theme
          toggleTheme: "შეცვალე თემა",
          light: "ნათელი",
          dark: "მუქი",
          system: "სისტემის",
          // multi language
          languages: "ენები",
          english: "ინგლისური",
          georgian: "ქართული",
          // footer
          // footer nav
          termsAndConditions: "წესები და პირობები",
          corporateSales: "კორპორატიული გაყიდვები",
          deliveriService: "მიწოდების სერვისი",
          career: "კარიერა",
          tradeIn: "ვაჭრობა",
          // footer payments
          payments: "გადახდები",
          paymentMethods: "გადახდის მეთოდები",
          guarrantees: "გარანტია",
          installments: "განვადება",
          itemReturns: "ნივთის დაბრუნება",
          howToBuyOnline: "ონლაინ ყიდვის ინსტურქცია",
          // footer Follow us
          followUs: "გამოგვყვევი",
          facebook: "Facebook",
          youtube: "Youtube",
          instagram: "Instagram",
          tiktok: "Tik Tok",
        },
      },
    },
  });
