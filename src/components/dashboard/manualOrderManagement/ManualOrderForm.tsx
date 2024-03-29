import { Autocomplete, Dialog, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { FC, useState } from 'react';
import Image from 'next/legacy/image';
import { MdDelete } from 'react-icons/md';
import { orderItem } from '@/libs/calculateBill';
import { manualOrderFormValidation } from '@/libs/validation/CheckoutForm.validation';

type ManualOrderFormProps = {
  isProdDataLoading: boolean;
  isDataSubmiting: boolean;
  handleDataSubmit: Function;
  productData: any[];
  instance?: any;
  setProdSearch: Function;
};
const ManualOrderForm: FC<ManualOrderFormProps> = ({
  isProdDataLoading,
  setProdSearch,
  productData,
  handleDataSubmit,
  isDataSubmiting,
  instance,
}) => {
  // const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const { setFieldValue, values, touched, errors, resetForm, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        status: instance?.status || '',
        product: null,
        size: null,
        quantity: 1,
        created_by: '',
        name: instance?.billing_address?.name || '',
        phone: instance?.billing_address?.phone || '',
        email: instance?.billing_address?.email || '',
        address: instance?.billing_address?.address || '',
        selectedProducts: [],
      },
      validationSchema: manualOrderFormValidation,
      onSubmit: async (data: any) => {
        if (values?.selectedProducts?.length < 1) {
          setError('Add atleast one product.');
          return;
        }
        try {
          const billingInfo = {
            name: data?.name,
            email: data?.email,
            phone: data.phone,
            address: data.address,
            created_by: data?.created_by,
          };
          const manualOrderData = {
            custom_purchase_order: orderItem(values?.selectedProducts),
            billing_address: billingInfo,
          };
          await handleDataSubmit(manualOrderData);
          setOpen(!open);
          enqueueSnackbar('Order created successfully.', {
            variant: 'success',
          });
        } catch (err: any) {
          for (let key of err.errors) {
            enqueueSnackbar(`${key?.attr} - ${key?.detail}`, {
              variant: 'error',
            });
          }
        }
      },
    });

  const handleSelectProduct = () => {
    if (!values.product || !values.size || !values?.quantity) {
      setError('Please Fill All Fields.');
      return;
    }
    if (values.quantity > values?.size?.quantity) {
      return setError(`Insuficient stock! Only available ${values?.size.quantity} instock.`);
    }
    const productData = {
      thumbnail: values.product?.product_image?.filter((i: any) => i.is_feature)[0]?.image,
      title: values.product.title,
      price: values.product.price,
      color: values?.product?.color,
      productId: values.product?.id,
      quantity: values.quantity,
      sizeTitle: values?.size?.size?.size_title,
    };
    setFieldValue('selectedProducts', [...values?.selectedProducts, productData]);
    setFieldValue('product', null);
    setFieldValue('size', null);
    setFieldValue('quantity', 1);
    setError('');
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="disabled:bg-slate-500 px-4 rounded-md mt-3 gap-1 py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4 xl:mt-5"
      >
        Add Order
      </button>
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        onClose={() => {
          setFieldValue('selectedProducts', []);
          resetForm();
          setOpen(false);
        }}
      >
        <form className="p-5" onSubmit={handleSubmit} noValidate autoComplete="off">
          <h2 className="text-xl font-medium mb-6">Create Order</h2>
          <div className="space-y-4 xl:space-y-5">
            <div className="mb-10">
              <div className="mb-4">
                <div className="flex items-center gap-4">
                  <Autocomplete
                    fullWidth
                    loading={isProdDataLoading}
                    onInputChange={(e: any) => setProdSearch(e?.target?.value)}
                    disablePortal
                    value={values.product}
                    options={productData || []}
                    getOptionLabel={(option) => option.slug || ''}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(e, value) => {
                      setFieldValue('product', value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="product"
                        label="Product"
                        error={touched.product && Boolean(errors.product)}
                        helperText={
                          touched.product && typeof errors.product === 'string'
                            ? errors.product
                            : ''
                        }
                      />
                    )}
                  />
                  <Autocomplete
                    fullWidth
                    disablePortal
                    value={values.size}
                    options={values?.product ? values?.product?.product_size_varient : []}
                    getOptionLabel={(option) => option.size?.size_title || ''}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_e, value) => {
                      setFieldValue('size', value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="size"
                        label="Size"
                        error={touched.size && Boolean(errors.size)}
                        helperText={
                          touched.size && typeof errors.size === 'string' ? errors.size : ''
                        }
                      />
                    )}
                  />
                  <TextField
                    type="number"
                    value={values.quantity}
                    error={touched.quantity && Boolean(errors.quantity)}
                    helperText={
                      touched.quantity && typeof errors.quantity === 'string' ? errors.quantity : ''
                    }
                    className="w-full"
                    name="quantity"
                    onChange={handleChange}
                    label="Quantity"
                  />
                  <AddCircleOutlineIcon className="cursor-pointer" onClick={handleSelectProduct} />
                </div>
                <p className="text-red-600 text-sm" role="alert">
                  {error ? error : ''}
                </p>
              </div>
              <div className="space-y-3">
                {values?.selectedProducts?.length > 0 &&
                  values?.selectedProducts?.map((i: any, idx: number) => (
                    <div className="flex items-center gap-7" key={Math.random()}>
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-200 w-16 h-16 relative">
                          <Image
                            src={i.thumbnail}
                            layout="fill"
                            objectFit="cover"
                            alt="poduct_image"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h5 className="font-medium text-sm xl:text-[16px]">
                            {i.title}- <span className="uppercase">{i.sizeTitle}</span>
                          </h5>
                          <p className="text-sm">
                            Qty: <span className="text-slate-500">{i.quantity}</span>
                          </p>
                          <p className="text-sm text-[#C2A466]">৳ {i.price}</p>
                        </div>
                      </div>
                      <MdDelete
                        size={18}
                        onClick={() => {
                          const _ = values?.selectedProducts;
                          _.splice(idx, 1);
                          // console.log(selectedProducts);
                          setFieldValue('selectedProducts', _);
                        }}
                        className="text-red-600 cursor-pointer"
                      />
                    </div>
                  ))}
              </div>
            </div>
            <TextField
              value={values.created_by}
              error={touched.created_by && Boolean(errors.created_by)}
              helperText={
                touched.created_by && typeof errors.created_by === 'string' ? errors.created_by : ''
              }
              className="w-full"
              name="created_by"
              onChange={handleChange}
              label="Order Creator"
            />
            <div className="space-y-5 w-full">
              <h1 className="font-semibold text-lg xl:text-xl">Shipping Address</h1>
              <div>
                <TextField
                  value={values.name}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && typeof errors.name === 'string' ? errors.name : ''}
                  className="w-full"
                  name="name"
                  onChange={handleChange}
                  label="Name"
                />
              </div>
              <div className="space-y-5 gap-5 md:space-y-0 md:flex">
                <TextField
                  value={values.phone}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && typeof errors.phone === 'string' ? errors.phone : ''}
                  className="w-full"
                  name="phone"
                  onChange={handleChange}
                  label="Phone"
                />
                <TextField
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && typeof errors.email === 'string' ? errors.email : ''}
                  className="w-full"
                  name="email"
                  onChange={handleChange}
                  label="Email"
                />
              </div>
              <div>
                <TextField
                  multiline
                  rows={4}
                  value={values.address}
                  error={touched.address && Boolean(errors.address)}
                  helperText={
                    touched.address && typeof errors.address === 'string' ? errors.address : ''
                  }
                  className="w-full"
                  name="address"
                  onChange={handleChange}
                  label="Address"
                />
              </div>
            </div>
            <div className="flex mt-4 items-center gap-2">
              <button
                onClick={() => setOpen(false)}
                type="button"
                className=" px-4 mt-3 gap-1 py-2 border rounded-md transition-all font-medium xl:px-8 xl:py-4 xl:mt-5"
              >
                {'Cancel'}
              </button>
              <button
                disabled={isDataSubmiting}
                type="submit"
                className="disabled:bg-slate-500 px-4 rounded-md mt-3 gap-1 py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4 xl:mt-5"
              >
                {isDataSubmiting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default ManualOrderForm;
