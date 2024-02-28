import { useFormik } from 'formik';
import {
  AddProductStock,
  EditProductStock,
  ProductTitleFiled,
} from './@assets/AddProductInputFields';
// import { productFormValidation } from '@/lib/validation/ProductManageFormValidation';
// import { usePostProduct } from '@/hooks/query/useProductDataQuery';
import { enqueueSnackbar } from 'notistack';
// import ProductImageUploadSection from './@assets/ProductImageUploadSection';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MetaTagSection from './@assets/MetaTagSection';
import TextEditor from '@/components/core/TextEditor';
import { useAddProductData } from '@/hooks/product.hooks';
import ProdCategoryInventoryAndPricingSec from './@assets/ProdCategoryInventoryAndPricingSec';
import ProductImageUploadSection from './@assets/ProductImageUploadSection';
import { productFormValidation } from '@/libs/validation/product.validation';

// main component
const ProductForm = () => {
  const router = useRouter();
  const { mutateAsync } = useAddProductData();
  const { handleChange, values, touched, errors, isSubmitting, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        title: '',
        meta_description: '',
        description_html: '',
        additional_information_html: '',
        category: null,
        color: '',
        price: '',
        product_image: [],
        product_size_varient: [],
        slug: '',
      },
      validationSchema: productFormValidation,
      onSubmit: async (data: any) => {
        // const updated_product_image = {};
        const updated_product_image = values.product_image.map((item: any, idx: number) => {
          return {
            image: item.image,
            _sl: item._sl,
            is_feature: idx == 0 ? true : false,
          };
        });
        const transStockList = data.product_size_varient.map((item: any) => {
          const { size, ...rest } = item;
          return {
            ...rest,
            size: size && size.id !== undefined ? size.id : null,
          };
        });
        try {
          const prductData = {
            title: data.title,
            category: data?.category?.id || null,
            meta_description: data.meta_description || null,
            description_html: data.description_html || null,
            additional_information_html: data.additional_information_html || null,
            color: data.color || null,
            price: data.price || null,
            product_image: updated_product_image || null,
            product_size_varient: transStockList,
            slug: data?.slug,
          };
          await mutateAsync(prductData);
          enqueueSnackbar('Added Product.', { variant: 'success' });
          router.push('/dashboard/product/all');
          // console.log(prductData)
        } catch (err: any) {
          for (let key of err.errors) {
            enqueueSnackbar(`${key?.attr} - ${key?.detail}`, {
              variant: 'error',
            });
          }
        }
      },
    });

  const [error, setError] = useState<any>('');
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div className="flex gap-5 xl:gap-9">
        <div className="w-2/3">
          <div>
            <div className="flex justify-between items-center pb-10">
              <h2 className="text-2xl font-semibold md:text-4xl">Product Details</h2>
            </div>
            <div>
              <h3 className="text-xl font-semibold pb-6 md:text-2xl">
                Basic Information<span className="text-red-600">*</span>
              </h3>
            </div>
            <ProductTitleFiled
              values={values}
              handleChange={handleChange}
              errors={errors}
              touched={touched}
            />
            {/* image upload section*/}
            <div>
              <ProductImageUploadSection
                values={values}
                setValue={(e: any) => setFieldValue('product_image', e)}
                touched={touched}
                errors={errors}
              />
            </div>
            <div className="space-y-4 my-3">
              {values.product_size_varient.map((i: any, idx: any) => (
                <EditProductStock
                  key={Math.random()}
                  setError={setError}
                  values={values}
                  setValue={(e: any) => setFieldValue('product_size_varient', e)}
                  data={i}
                  idx={idx}
                />
              ))}
              <hr />
              {values.is_package && values.product_size_varient?.length == 1 ? (
                ''
              ) : (
                <AddProductStock
                  setError={setError}
                  values={values}
                  setValue={(e: any) => setFieldValue('product_size_varient', e)}
                />
              )}
              {touched.product_size_varient && Boolean(errors.product_size_varient) && (
                <p className="text-red-600 text-sm" role="alert">
                  {touched.product_size_varient && typeof errors.product_size_varient === 'string'
                    ? errors.product_size_varient
                    : ''}
                </p>
              )}
              <p className="text-red-600 text-sm" role="alert">
                {error ? error : ''}
              </p>
            </div>

            {/* other details section */}
            <>
              <h3 className="text-xl font-semibold pb-4 md:text-2xl">Other Details</h3>
              <div className="">
                <h5 className=" font-semibold my-4 lg:text-xl">Description</h5>
                <div className="">
                  <TextEditor
                    error={errors?.description_html}
                    setValue={(e: any) => setFieldValue('description_html', e)}
                  />
                </div>
              </div>
              <div className="mt-24">
                <h5 className="font-semibold my-4 lg:text-xl">Additional Information</h5>
                <div className="">
                  <TextEditor
                    error={errors?.additional_information_html}
                    setValue={(e: any) => setFieldValue('additional_information_html', e)}
                  />
                </div>
              </div>
            </>

            <button
              type="submit"
              disabled={isSubmitting}
              className="disabled:bg-slate-500 px-4 rounded-md mt-3 gap-1 py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4 xl:mt-5"
            >
              Publish
            </button>
          </div>
        </div>
        <div className="w-1/3">
          <ProdCategoryInventoryAndPricingSec
            values={values}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />
          <h2 className="font-semibold my-4 lg:text-xl"> Meta tags*</h2>
          <MetaTagSection
            values={values}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
          />
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
