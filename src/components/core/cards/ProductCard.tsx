'use client';
import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';

type ProductCardProps = {
  thumbnail: string;
  title: string;
  price: string;
  slug: string;
  alterThumbnail?: string;
};

const ProductCard: FC<ProductCardProps> = ({
  thumbnail,
  alterThumbnail = '',
  title,
  price,
  slug,
}) => {
  const [open, setopen] = useState(false);
  return (
    <div className="w-fit">
      <div>
        <Link href={`/product/${slug}`} className="relative bg-slate-100">
          <Image
            onMouseOver={() => setopen(true)}
            onMouseOut={() => setopen(false)}
            className="transition-all"
            src={alterThumbnail ? (open ? alterThumbnail : thumbnail) : thumbnail}
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
