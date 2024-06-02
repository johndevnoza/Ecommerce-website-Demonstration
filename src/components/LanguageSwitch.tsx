import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideLanguages } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "english" },
  { code: "ge", lang: "georgian" },
];

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const handleLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
            className: "flex gap-2 data-[state=open]:border-primary",
          }),
        )}
      >
        <LucideLanguages />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuLabel> {t("languages")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((language) => (
          <DropdownMenuItem
            className={cn(
              buttonVariants({
                variant:
                  language.code === i18n.language ? "default" : "secondary",
              }),
            )}
            key={language.code}
            onClick={() => handleLanguage(language.code)}
          >
            {`${t(language.lang)}`}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitch;
