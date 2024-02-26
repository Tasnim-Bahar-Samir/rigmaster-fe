import * as yup from 'yup';

export const productFormValidation = () =>
  yup.object().shape({
    title: yup.string().max(150).required('Title is required'),
    price: yup.string().max(150).required('Price is required'),
    color: yup.string().max(50).required('Color name is required'),
    category: yup.object().required('Category is required'),
    meta_description: yup.string().required('This field is required').max(250),
    description_html: yup.string(),
    additional_information_html: yup.string(),
    product_image: yup.array().min(1).required('This field is required'),
    product_size_varient: yup.array().min(1).required('This field is required'),
    slug: yup.string().required('Slug is required'),
  });
