import Link from 'next/link';
import React from 'react';
import { BsCart2 } from 'react-icons/bs';
import { FaCartPlus } from 'react-icons/fa';

const EmptyCard = ({ title }: { title: string }) => {
  return (
    <div className="h-64 flex flex-col items-center justify-center text-center xl:h-96">
      <div className="space-y-2 mb-5">
        <FaCartPlus className="mx-auto" size={44} />
        <div>{title ? title : 'No Product Added To Cart'}</div>
      </div>
      <Link href="/shop">
        <button className="px-4 flex items-center gap-1 py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4">
          <BsCart2 /> Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default EmptyCard;
