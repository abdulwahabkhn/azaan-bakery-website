import { cx } from '@/utils/formatters';

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  headingLevel?: 'h1' | 'h2';
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  headingLevel = 'h2',
}: SectionHeadingProps) => {
  const Heading = headingLevel;

  return (
    <div
      className={cx(
        'max-w-3xl',
        align === 'center' &&
          'mx-auto text-center [&_.eyebrow]:justify-center [&_.eyebrow]:before:hidden',
        className,
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <Heading
        className="mt-5 text-balance text-4xl text-cocoa md:text-5xl lg:text-6xl"
        data-heading="true"
      >
        {title}
      </Heading>
      {description ? <p className="mt-5 text-base text-muted md:text-lg">{description}</p> : null}
    </div>
  );
};
