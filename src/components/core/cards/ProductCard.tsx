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
  // alterThumbnail ? (open ? alterThumbnail : thumbnail) : thumbnail
  const [open, setopen] = useState(false);
  return (
    <div className="">
      <div>
        <Link href={`/product/${slug}`} className="relative bg-slate-100">
          <div className="relative">
            {alterThumbnail ? (
              <>
                <div
                  className={`transition-all ease-in-out duration-500 ${!open ? 'opacity-100 ' : ' opacity-0 absolute'}`}
                >
                  <Image
                    onMouseOver={() => setopen(true)}
                    onMouseOut={() => setopen(false)}
                    className=""
                    src={thumbnail}
                    width={298}
                    height={398}
                    alt="category_img"
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div
                  className={`transition-all ease-in-out duration-500 ${open ? 'opacity-100' : ' opacity-0 absolute'}`}
                >
                  <Image
                    onMouseOver={() => setopen(true)}
                    onMouseOut={() => setopen(false)}
                    className=""
                    src={alterThumbnail && alterThumbnail}
                    width={298}
                    height={398}
                    alt="category_img"
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
              </>
            ) : (
              <Image
                onMouseOver={() => setopen(true)}
                onMouseOut={() => setopen(false)}
                className=""
                src={thumbnail}
                width={298}
                height={398}
                alt="category_img"
                layout="responsive"
                objectFit="cover"
              />
            )}
          </div>
        </Link>
        <div className="p-2 space-y-2 xl:space-y-3 xl:p-3">
          <Link href={`/product/${slug}`}>
            <p className="xl:text-lg font-medium">{title}</p>
          </Link>
          <p className="text-[#C2A466] xl:text-lg font-medium">৳ {price}.00</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
