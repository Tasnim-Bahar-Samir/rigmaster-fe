import * as yup from 'yup';

export const sizeFormValidation = () =>
  yup.object().shape({
    size_title: yup.string().required('Name is required'),
  });
