'use client';
import { selectedProductStore } from '@/store/ProductCookiesStore';
import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const AddToCartSection = ({ productDetails }: { productDetails: any }) => {
  const {
    id,
    product_image,
    title,
    category,
    color,
    product_size_varient,
    price,
    meta_description,
    slug,
  } = productDetails;
  const [size, setSize] = useState<any>('');
  const [img, setImg] = useState(productDetails?.product_image?.find((i: any) => i.is_feature));
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { push } = useRouter();

  const {
    cartOpen,
    setCartOpen,
    products,
    setProduct,
    setIncreaseQuantityAsDuplicate,
    setDerectByProduct,
  } = selectedProductStore();
  // console.log(products)

  const handleBuyNow = () => {
    if (!size) {
      return setError('Please select a size!');
    }
    const productData = {
      productId: id,
      id: size?.id,
      title,
      thumbnail: product_image?.filter((i: any) => i.is_feature)[0]?.image,
      price: price,
      stockQuantity: size?.quantity,
      sizeTitle: size?.size?.size_title,
      color: color,
      quantity: quantity,
      product_code: slug,
    };
    setDerectByProduct([productData]);
    push('/checkout');
  };
  const handleAddTocart = () => {
    if (!size) {
      return setError('Please select a size!');
    }
    const productData = {
      productId: id,
      id: size?.id,
      title,
      thumbnail: product_image?.filter((i: any) => i.is_feature)[0]?.image,
      price: price,
      stockQuantity: size?.quantity,
      sizeTitle: size?.size?.size_title,
      color: color,
      quantity: quantity,
      product_code: slug,
    };
    const alreadyExist = products.find((prod: any) => prod.id === size?.id);
    if (alreadyExist) {
      setIncreaseQuantityAsDuplicate(size?.id, quantity);
      setCartOpen(!cartOpen);
      return;
    }
    setProduct(productData);
    setCartOpen(!cartOpen);
  };

  return (
    <div className="flex gap-10 flex-col lg:gap-20 md:flex-row">
      <div className="md:w-1/2">
        <PhotoProvider>
          <div className="flex flex-col-reverse gap-3 lg:flex-row">
            <div className=" gap-2 grid grid-cols-4 lg:flex lg:flex-col lg:w-1/5">
              {product_image?.map((i: any) => (
                <div
                  key={Math.random()}
                  className={`cursor-pointer border ${i === img ? 'border-2 border-[black]' : ''}`}
                >
                  <Image
                    onClick={() => setImg(i)}
                    className={`cursor-pointer border ${i.id === img.id ? 'border border-[#C2A466]' : ''}`}
                    src={i.image}
                    width={298}
                    height={350}
                    alt="product_img"
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
            <div className="lg:w-4/5">
              <PhotoView src={img.image}>
                <Image
                  className="w-full cursor-pointer border min-h-full"
                  src={img.image}
                  width={298}
                  height={350}
                  layout="responsive"
                  objectFit="cover"
                  alt="product_img"
                  priority
                />
              </PhotoView>
            </div>
          </div>
        </PhotoProvider>
      </div>
      <div className=" flex md:justify-start md:w-1/2">
        <div className="space-y-4 md:space-y-5 xl:space-y-8">
          <div className="space-y-2 xl:space-y-4">
            <div className="space-y-1">
              <h1 className="text-lg font-medium md:text-xl xl:text-2xl">
                {productDetails?.title}
              </h1>
              <p className="text-sm">
                <span className="font-medium">Category:</span> {category?.title}
              </p>
            </div>
            <h5 className="font-medium xl:text-lg">৳ {price}.00</h5>
          </div>
          <div className="text-xs xl:text-sm">{meta_description}</div>
          <div className="space-y-2 xl:space-y-4">
            {color && (
              <div className="flex items-center gap-2">
                <p className="font-medium">Color:</p>
                <p className="capitalize">{color}</p>
              </div>
            )}
            <div>
              <h5 className="font-medium md:text-lg xl:text-xl">Select Size</h5>
              <div className="flex items-center flex-wrap gap-3 xl:gap-4">
                {product_size_varient?.map((i: any) => (
                  <button
                    onClick={() => {
                      setError('');
                      setSize(i);
                    }}
                    key={Math.random()}
                    className={`${size == i ? 'border-black' : ''} uppercase p-2 border text-sm min-w-[40px] font-medium`}
                  >
                    {i.size.size_title}
                  </button>
                ))}
              </div>
            </div>
            {category?.title?.toLowerCase()?.includes('luxury') && size?.size?.size_details && (
              <div className="text-sm whitespace-pre-line text-slate-500">
                {size?.size?.size_details}
              </div>
            )}
            {(category?.title?.toLowerCase()?.includes('casual') ||
              category?.title?.toLowerCase()?.includes('formal')) &&
              size?.size?.shirt_size_details && (
                <div className="text-sm whitespace-pre-line text-slate-500">
                  {size?.size?.shirt_size_details}
                </div>
              )}

            {category?.title?.toLowerCase()?.includes('polo') && size?.size?.polo_size_details && (
              <div className="text-sm whitespace-pre-line text-slate-500">
                {size?.size?.polo_size_details}
              </div>
            )}
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
            {size &&
              (size.quantity > 0 ? (
                <p className="text-green-500 font-medium">Intock</p>
              ) : (
                <p className="text-red-700 font-medium">Out of stock</p>
              ))}
          </div>
          <div className="space-y-3 xl:space-y-5">
            <div className=" flex items-center gap-3 mt-10 xl:gap-4">
              <h5 className="font-medium md:text-lg xl:text-xl">Quantity</h5>
              <div className="flex items-center border w-fit px-3 py-2 gap-4">
                <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}>
                  -
                </button>
                {quantity} <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            <div className="flex items-center gap-3 xl:gap-4">
              <button
                onClick={handleAddTocart}
                className="px-4 py-2 bg-black text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4"
              >
                Add To Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="px-4 py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartSection;
