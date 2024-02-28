import * as yup from 'yup';

const phoneReg = /^\+88|0\d{10}/;

export const checkoutFormValidation = () =>
  yup.object().shape({
    name: yup.string().required('Name is required'),
    phone: yup
      .string()
      .matches(phoneReg, 'Phone number is not valid')
      .max(11)
      .min(11)
      .required('Phone number is required'),
    // division: yup.string().required("Division is required"),
    // district: yup.string().required("District is required"),
    address: yup.string(),
    email: yup.string().email(),
  });
