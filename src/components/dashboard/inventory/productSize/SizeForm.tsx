import { sizeFormValidation } from '@/libs/validation/inventory.validtion';
import { Dialog, MenuItem, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { FC, useState } from 'react';

type SizeFormProps = {
  isDataSubmiting: boolean;
  handleDataSubmit: Function;
  instance?: any;
  setAnchorEl?: Function;
};
const SizeForm: FC<SizeFormProps> = ({
  handleDataSubmit,
  setAnchorEl,
  isDataSubmiting,
  instance,
}) => {
  const [open, setOpen] = useState(false);
  const { handleChange, values, touched, errors, handleSubmit, resetForm } = useFormik({
    initialValues: {
      size_title: instance?.size_title || '',
      size_details: instance?.size_details || '',
    },
    validationSchema: sizeFormValidation,
    onSubmit: async (data: any) => {
      try {
        await handleDataSubmit(data);
        setOpen(!open);
        if (instance) {
          enqueueSnackbar('Size Updated successfully.', {
            variant: 'success',
          });
        } else {
          enqueueSnackbar('Size added successfully.', {
            variant: 'success',
          });
          resetForm();
        }
        if (setAnchorEl) {
          setAnchorEl(null);
        }
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
      {instance ? (
        <MenuItem onClick={() => setOpen(true)}>Edit</MenuItem>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="disabled:bg-slate-500 px-4 rounded-md mt-3 gap-1 py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4 xl:mt-5"
        >
          Add New
        </button>
      )}
      <Dialog open={open} maxWidth="sm" fullWidth onClose={() => setOpen(false)}>
        <form className="p-5" onSubmit={handleSubmit} noValidate autoComplete="off">
          <h2 className="text-xl font-medium mb-3">{instance ? 'Update' : 'Add'} Size</h2>
          <div className="space-y-4 xl:space-y-5">
            <TextField
              value={values.size_title}
              error={touched.size_title && Boolean(errors.size_title)}
              helperText={
                touched.size_title && typeof errors.size_title === 'string' ? errors.size_title : ''
              }
              className="w-full"
              name="size_title"
              onChange={handleChange}
              label="Size Title"
            />
            <TextField
              rows={3}
              multiline
              value={values.size_details}
              error={touched.size_details && Boolean(errors.size_details)}
              helperText={
                touched.size_details && typeof errors.size_details === 'string'
                  ? errors.size_details
                  : ''
              }
              className="w-full"
              name="size_details"
              onChange={handleChange}
              label="Size Details"
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

export default SizeForm;
