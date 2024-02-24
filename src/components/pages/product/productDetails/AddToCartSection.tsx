'use client';
import { imgData, sizeData } from '@/data/dummy.data';
import Image from 'next/legacy/image';
import Link from 'next/link';
import React, { useState } from 'react';

const AddToCartSection = () => {
  const [size, setSize] = useState('');
  const [img, setImg] = useState(imgData[0]);
  return (
    <div className="flex gap-10 flex-col lg:gap-20 md:flex-row md:justify-center">
      <div className="md:w-1/2">
        <div className="flex flex-col-reverse gap-3 lg:flex-row">
          <div className=" gap-2 grid grid-cols-4 lg:flex lg:flex-col lg:w-1/5">
            {imgData.map((i) => (
              <div
                key={Math.random()}
                className={`cursor-pointer border ${i === img ? 'border-2 border-[black]' : ''}`}
              >
                <Image
                  onClick={() => setImg(i)}
                  className={`cursor-pointer border ${i.id === img.id ? 'border border-[#C2A466]' : ''}`}
                  src={i.img}
                  width={298}
                  height={300}
                  alt="product_img"
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
          <div className="lg:w-4/5">
            <Image
              className=""
              src={img.img}
              width={298}
              height={300}
              alt="product_img"
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className=" flex justify-center text-center md:text-left md:justify-start md:w-1/2">
        <div className="space-y-4 md:space-y-5 xl:space-y-8">
          <div className="space-y-2 xl:space-y-4">
            <div className="space-y-1">
              <h1 className="text-lg font-medium md:text-xl xl:text-2xl">Winter Jacket</h1>
              <p className="text-sm">
                <span className="font-medium">Category:</span> Winter Collections
              </p>
            </div>
            <h5 className="font-medium xl:text-lg">৳ 700.00</h5>
          </div>
          <div className="text-xs xl:text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae magnam mollitia esse
            saepe illo voluptates temporibus odit molestiae voluptas reprehenderit?
          </div>
          <div className="space-y-2 xl:space-y-4">
            <h5 className="font-medium md:text-lg xl:text-xl">Select Size</h5>
            <div className="flex items-center flex-wrap gap-3 xl:gap-4">
              {sizeData.map((i) => (
                <button
                  onClick={() => setSize(i)}
                  key={Math.random()}
                  className={`${size == i ? 'border-black' : ''} p-2 border text-sm xl:p-4`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3 xl:space-y-5">
            <div className=" flex items-center gap-3 mt-10 xl:gap-4">
              <h5 className="font-medium md:text-lg xl:text-xl">Quantity</h5>
              <div className="flex items-center gap-3 border p-2 w-fit md:px-3 xl:gap-4">
                <button>-</button>1 <button>+</button>
              </div>
            </div>
            <div className="flex items-center gap-3 xl:gap-4">
              <button className="px-4 py-2 bg-black text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4">
                Add To Cart
              </button>
              <Link
                href={'/checkout'}
                className="px-4 py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartSection;
