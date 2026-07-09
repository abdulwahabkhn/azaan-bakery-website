import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

import { ButtonAnchor } from '@/components/common/Button';
import { brandSocialLinks, businessInfo } from '@/constants/brand';
import { env } from '@/config/env';

const details = [
  {
    label: 'Studio',
    value: businessInfo.address,
    icon: FiMapPin,
  },
  {
    label: 'Phone',
    value: businessInfo.phone,
    icon: FiPhone,
  },
  {
    label: 'Email',
    value: businessInfo.email,
    icon: FiMail,
  },
] as const;

export const ContactDetails = () => (
  <aside className="space-y-5">
    <div className="rounded-3xl border border-border bg-page p-7 shadow-luxury">
      <h2 className="font-display text-3xl text-cocoa">Business information</h2>
      <div className="mt-7 space-y-5">
        {details.map(({ icon: Icon, label, value }) => (
          <div className="flex gap-4" key={label}>
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-light-blue text-primary">
              <Icon aria-hidden="true" className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
              <p className="mt-1 break-words text-sm font-semibold text-cocoa [overflow-wrap:anywhere]">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Follow us</p>
        <div className="mt-3 flex gap-3">
          {brandSocialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              aria-label={label}
              className="focus-ring grid size-11 place-items-center rounded-full border border-gold/45 bg-warm-white text-navy transition hover:border-primary hover:bg-light-blue hover:text-navy"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon aria-hidden="true" className="size-5" />
            </a>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <ButtonAnchor
          href={`https://wa.me/${env.whatsappNumber}`}
          icon={FaWhatsapp}
          iconPosition="left"
          rel="noopener noreferrer"
          target="_blank"
          variant="gold"
        >
          WhatsApp
        </ButtonAnchor>
      </div>
    </div>

    <div className="rounded-3xl border border-primary/20 bg-ink p-7 text-white shadow-luxury">
      <h2 className="font-display text-3xl">Opening hours</h2>
      <ul className="mt-5 space-y-3 text-sm text-ivory/74">
        {businessInfo.hours.map((hour) => (
          <li key={hour}>{hour}</li>
        ))}
      </ul>
    </div>
  </aside>
);
