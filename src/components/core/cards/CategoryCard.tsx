import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { FC } from 'react';

type CategoryCardType = {
  img: string;
  title: string;
  slug: string;
};

const CategoryCard: FC<CategoryCardType> = ({ title, img, slug }) => {
  return (
    <Link href={`/product-category/${slug}`} className="border block border-[#C2A466] p-2">
      <div className="relative">
        <Image
          className=""
          src={img}
          width={180}
          height={200}
          alt="category_img"
          objectFit="cover"
        />
      </div>
      <h5 className="font-medium text-center text-sm my-3 truncate xl:text-[16px]">{title}</h5>
    </Link>
  );
};

export default CategoryCard;
