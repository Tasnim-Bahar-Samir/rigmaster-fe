import { calculateTotalBill, orderItem } from '@/libs/calculateBill';
import { checkoutFormValidation } from '@/libs/validation/CheckoutForm.validation';
import { selectedProductStore } from '@/store/ProductCookiesStore';
import { CartDataType } from '@/type/cart.type';
import { TextField } from '@mui/material';
import { deleteCookie } from 'cookies-next';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import React, { FC } from 'react';

type CheckoutPageContainerProps = {
  isDataSubmitting: boolean;
  handleDataSubmit: Function;
};

const CheckoutPageContainer: FC<CheckoutPageContainerProps> = ({
  handleDataSubmit,
  isDataSubmitting,
}) => {
  const { products, setPrevCookies } = selectedProductStore();
  const { push } = useRouter();
  const { handleChange, values, touched, errors, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      district: '',
      division: '',
      address: '',
    },
    validationSchema: checkoutFormValidation,
    onSubmit: async (data: any) => {
      try {
        const billingInfo = {
          name: data?.name,
          email: data?.email,
          phone: data.phone,
          address: data.address,
        };
        const codOrderData = {
          purchase_order: orderItem(products),
          billing_address: billingInfo,
        };
        const res = await handleDataSubmit(codOrderData);
        resetForm();
        push(`/checkout/success/${res.id}`);
        deleteCookie('addedProducts');
        setPrevCookies([]);
      } catch (err: any) {
        for (let key of err.errors) {
          enqueueSnackbar(`${key?.attr} - ${key?.detail}`, {
            variant: 'error',
          });
        }
      }
    },
  });
  return (
    <div className="">
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="flex gap-5 flex-col lg:flex-row xl:gap-10">
          {/* details form  */}
          <div className="space-y-5 w-full lg:w-3/5">
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

          {/* payment info */}
          <div className="bg-slate-100 w-full lg:w-2/5">
            <div className="p-5">
              <h3 className=" font-semibold mt-3 xl:mb-5 xl:text-lg"> Total Bill</h3>
              {/* order list  */}
              <div className="mb-7">
                <h5 className="font-medium my-2">Your Order</h5>
                <div className="space-y-1">
                  {products.map((i: CartDataType) => (
                    <div className="flex items-center justify-between" key={Math.random()}>
                      <p className="text-sm">
                        {i.title}-{i.sizeTitle}-{i.color} x {i.quantity} ৳{i.price}
                      </p>{' '}
                      <p className="">৳{i.price * i.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-5">
                <div className="text-sm flex justify-between">
                  <span>Subtotal</span>
                  <span className="text--[#C2A466]">৳ {calculateTotalBill(products)}</span>
                </div>
                <div className="text-sm flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text--[#C2A466]">৳ 0(free)</span>
                </div>
                <div className=" flex justify-between">
                  <span>Total</span>
                  <span className="text--[#C2A466] text-[#C2A466] font-semibold">
                    ৳ {calculateTotalBill(products)}
                  </span>
                </div>
              </div>
              <div className="flex mt-4 mb-3 items-center gap-1">
                <input type="radio" checked name="" id="cod" />
                <label htmlFor="cod">Cash On Delivery(COD)</label>
              </div>
              <button
                disabled={isDataSubmitting}
                className="disabled:bg-slate-500 px-4 mt-3 gap-1 w-full py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4 xl:mt-5"
              >
                {isDataSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPageContainer;
