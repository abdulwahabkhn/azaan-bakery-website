import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { FaWhatsapp } from 'react-icons/fa';

import { Button } from '@/components/common/Button';
import { formatRupees } from '@/utils/cart';
import { cx } from '@/utils/formatters';
import { contactFormSchema, type ContactFormValues } from '@/utils/validation';

type SubmissionState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

export interface ContactFormProps {
  initialOrderDetails?: string;
  cartTotal?: number;
}

const fieldClassName =
  'focus-ring w-full rounded-xl border border-border bg-surface px-4 py-3 text-ink placeholder:text-muted/70';

const whatsappNumber = '923061923382';

export const ContactForm = ({ cartTotal = 0, initialOrderDetails = '' }: ContactFormProps) => {
  const [submission, setSubmission] = useState<SubmissionState>({ status: 'idle' });
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      orderDetails: initialOrderDetails,
      optionalMessage: '',
      companyWebsite: '',
    },
  });

  useEffect(() => {
    if (initialOrderDetails) {
      setValue('orderDetails', initialOrderDetails, { shouldValidate: false });
    }
  }, [initialOrderDetails, setValue]);

  const onSubmit = (values: ContactFormValues): void => {
    try {
      const total = cartTotal > 0 ? formatRupees(cartTotal) : 'To be confirmed';
      const optionalMessage = values.optionalMessage
        ? `\n\nMessage: ${values.optionalMessage}`
        : '';
      const hasOrderHeading = /^Order Details:/i.test(values.orderDetails.trim());
      const hasOrderTotal = /^Total:/im.test(values.orderDetails);
      const message = [
        'Assalam o Alaikum Azaan Bakers,',
        '',
        'I want to place an order.',
        '',
        `Name: ${values.name}`,
        `Phone: ${values.phone}`,
        `Address: ${values.address}`,
        '',
        ...(hasOrderHeading ? [] : ['Order:']),
        values.orderDetails,
        ...(hasOrderTotal ? [] : ['', `Total: ${total}`]),
        optionalMessage,
      ].join('\n');
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setSubmission({
        status: 'success',
        message: 'Your order is ready in WhatsApp.',
      });
    } catch {
      setSubmission({
        status: 'error',
        message: 'WhatsApp could not be opened. Please try again.',
      });
    }
  };

  const submitForm = (event: FormEvent<HTMLFormElement>): void => {
    void handleSubmit(onSubmit)(event);
  };

  return (
    <form
      className="rounded-3xl border border-border bg-page p-6 shadow-luxury md:p-8"
      data-captcha-ready="true"
      onSubmit={submitForm}
    >
      <div className="sr-only" aria-hidden="true">
        <label>
          Company website
          <input autoComplete="off" tabIndex={-1} {...register('companyWebsite')} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-cocoa" htmlFor="name">
            Name
          </label>
          <input
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            className={fieldClassName}
            id="name"
            type="text"
            {...register('name')}
          />
          {errors.name ? (
            <p className="mt-2 text-sm text-red-700" id="name-error">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-cocoa" htmlFor="phone">
            Phone
          </label>
          <input
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            aria-invalid={Boolean(errors.phone)}
            autoComplete="tel"
            className={fieldClassName}
            id="phone"
            type="tel"
            {...register('phone')}
          />
          {errors.phone ? (
            <p className="mt-2 text-sm text-red-700" id="phone-error">
              {errors.phone.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-cocoa" htmlFor="address">
          Address
        </label>
        <textarea
          aria-describedby={errors.address ? 'address-error' : undefined}
          aria-invalid={Boolean(errors.address)}
          autoComplete="street-address"
          className={cx(fieldClassName, 'min-h-24 resize-y')}
          id="address"
          {...register('address')}
        />
        {errors.address ? (
          <p className="mt-2 text-sm text-red-700" id="address-error">
            {errors.address.message}
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-cocoa" htmlFor="orderDetails">
          Order Details
        </label>
        <textarea
          aria-describedby={errors.orderDetails ? 'order-details-error' : undefined}
          aria-invalid={Boolean(errors.orderDetails)}
          className={cx(fieldClassName, 'min-h-52 resize-y')}
          id="orderDetails"
          {...register('orderDetails')}
        />
        {errors.orderDetails ? (
          <p className="mt-2 text-sm text-red-700" id="order-details-error">
            {errors.orderDetails.message}
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-cocoa" htmlFor="optionalMessage">
          Optional message
        </label>
        <textarea
          aria-describedby={errors.optionalMessage ? 'optional-message-error' : undefined}
          aria-invalid={Boolean(errors.optionalMessage)}
          className={cx(fieldClassName, 'min-h-28 resize-y')}
          id="optionalMessage"
          {...register('optionalMessage')}
        />
        {errors.optionalMessage ? (
          <p className="mt-2 text-sm text-red-700" id="optional-message-error">
            {errors.optionalMessage.message}
          </p>
        ) : null}
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          disabled={isSubmitting}
          icon={FaWhatsapp}
          iconPosition="left"
          type="submit"
          variant="gold"
        >
          Place Order on WhatsApp
        </Button>
        <div aria-live="polite" className="min-h-6 text-sm">
          {submission.status === 'success' || submission.status === 'error' ? (
            <p className={submission.status === 'success' ? 'text-sage' : 'text-red-700'}>
              {submission.message}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
};
