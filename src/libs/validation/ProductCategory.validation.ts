import * as yup from 'yup';
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/bmp',
  'image/tiff',
  'image/webp',
  'image/svg+xml',
  'image/x-icon',
];

export const CategoryFormValidation = () =>
  yup.object().shape({
    title: yup.string().max(255).required('This field is required'),
    priority: yup.string().max(255).required('This field is required'),
    img: yup
      .mixed()
      .required('This field is required')
      .test('format', 'Not Image valide images.', (value: any) =>
        !value?.name && value?.includes('http')
          ? true
          : !value || (value && SUPPORTED_FORMATS.includes(value.type)),
      )
      .test('format', 'Image Must be within 1 Mb.', (value: any) =>
        !value?.name && value?.includes('http') ? true : !value || value?.size <= 1000000,
      ),
  });
