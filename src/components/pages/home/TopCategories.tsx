import React, { FC } from 'react';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';
import CategoryCard from '@/components/core/cards/CategoryCard';
import { CategoryLoadingCard } from '@/components/core/cards/LoadingCards';

type TopCategoriesProps = {
  isLoading: boolean;
  categoryData: { img: string; title: string; slug: string }[];
};
const TopCategories: FC<TopCategoriesProps> = ({ categoryData, isLoading }) => {
  return (
    <div className="rm-commonContainer">
      <h5 className="text-lg mb-5 font-semibold md:text-xl md:mb-7 xl:text-2xl">Top Categories</h5>
      <Swiper
        speed={1500}
        loop
        autoplay={{
          delay: 3500,
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
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1236: {
            slidesPerView: 5,
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
          {!isLoading && categoryData?.length === 0 ? (
            <p className="text-16-semibold text-center py-4">No Category Available</p>
          ) : (
            <>
              {isLoading
                ? [...new Array(6)].map(() => (
                    <SwiperSlide className="" key={Math.random()}>
                      <CategoryLoadingCard />
                    </SwiperSlide>
                  ))
                : !isLoading &&
                  categoryData?.map((i: { img: string; title: string; slug: string }) => (
                    <SwiperSlide className="" key={Math.random()}>
                      <div>
                        <CategoryCard img={i.img} title={i.title} slug={i.slug} />
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

export default TopCategories;
