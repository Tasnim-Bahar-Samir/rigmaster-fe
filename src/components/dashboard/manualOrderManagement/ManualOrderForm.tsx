import { Autocomplete, Dialog, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { FC, useState } from 'react';
import Image from 'next/legacy/image';
import { MdDelete } from 'react-icons/md';

type ManualOrderFormProps = {
  isDataSubmiting: boolean;
  handleDataSubmit: Function;
  productData: any[];
  sizeData: any[];
  instance?: any;
};
const ManualOrderForm: FC<ManualOrderFormProps> = ({
  productData,
  sizeData,
  handleDataSubmit,
  isDataSubmiting,
  instance,
}) => {
  const [open, setOpen] = useState(false);
  const { setFieldValue, values, touched, errors, resetForm, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        status: instance?.status || '',
        product: null,
        size: null,
        quantity: 1,
        name: instance?.billing_address?.name || '',
        phone: instance?.billing_address?.phone || '',
        email: instance?.billing_address?.email || '',
        address: instance?.billing_address?.address || '',
      },
      // validationSchema: contactFormValidation,
      onSubmit: async (data: any) => {
        try {
          const billing_data = {
            name: data?.name,
            phone: data?.phone,
            emails: data?.email,
            address: data?.address,
          };
          await handleDataSubmit({ status: data.status, billing_address: billing_data });
          setOpen(!open);
          enqueueSnackbar('Status Updated successfully.', {
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
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [error, setError] = useState('');
  const handleSelectProduct = () => {
    if (!values.product || !values.size || !values?.quantity) {
      setError('Please Fill All Fields.');
      return;
    }
    const productData = {
      thumbnail: values.product?.product_image?.filter((i: any) => i.is_feature)[0]?.image,
      title: values.product.title,
      price: values.product.price,
      color: values?.product?.color,
      productId: values.product?.id,
      quantity: values.quantity,
      sizeTitle: values.size,
    };
    setSelectedProducts([...selectedProducts, productData]);
    setFieldValue('product', null);
    setFieldValue('size', null);
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
          setSelectedProducts([]);
          resetForm();
          setOpen(false);
        }}
      >
        <form className="p-5" onSubmit={handleSubmit} noValidate autoComplete="off">
          <h2 className="text-xl font-medium mb-3">Create Order</h2>
          <div className="space-y-4 xl:space-y-5">
            <div className="mb-6">
              <div className="mb-4">
                <div className="flex items-center gap-4">
                  <Autocomplete
                    fullWidth
                    disablePortal
                    value={values.product}
                    options={productData || []}
                    getOptionLabel={(option) => option.slug || ''}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_e, value) => {
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
                    options={sizeData.map((i: any) => i?.size_title)}
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
                {selectedProducts?.length > 0 &&
                  selectedProducts.map((i: any) => (
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
                        onClick={() => undefined}
                        className="text-red-600 cursor-pointer"
                      />
                    </div>
                  ))}
              </div>
            </div>
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
