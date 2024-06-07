import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import HomeCategories from "@/components/ui/homePage custom/HomeCategories";
import HomeOffers from "@/components/ui/homePage custom/HomeOffers";
import { Products } from "./productRelated/products/Products";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MaxWidthWrapper className="h-screen">
        <div className="flex h-full w-full flex-col gap-6 border-x-2 border-border py-8">
          {/* Best Offers */}
          <HomeOffers />
          {/* home fancy categories carousel */}
          <HomeCategories />
          {/* Homepage All products */}
          <Products isHomePage={true} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
