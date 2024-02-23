import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { FC } from 'react';

type ProductCardProps = {
  thumbnail: string;
  title: string;
  price: string;
  slug: string;
};

const ProductCard: FC<ProductCardProps> = ({ thumbnail, title, price, slug }) => {
  return (
    <div className="w-fit">
      <div>
        <Link href={`/product/${slug}`} className="relative">
          <Image
            className=""
            src={thumbnail}
            width={298}
            height={398}
            alt="category_img"
            objectFit="cover"
          />
        </Link>
        <div className="p-2 space-y-2 xl:space-y-3 xl:p-3">
          <Link href={`/product/${slug}`}>
            <p className="xl:text-lg font-medium">{title}</p>
          </Link>
          <p className="text-[#C2A466] xl:text-lg font-medium">৳ {price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
