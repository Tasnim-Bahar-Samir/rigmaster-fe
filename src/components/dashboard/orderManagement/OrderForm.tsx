import { statusData } from '@/data/dummy.data';
import { Autocomplete, Dialog, MenuItem, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { FC, useState } from 'react';

type OrderFormProps = {
  isDataSubmiting: boolean;
  handleDataSubmit: Function;
  instance: any;
};
const OrderForm: FC<OrderFormProps> = ({ handleDataSubmit, isDataSubmiting, instance }) => {
  const [open, setOpen] = useState(false);
  const { setFieldValue, values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      status: instance?.status || '',
      name: instance?.billing_address?.name || '',
      phone: instance?.billing_address?.phone || '',
      email: instance?.billing_address?.email || '',
      address: instance?.billing_address?.address || '',
    },
    // validationSchema: contactFormValidation,
    onSubmit: async (data: any) => {
      try {
        await handleDataSubmit({ status: data.status });
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
  return (
    <div>
      <MenuItem onClick={() => setOpen(true)}>Edit</MenuItem>
      <Dialog open={open} maxWidth="sm" fullWidth onClose={() => setOpen(false)}>
        <form className="p-5" onSubmit={handleSubmit} noValidate autoComplete="off">
          <h2 className="text-xl font-medium mb-3">Update Status</h2>
          <div className="space-y-4 xl:space-y-5">
            <Autocomplete
              size="small"
              fullWidth
              disablePortal
              value={values.status}
              options={statusData.map((i: any) => i.value)}
              onChange={(_e, value) => {
                setFieldValue('status', value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="status"
                  label="Status"
                  error={touched.status && Boolean(errors.status)}
                  helperText={
                    touched.status && typeof errors.status === 'string' ? errors.status : ''
                  }
                />
              )}
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

export default OrderForm;
