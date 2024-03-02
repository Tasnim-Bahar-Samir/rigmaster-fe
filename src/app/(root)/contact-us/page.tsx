import ContactPage from '@/components/pages/contact/Contact.page';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Rigmaster',
};

const ContactUs = () => {
  return (
    <div>
      <ContactPage />
    </div>
  );
};

export default ContactUs;
