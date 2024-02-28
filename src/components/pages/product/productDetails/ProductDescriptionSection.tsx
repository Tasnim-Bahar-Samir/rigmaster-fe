'use client';
import React, { FC, useState } from 'react';
type ProductDescriptionSectionProps = {
  desc: string;
  additionalDesc: string;
};
const ProductDescriptionSection: FC<ProductDescriptionSectionProps> = ({
  desc,
  additionalDesc,
}) => {
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
      <div className="mt-5 text-xs px-3 xl:text-sm">
        {active == 'desc' && (
          <p dangerouslySetInnerHTML={{ __html: desc ? desc : 'Not Provided' }}></p>
        )}
        {active == 'additional' && (
          <p
            dangerouslySetInnerHTML={{ __html: additionalDesc ? additionalDesc : 'Not Provided' }}
          ></p>
        )}
      </div>
    </div>
  );
};

export default ProductDescriptionSection;
