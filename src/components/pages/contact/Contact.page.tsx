'use client';
import React from 'react';
import ContactForm from './ContactForm';

const ContactPage = () => {
  return (
    <div className="rm-commonContainer">
      <div className="max-w-[700px] mx-auto my-10 space-y-10 md:space-y-16 md:my-16 xl:space-y-20">
        <ContactForm handleDataSubmit={() => undefined} isDataSubmiting={false} />
      </div>
    </div>
  );
};

export default ContactPage;
