import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import ProductSection from '../components/home/ProductSection';
import FlashSale from '../components/home/FlashSale';
import OfferBanners from '../components/home/OfferBanners';
import Testimonials from '../components/home/Testimonials';
import TrustBadges from '../components/home/TrustBadges';
import { products, newArrivals, bestSellers, trendingProducts } from '../data/products';

export default function HomePage() {
  const featuredProducts = products.slice(0, 10);
  const menProducts = products.filter(p => p.category === 'men').slice(0, 5);
  const womenProducts = products.filter(p => p.category === 'women').slice(0, 5);

  return (
    <div>
      <HeroBanner />
      <TrustBadges />
      <CategorySection />
      <ProductSection
        title="New Arrivals"
        subtitle="Just Dropped"
        products={newArrivals.length ? newArrivals : featuredProducts}
        viewAllLink="/new-arrivals"
        accent="#e94560"
      />
      <OfferBanners />
      <FlashSale />
      <ProductSection
        title="Best Sellers"
        subtitle="Most Popular"
        products={bestSellers.length ? bestSellers : featuredProducts}
        viewAllLink="/category/men"
        accent="#1a1a2e"
      />
      <ProductSection
        title="Trending Now"
        subtitle="This Week's Picks"
        products={trendingProducts.length ? trendingProducts : featuredProducts.slice(5)}
        viewAllLink="/category/women"
        accent="#f5a623"
      />
      <ProductSection
        title="Men's Collection"
        subtitle="For Him"
        products={menProducts}
        viewAllLink="/category/men"
      />
      <ProductSection
        title="Women's Collection"
        subtitle="For Her"
        products={womenProducts}
        viewAllLink="/category/women"
      />
      <Testimonials />
    </div>
  );
}
