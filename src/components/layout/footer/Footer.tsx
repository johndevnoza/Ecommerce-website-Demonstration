import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-accent py-8 ">
      <MaxWidthWrapper>
        <div className="grid justify-items-center grid-cols-2 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          <div className="flex-col flex gap-2">
            <h3 className="mb-2 border-b-2 px-[1rem]  border-primary font-bold ">
              {t("navigation")}
            </h3>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/about"}
            >
              {t("aboutUs")}
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/termsandconditions"}
            >
              {t("termsAndConditions")}
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/corporatesales"}
            >
              {t("corporateSales")}
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/deliveriservice"}
            >
              {t("deliveriService")}
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/career"}
            >
              {t("career")}
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/tradeIn"}
            >
              {t("tradeIn")}
            </Link>
          </div>
          <div className="flex-col flex gap-2">
            <h3 className="mb-2 border-b-2 px-[1rem] border-primary font-bold ">
              {t("payments")}
            </h3>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/paymentmethods"}
            >
              {t("paymentMethods")}
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/termsAndConditions"}
            >
              {t("guarrantees")}
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/corporateSales"}
            >
              {t("installments")}
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/corporateSales"}
            >
              {t("itemReturns")}
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/deliveriService"}
            >
              {t("howToBuyOnline")}
            </Link>
          </div>
          <div className="flex-col flex gap-2">
            <h3 className="mb-2 px-[1rem]  border-b-2 border-primary font-bold ">
              {t("followUs")}
            </h3>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/facebookredirect"}
            >
              {t("facebook")}
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/youtuberedirect"}
            >
              {t("youtube")}
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/instagramredirect"}
            >
              {t("instagram")}
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "text-secondary-foreground justify-start",
                })
              )}
              to={"/tiktokredirect"}
            >
              {t("tiktok")}
            </Link>
          </div>
          <div className="flex-col flex gap-2">
            <h3 className="mb-2 border-b-2 border-primary px-[1rem]  font-bold ">
              {t("contact")}
            </h3>
            <span>asdasdasd</span>
            <span>asdasdasd</span>
            <span>asdasdasd</span>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
