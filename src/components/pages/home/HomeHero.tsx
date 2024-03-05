import React from 'react';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/legacy/image';
import Link from 'next/link';

const HomeHero = () => {
  return (
    <div>
      <Swiper
        // style={{
        //   '--swiper-pagination-color': '#4852AE',
        //   '--swiper-pagination-bullet-inactive-color': 'white',
        //   '--swiper-pagination-bullet-inactive-opacity': '1',
        //   '--swiper-pagination-bullet-size': '15px',
        // }}
        slidesPerView={1}
        spaceBetween={5}
        loop={true}
        autoplay={{
          delay: 2500,
          // disableOnInteraction: false,
          // pauseOnMouseEnter: true,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          disabledClass: 'disabled_swiper_button',
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index: number, className: string) {
            return `<span class="${className} test"><span class='bullet-text'>${index}</span> </span>`;
          },
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper relative "
      >
        <>
          <SwiperSlide>
            <Link href={`/product-category/eid-collection`} className="relative">
              <Image
                priority
                src={'/images/banner-images/img1.jpg'}
                width={1920}
                height={1200}
                alt="banner-img"
                layout="responsive"
                objectFit="cover"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href={`/product-category/luxury-punjabi`} className="relative">
              <Image
                priority
                src={'/images/banner-images/img2.jpeg'}
                width={1920}
                height={1200}
                alt="banner-img"
                layout="responsive"
                objectFit="cover"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href={`/product-category/eid-collection`} className="relative">
              <Image
                priority
                src={'/images/banner-images/img3.jpeg'}
                width={1920}
                height={1200}
                alt="banner-img"
                layout="responsive"
                objectFit="cover"
              />
            </Link>
          </SwiperSlide>
        </>
      </Swiper>
    </div>
  );
};

export default HomeHero;
