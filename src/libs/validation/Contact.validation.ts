import * as yup from 'yup';

export const contactFormValidation = () =>
  yup.object().shape({
    name: yup.string().required('Name is required'),
    message: yup.string().required('Address is required'),
    email: yup.string().required('Message is required').email(),
  });
