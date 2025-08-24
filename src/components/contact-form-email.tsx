
import React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  serviceType: string;
  message: string;
  shippingCity?: string;
  shippingMethod?: string;
  otherShippingMethod?: string;
  remoteTool?: string;
}

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({ name, email, serviceType, message, shippingCity, shippingMethod, otherShippingMethod, remoteTool }) => {
  return (
    <div>
      <h1>New Contact Form Submission</h1>
      <p>
        You have received a new message from your website contact form.
      </p>
      <h2>Sender Details:</h2>
      <ul>
        <li><strong>Name:</strong> {name}</li>
        <li><strong>Email:</strong> {email}</li>
        <li><strong>Service Type:</strong> {serviceType}</li>
      </ul>

      {serviceType === 'Remote Assistance' && remoteTool && (
        <>
          <h2>Remote Assistance Details:</h2>
          <ul>
            <li><strong>Preferred Method:</strong> {remoteTool}</li>
          </ul>
        </>
      )}

      {serviceType === 'Mail-in Device' && (
        <>
          <h2>Shipping Details:</h2>
          <ul>
            <li><strong>Method:</strong> {shippingMethod === 'Other' ? otherShippingMethod : shippingMethod}</li>
            {shippingCity && <li><strong>Shipping From:</strong> {shippingCity}</li>}
          </ul>
        </>
      )}

      <h2>Message:</h2>
      <p>{message}</p>
    </div>
  );
};

export default ContactFormEmail;
