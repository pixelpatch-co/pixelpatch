
"use server";

import { z } from "zod";
import { Resend } from "resend";
import ContactFormEmail from "@/components/contact-form-email";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  serviceType: z.string({ required_error: "Please select a service type." }),
  shippingMethod: z.string().optional(),
  otherShippingMethod: z.string().optional(),
  shippingCity: z.string().optional(),
  remoteTool: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
}).refine(data => {
  if (data.serviceType === 'Mail-in Device') {
    return !!data.shippingMethod;
  }
  return true;
}, {
  message: "Please select a shipping method.",
  path: ["shippingMethod"],
}).refine(data => {
  if (data.shippingMethod === 'Other') {
    return !!data.otherShippingMethod && data.otherShippingMethod.length > 2;
  }
  return true;
}, {
  message: "Please specify your shipping method (at least 3 characters).",
  path: ["otherShippingMethod"],
}).refine(data => {
  if (data.serviceType === 'Mail-in Device' && data.shippingMethod === 'EasyBox') {
    return !!data.shippingCity;
  }
  return true;
}, {
  message: "Please select a shipping city.",
  path: ["shippingCity"],
}).refine(data => {
    if (data.serviceType === 'Remote Assistance') {
        return !!data.remoteTool;
    }
    return true;
}, {
    message: "Please select a remote assistance method.",
    path: ["remoteTool"],
});


export async function submitContactForm(values: unknown) {
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors.map(e => e.message).join(', ');
    return {
      success: false,
      message: `Invalid form data: ${errorMessages}`,
    };
  }

  const { name, email, serviceType, message, shippingCity, shippingMethod, otherShippingMethod, remoteTool } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: 'PixelPatch Contact Form <onboarding@resend.dev>',
      to: ['contact.pixelpatch@gmail.com'],
      subject: `New message from ${name} - ${serviceType}`,
      reply_to: email,
      react: React.createElement(ContactFormEmail, { 
        name, 
        email, 
        serviceType, 
        message, 
        shippingCity,
        shippingMethod,
        otherShippingMethod,
        remoteTool
      }),
    });

    if (error) {
      console.error("Error sending email with Resend:", error);
      const errorMessage = error.message || JSON.stringify(error, null, 2);
      return {
        success: false,
        message: `API Error: ${errorMessage}`,
      };
    }

    return { 
      success: true, 
      message: "Thank you for your message! We will get back to you soon." 
    };

  } catch (error) {
    console.error("Caught an exception in submitContactForm:", error);
    let errorMessage = "An unexpected server error occurred. Please try again later.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null) {
      errorMessage = JSON.stringify(error, null, 2);
    }
    return {
      success: false,
      message: `Server Error: ${errorMessage}`,
    };
  }
}
