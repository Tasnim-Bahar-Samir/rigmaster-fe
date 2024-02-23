import { FC } from 'react';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import { ProductLoadingCard } from '@/components/core/cards/LoadingCards';
import { ProductDataType } from '@/type/product.type';
import ProductCard from '@/components/core/cards/ProductCard';
import Link from 'next/link';

type Category1ProductsProps = {
  title: string;
  isLoading: boolean;
  productData: ProductDataType[];
};
const CategoryWiseProducts: FC<Category1ProductsProps> = ({ title, productData, isLoading }) => {
  return (
    <div className="rm-commonContainer">
      <div className="flex items-center justify-between mb-5 md:mb-7">
        <h5 className="text-lg font-semibold md:text-xl xl:text-2xl">{title}</h5>
        <Link
          href={'/product-category/eid-collection'}
          className="px-4 py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4"
        >
          View All
        </Link>
      </div>
      <Swiper
        speed={2000}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          100: {
            slidesPerView: 2.5,
            centeredSlides: true,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3.5,
            centeredSlides: true,
            spaceBetween: 16,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1236: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        // pagination={{
        //   clickable: true,
        //   renderBullet: function (index: number, className: string) {
        //     return `<span class="${className} test"><span class='bullet-text'>${index}</span> </span>`;
        //   },
        // }}
        modules={[Pagination, Autoplay]}
        className="mySwiper relative "
      >
        <>
          {!isLoading && productData?.length === 0 ? (
            <p className="text-16-semibold text-center py-4">No Data Available</p>
          ) : (
            <>
              {isLoading
                ? [...new Array(6)].map(() => (
                    <SwiperSlide className="" key={Math.random()}>
                      <ProductLoadingCard />
                    </SwiperSlide>
                  ))
                : !isLoading &&
                  productData?.map((i: ProductDataType) => (
                    <SwiperSlide className="" key={Math.random()}>
                      <div>
                        <ProductCard
                          thumbnail={i.thumbnail}
                          title={i.title}
                          price={i.price}
                          slug={i.slug}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
            </>
          )}
        </>
      </Swiper>
    </div>
  );
};

export default CategoryWiseProducts;
