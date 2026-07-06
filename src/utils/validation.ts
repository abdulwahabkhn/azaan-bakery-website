import { z } from 'zod';

const honeypotSchema = z.string().max(0, 'Submission blocked.').optional().or(z.literal(''));

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'Name should stay under 80 characters.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a phone number.')
    .max(24, 'Phone number is too long.'),
  address: z
    .string()
    .trim()
    .min(5, 'Please enter a delivery address.')
    .max(300, 'Address should stay under 300 characters.'),
  orderDetails: z
    .string()
    .trim()
    .min(5, 'Please add your order details.')
    .max(3000, 'Order details should stay under 3000 characters.'),
  optionalMessage: z.string().trim().max(900, 'Message should stay under 900 characters.'),
  companyWebsite: honeypotSchema,
});

export const newsletterSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.').max(120),
  companyWebsite: honeypotSchema,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
