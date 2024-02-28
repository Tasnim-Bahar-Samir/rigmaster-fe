import DashboardImgUpField from '@/components/core/DashImgUploadField';
import { CategoryFormValidation } from '@/libs/validation/ProductCategory.validation';
import { Dialog, MenuItem, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { FC, useState } from 'react';

type CategoryFormProps = {
  isDataSubmiting: boolean;
  handleDataSubmit: Function;
  instance?: any;
  setAnchorEl?: Function;
};
const CategoryForm: FC<CategoryFormProps> = ({
  handleDataSubmit,
  setAnchorEl,
  isDataSubmiting,
  instance,
}) => {
  const [open, setOpen] = useState(false);
  const { handleChange, setFieldValue, values, touched, errors, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        title: instance?.title || '',
        img: instance?.img || '',
        priority: instance?.priority || '',
      },
      validationSchema: CategoryFormValidation,
      onSubmit: async (data: any) => {
        try {
          let form_data = new FormData();
          if (data?.img?.name) {
            form_data.append('img', data.img);
          }
          form_data.append('title', data.title);
          form_data.append('priority', data.priority);
          await handleDataSubmit(form_data);
          setOpen(!open);
          if (instance) {
            enqueueSnackbar('Category Updated successfully.', {
              variant: 'success',
            });
          } else {
            enqueueSnackbar('Category added successfully.', {
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
          <h2 className="text-xl font-medium mb-3">{instance ? 'Update' : 'Add'} Category</h2>
          <div className="space-y-4 xl:space-y-5">
            <TextField
              value={values.title}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && typeof errors.title === 'string' ? errors.title : ''}
              className="w-full"
              name="title"
              onChange={handleChange}
              label="Title"
            />
            <TextField
              value={values.priority}
              error={touched.priority && Boolean(errors.priority)}
              helperText={
                touched.priority && typeof errors.priority === 'string' ? errors.priority : ''
              }
              className="w-full"
              name="priority"
              onChange={handleChange}
              label="Priority Number"
            />

            <DashboardImgUpField
              width={298}
              height={266}
              error={Boolean(errors.img) && touched.img && errors.img}
              setValue={(x: any) => setFieldValue('img', x)}
              value={values.img}
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

export default CategoryForm;
