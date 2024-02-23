'use client';
import React, { useState } from 'react';

const ProductDescriptionSection = () => {
  const [active, setActive] = useState('desc');
  return (
    <div>
      <div className="flex border-b items-center">
        <span
          onClick={() => setActive('desc')}
          className={`${active === 'desc' ? 'border-b-2 border-[#d6ba81]' : ''} cursor-pointer font-medium pb-2 px-3 xl:pb-3`}
        >
          Description
        </span>
        <span
          onClick={() => setActive('additional')}
          className={`${active === 'additional' ? 'border-b-2 border-[#d6ba81]' : ''} cursor-pointer font-medium pb-2 px-3 xl:pb-3`}
        >
          Additional Details
        </span>
      </div>
      <div className="mt-5 text-xs xl:text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, perferendis cum ullam eveniet
        distinctio suscipit deleniti earum aperiam doloribus aspernatur libero vel alias voluptas
        dolore! Sapiente saepe architecto fugit eligendi reprehenderit quod atque quidem, minus
        dolorum nesciunt aperiam ullam deserunt distinctio aspernatur eveniet similique blanditiis
        fuga delectus. Nostrum, beatae quis!
      </div>
    </div>
  );
};

export default ProductDescriptionSection;
