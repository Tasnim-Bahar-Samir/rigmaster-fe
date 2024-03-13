import ProductDetailsPage from '@/components/pages/product/productDetails/ProductDetials.page';
import axiousResuest from '@/libs/axiosRequest';
// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
import React, { FC } from 'react';

type ProductDetailsProps = {
  params: { slug: string };
};

// export async function generateMetadata({ params }: ProductDetailsProps): Promise<Metadata> {
//   // fetch data
//   const _: any = await axiousResuest({
//     url: `/product/management/?slug=${params.slug}`,
//     method: 'get',
//   });

//   if (_.results.length == 0) {
//     notFound();
//   }
//   return {
//     title: _?.results[0].title,
//     description: _?.results[0].meta_description,
//     openGraph: {
//       type: 'website',
//       url: '/',
//       siteName: 'Rigmaster',
//       images: [
//         {
//           url: `${_?.results[0]?.product_image?.[0]?.image}`,
//         },
//       ],
//     },
//   };
// }

const ProductDetails: FC<ProductDetailsProps> = async ({ params }) => {
  try {
    const productDetails = await axiousResuest({
      url: `/product/management/?slug=${params.slug}`,
      method: 'get',
    });

    return (
      <div>
        <ProductDetailsPage productDetails={productDetails?.results?.[0]} />
      </div>
    );
  } catch (error:any) {
    // notFound();
    return (
      <div>
        <p>{params?.slug}</p>
        <hr />
        <p>{error?.message?.toString()}</p>
      </div>
    );
  }
};

export default ProductDetails;
