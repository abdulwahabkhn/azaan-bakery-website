import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { FiSend } from 'react-icons/fi';

import { Button } from '@/components/common/Button';
import { contactService } from '@/services/contactService';
import { cx } from '@/utils/formatters';
import { newsletterSchema, type NewsletterFormValues } from '@/utils/validation';

type SubmissionState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

export interface NewsletterFormProps {
  compact?: boolean;
}

export const NewsletterForm = ({ compact = false }: NewsletterFormProps) => {
  const [submission, setSubmission] = useState<SubmissionState>({ status: 'idle' });
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      companyWebsite: '',
    },
  });

  const onSubmit = async (values: NewsletterFormValues): Promise<void> => {
    setSubmission({ status: 'loading' });
    const response = await contactService.subscribe(values);

    if (!response.ok) {
      setSubmission({ status: 'error', message: response.error.message });
      return;
    }

    reset();
    setSubmission({
      status: 'success',
      message: 'You are on the tasting list.',
    });
  };

  const submitForm = (event: FormEvent<HTMLFormElement>): void => {
    void handleSubmit(onSubmit)(event);
  };

  return (
    <form
      className={cx('w-full', compact ? 'space-y-3' : 'mx-auto max-w-xl space-y-4')}
      onSubmit={submitForm}
    >
      <div className="sr-only" aria-hidden="true">
        <label>
          Company website
          <input autoComplete="off" tabIndex={-1} {...register('companyWebsite')} />
        </label>
      </div>
      <div className={cx('flex gap-3', compact ? 'flex-col' : 'flex-col sm:flex-row')}>
        <div className="min-w-0 flex-1">
          <label
            className="sr-only"
            htmlFor={compact ? 'footer-newsletter-email' : 'newsletter-email'}
          >
            Email address
          </label>
          <input
            aria-describedby={
              errors.email
                ? compact
                  ? 'footer-newsletter-email-error'
                  : 'newsletter-email-error'
                : undefined
            }
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            className="focus-ring h-14 w-full rounded-full border border-border bg-surface px-5 text-ink placeholder:text-muted/70"
            id={compact ? 'footer-newsletter-email' : 'newsletter-email'}
            placeholder="Email address"
            type="email"
            {...register('email')}
          />
          {errors.email ? (
            <p
              className="mt-2 text-sm text-red-700"
              id={compact ? 'footer-newsletter-email-error' : 'newsletter-email-error'}
            >
              {errors.email.message}
            </p>
          ) : null}
        </div>
        <Button
          className={compact ? 'w-full' : 'sm:w-auto'}
          disabled={isSubmitting || submission.status === 'loading'}
          icon={FiSend}
          type="submit"
          variant="gold"
        >
          {submission.status === 'loading' ? 'Sending' : 'Join'}
        </Button>
      </div>
      <div aria-live="polite" className="min-h-6">
        {submission.status === 'success' || submission.status === 'error' ? (
          <p
            className={cx(
              'text-sm',
              submission.status === 'success' ? 'text-sage' : 'text-red-700',
            )}
          >
            {submission.message}
          </p>
        ) : null}
      </div>
    </form>
  );
};
