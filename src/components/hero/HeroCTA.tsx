import { FiArrowRight, FiCalendar } from 'react-icons/fi';

import { ButtonLink } from '@/components/common/Button';
import { routes } from '@/constants/routes';

export const HeroCTA = () => (
  <div className="flex flex-col gap-3 sm:flex-row">
    <ButtonLink icon={FiArrowRight} size="lg" to={routes.products} variant="primary">
      Explore cakes
    </ButtonLink>
    <ButtonLink
      icon={FiCalendar}
      iconPosition="left"
      size="lg"
      to={routes.contact}
      variant="secondary"
    >
      Plan an order
    </ButtonLink>
  </div>
);
