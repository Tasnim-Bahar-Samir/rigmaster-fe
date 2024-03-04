import { Dialog, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useUpdateProductData } from '@/hooks/product.hooks';
import { productFormValidation } from '@/libs/validation/product.validation';
import {
  AddProductStock,
  EditProductStock,
  ProductTitleFiled,
} from './@assets/AddProductInputFields';
import ProductImageUploadSection from './@assets/ProductImageUploadSection';
import TextEditor from '@/components/core/TextEditor';
import ProdCategoryInventoryAndPricingSec from './@assets/ProdCategoryInventoryAndPricingSec';
import MetaTagSection from './@assets/MetaTagSection';
// image_category: instance?.image_category[0].id ?? null,
//       date: instance?.date ?? getFomattedDate(new Date()),
//       title: instance?.title ?? "",
//       images: instance?.images ?? "",
const ProductEdit = ({ instance, setAnchorEl }: { instance: any; setAnchorEl: any }) => {
  // console.log(instance);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { mutateAsync } = useUpdateProductData(instance?.id);
  const { handleChange, values, touched, errors, isSubmitting, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        title: instance?.title ?? '',
        meta_description: instance?.meta_description ?? '',
        description_html: instance?.description_html ?? '',
        additional_information_html: instance?.additional_information_html ?? '',
        category: instance?.category ?? null,
        price: instance?.price ?? '',
        priority: instance?.priority ?? '',
        color: instance?.color ?? '',
        product_image: instance?.product_image ?? [],
        product_size_varient: instance?.product_size_varient ?? [],
        slug: instance?.slug ?? '',
      },
      validationSchema: productFormValidation,
      onSubmit: async (data: any) => {
        try {
          const updated_product_image = values?.product_image?.map((item: any, idx: number) => {
            if (item.id) {
              return {
                id: item.id,
                _sl: item._sl,
                product: instance.id,
                is_feature: idx == 0 ? true : false,
              };
            } else {
              return {
                image: item.image,
                _sl: item._sl,
                is_feature: idx == 0 ? true : false,
              };
            }
          });

          const transStockList = values.product_size_varient.map((item: any) => {
            const { size, product, ...rest } = item;
            return {
              ...rest,
              product: product && product.id !== undefined ? product.id : null,
              size: size && size.id !== undefined ? size.id : null,
            };
          });

          const prductData = {
            title: data?.title,
            category: data?.category?.id || null,
            meta_description: data?.meta_description || null,
            description_html: data?.description_html || null,
            additional_information_html: data?.additional_information_html || null,
            price: data?.price || null,
            priority: data?.priority || null,
            color: data?.color || null,
            product_image: updated_product_image || null,
            product_size_varient: transStockList.map(({ product, ...rest }: { product: any }) =>
              product === null ? rest : { product, ...rest },
            ),
            slug: data?.slug,
          };
          // console.log(prductData.product_size_varient)
          await mutateAsync(prductData);
          // console.log(_);

          enqueueSnackbar('Edited Product.', { variant: 'success' });
          setOpenEditModal(false);
          setAnchorEl(null);
        } catch (err: any) {
          for (let key of err.errors) {
            enqueueSnackbar(`${key?.attr} - ${key?.detail}`, {
              variant: 'error',
            });
          }
        }
      },
    });
  const [error, setError] = useState('');
  return (
    <div>
      <MenuItem onClick={() => setOpenEditModal(true)}>Edit</MenuItem>
      <Dialog
        open={openEditModal}
        maxWidth="xl"
        fullWidth
        onClose={() => setOpenEditModal(!openEditModal)}
      >
        <form className="p-5" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                      {touched.product_size_varient &&
                      typeof errors.product_size_varient === 'string'
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
                  <div className="mb-8">
                    <h5 className=" font-semibold mt-4 mb-2">Set Product Priority.</h5>
                    <TextField
                      size="small"
                      value={values.priority}
                      error={touched.priority && Boolean(errors.priority)}
                      helperText={
                        touched.priority && typeof errors.priority === 'string'
                          ? errors.priority
                          : ''
                      }
                      className="w-full"
                      name="priority"
                      onChange={handleChange}
                      label="Priority Number"
                    />
                  </div>
                  <div className="">
                    <h5 className=" font-semibold mt-4 mb-2">Description</h5>
                    <div className="">
                      <TextEditor
                        value={values?.description_html}
                        error={errors?.description_html}
                        setValue={(e: any) => setFieldValue('description_html', e)}
                      />
                    </div>
                  </div>
                  <div className="mt-24">
                    <h5 className="font-semibold my-4 lg:text-xl">Additional Information</h5>
                    <div className="">
                      <TextEditor
                        value={values?.additional_information_html}
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
      </Dialog>
    </div>
  );
};

export default ProductEdit;
