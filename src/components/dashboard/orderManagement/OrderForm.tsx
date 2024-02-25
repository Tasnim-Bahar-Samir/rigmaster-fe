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
  const { setFieldValue, values, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      status: instance?.status || '',
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
