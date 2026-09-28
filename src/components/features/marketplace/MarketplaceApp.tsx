import { marketplaceProducts } from "@/packages/configs/marketplace.config";
import { ProductGrid } from "../products/ProductGrid";
import { MarketplaceHero } from "./MarketplaceHero";

const MarketplaceApp = () => (
  <>
    <main id="main">
      <MarketplaceHero />
      <ProductGrid products={marketplaceProducts} />
    </main>
  </>
);

export default MarketplaceApp;
