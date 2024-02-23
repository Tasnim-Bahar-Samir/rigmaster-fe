import { contactFormValidation } from '@/libs/validation/Contact.validation';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { FC } from 'react';

type ContactFormProps = {
  isDataSubmiting: boolean;
  handleDataSubmit: Function;
};
const ContactForm: FC<ContactFormProps> = ({ handleDataSubmit, isDataSubmiting }) => {
  const { handleChange, values, touched, errors, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: contactFormValidation,
    onSubmit: async (data: any) => {
      try {
        await handleDataSubmit(data);
        resetForm();
        enqueueSnackbar('Message sent successfully.', {
          variant: 'success',
        });
      } catch (err: any) {
        //   for (let key of err.errors) {
        //     toast({
        //       variant: 'destructive',
        //       description: `${key?.attr} - ${key?.detail}`,
        //     });
        //   }
      }
    },
  });
  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className="space-y-3 mb-5 text-center md:space-y-4 xl:mb-8 xl:space-y-5">
        <h1 className="text-lg font-semibold md:text-xl xl:text-2xl">Sent Your Message</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
          elementum tristique.
        </p>
      </div>
      <div className="space-y-4 xl:space-y-5">
        <TextField
          value={values.name}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && typeof errors.name === 'string' ? errors.name : ''}
          className="w-full"
          name="name"
          onChange={handleChange}
          label="Name"
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
        <TextField
          multiline
          rows={4}
          value={values.message}
          error={touched.message && Boolean(errors.message)}
          helperText={touched.message && typeof errors.message === 'string' ? errors.message : ''}
          className="w-full"
          name="message"
          onChange={handleChange}
          label="Message"
        />
        <button
          disabled={isDataSubmiting}
          type="submit"
          className="disabled:bg-slate-500 px-4 mt-3 gap-1 w-full py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4 xl:mt-5"
        >
          {isDataSubmiting ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
