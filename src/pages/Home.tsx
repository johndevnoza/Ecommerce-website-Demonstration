import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import HomeCategories from "@/components/ui/homePage custom/HomeCategories";
import HomeOffers from "@/components/ui/homePage custom/HomeOffers";
import { Products } from "./productRelated/products/Products";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="h-full">
        <div className="flex w-full flex-col gap-6 border-x-2 border-border py-8">
          {/* Best Offers */}
          <HomeOffers />
          {/* home fancy categories carousel */}
          <HomeCategories />
          {/* Homepage All products */}
          <Products isHomePage={true} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
