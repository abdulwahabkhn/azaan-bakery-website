import { FiArrowRight, FiCalendar } from 'react-icons/fi';

import { ButtonAnchor, ButtonLink } from '@/components/common/Button';
import { routes } from '@/constants/routes';

export const HeroCTA = () => (
  <div className="flex flex-col gap-3 sm:flex-row">
    <ButtonAnchor href="#categories" icon={FiArrowRight} size="lg" variant="primary">
      Explore categories
    </ButtonAnchor>
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
