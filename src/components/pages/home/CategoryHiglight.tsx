import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';

const CategoryHiglight = () => {
  return (
    <div className="rm-commonContainer">
      <Link href={`/product-category/eid-collection`}>
        <Image
          className="cursor-pointer"
          src={'/images/banner-images/img2.jpg'}
          width={1920}
          height={1000}
          alt="banner-img"
          layout="responsive"
          objectFit="cover"
        />
      </Link>
    </div>
  );
};

export default CategoryHiglight;
