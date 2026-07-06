import { cx } from '@/utils/formatters';

export interface GoldenWheatProps {
  className?: string;
}

export const GoldenWheat = ({ className }: GoldenWheatProps) => (
  <svg
    aria-hidden="true"
    className={cx('pointer-events-none text-gold', className)}
    fill="none"
    viewBox="0 0 120 180"
  >
    <path d="M28 168C67 119 76 66 74 12" stroke="currentColor" strokeWidth="2" />
    <path d="M52 137C32 132 21 121 16 106C34 108 48 119 52 137Z" fill="currentColor" />
    <path d="M65 112C44 105 35 92 33 77C51 82 63 95 65 112Z" fill="currentColor" />
    <path d="M72 84C54 74 49 59 51 45C67 52 75 68 72 84Z" fill="currentColor" />
    <path d="M74 55C62 43 61 28 66 16C79 27 82 43 74 55Z" fill="currentColor" />
    <path d="M56 137C76 134 90 123 97 108C77 110 62 121 56 137Z" fill="currentColor" />
    <path d="M68 111C88 104 99 91 102 76C83 81 71 94 68 111Z" fill="currentColor" />
    <path d="M74 83C92 73 98 58 97 44C80 51 72 67 74 83Z" fill="currentColor" />
  </svg>
);
