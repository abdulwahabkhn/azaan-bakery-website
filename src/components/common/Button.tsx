import { Link, type LinkProps } from 'react-router-dom';

import { cx } from '@/utils/formatters';

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import type { IconType } from 'react-icons';

type ButtonVariant = 'primary' | 'secondary' | 'cyan' | 'ghost' | 'gold' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStyleProps {
  children: ReactNode;
  className?: string;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border border-gold bg-gold text-navy shadow-[0_14px_30px_rgb(212_175_55_/_0.3)] hover:border-gold-hover hover:bg-gold-hover hover:shadow-[0_20px_42px_rgb(212_175_55_/_0.4)]',
  secondary:
    'border border-gold/55 bg-navy text-white shadow-[0_12px_28px_rgb(7_31_61_/_0.24)] hover:border-gold hover:bg-navy-soft hover:shadow-[0_18px_38px_rgb(7_31_61_/_0.3)]',
  cyan: 'border border-primary bg-primary text-navy shadow-[0_12px_28px_rgb(34_184_240_/_0.22)] hover:border-primary-hover hover:bg-primary-hover hover:shadow-[0_18px_38px_rgb(34_184_240_/_0.3)]',
  ghost:
    'border border-gold/60 bg-warm-white/90 text-navy shadow-sm hover:border-primary hover:bg-white',
  gold: 'border border-gold bg-gold text-navy shadow-[0_14px_30px_rgb(212_175_55_/_0.3)] hover:border-gold-hover hover:bg-gold-hover hover:shadow-[0_20px_42px_rgb(212_175_55_/_0.42)]',
  dark: 'border border-gold/45 bg-navy text-white shadow-[0_14px_30px_rgb(7_31_61_/_0.26)] hover:border-primary hover:bg-navy-soft hover:shadow-[0_20px_42px_rgb(34_184_240_/_0.18)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-12 px-5 text-sm',
  lg: 'min-h-14 px-7 text-base',
};

const getButtonClasses = ({
  className,
  size = 'md',
  variant = 'primary',
}: Pick<ButtonStyleProps, 'className' | 'size' | 'variant'>): string =>
  cx(
    'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 will-change-transform hover:-translate-y-1 active:translate-y-0 focus-ring disabled:translate-y-0 disabled:cursor-not-allowed disabled:saturate-50 disabled:shadow-none disabled:opacity-65',
    sizeClasses[size],
    variantClasses[variant],
    className,
  );

const ButtonContent = ({
  children,
  icon: Icon,
  iconPosition = 'right',
}: Pick<ButtonStyleProps, 'children' | 'icon' | 'iconPosition'>) => (
  <>
    {Icon && iconPosition === 'left' ? (
      <Icon
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
      />
    ) : null}
    <span className="text-current">{children}</span>
    {Icon && iconPosition === 'right' ? (
      <Icon
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
      />
    ) : null}
  </>
);

export type ButtonProps = ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className,
  icon,
  iconPosition,
  size,
  type = 'button',
  variant,
  ...props
}: ButtonProps) => (
  <button className={getButtonClasses({ className, size, variant })} type={type} {...props}>
    <ButtonContent icon={icon} iconPosition={iconPosition}>
      {children}
    </ButtonContent>
  </button>
);

export type ButtonLinkProps = ButtonStyleProps & LinkProps;

export const ButtonLink = ({
  children,
  className,
  icon,
  iconPosition,
  size,
  variant,
  ...props
}: ButtonLinkProps) => (
  <Link className={getButtonClasses({ className, size, variant })} {...props}>
    <ButtonContent icon={icon} iconPosition={iconPosition}>
      {children}
    </ButtonContent>
  </Link>
);

export type ButtonAnchorProps = ButtonStyleProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export const ButtonAnchor = ({
  children,
  className,
  icon,
  iconPosition,
  size,
  variant,
  ...props
}: ButtonAnchorProps) => (
  <a className={getButtonClasses({ className, size, variant })} {...props}>
    <ButtonContent icon={icon} iconPosition={iconPosition}>
      {children}
    </ButtonContent>
  </a>
);
