import CategoryCard from '@/components/core/cards/CategoryCard';
import { CategoryLoadingCard } from '@/components/core/cards/LoadingCards';
import ProductCard from '@/components/core/cards/ProductCard';

const page = () => {
  return (
    <div className="rm-commonContainer ">
      <div className="mt-20">
        <CategoryCard
          img="/images/banner-images/bannerimg-1.webp"
          title="Eid Collections"
          slug="eid-collection"
        />
      </div>
      <CategoryLoadingCard />
      <ProductCard
        thumbnail="/images/prod-img.webp"
        title="Winter Jacket"
        price="500"
        slug="winter-jacket"
      />
    </div>
  );
};

export default page;
