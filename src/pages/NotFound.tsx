import { FiArrowLeft } from 'react-icons/fi';

import { ButtonLink } from '@/components/common/Button';
import { SEO } from '@/components/common/SEO';
import { routes } from '@/constants/routes';

const NotFound = () => (
  <>
    <SEO
      title="Page Not Found | Azaan Bakery"
      description="The requested Azaan Bakery page could not be found."
      canonicalPath="/404"
    />
    <section
      data-nav-theme="light"
      className="grid min-h-screen place-items-center bg-cream px-6 py-32 text-center"
    >
      <div className="max-w-xl">
        <p className="eyebrow justify-center before:hidden">404</p>
        <h1 className="mt-5 font-display text-5xl text-cocoa md:text-7xl">
          This cake left the case.
        </h1>
        <p className="mt-6 text-coffee/72">
          The page may have moved, or the order ticket was never written.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink icon={FiArrowLeft} iconPosition="left" to={routes.home} variant="primary">
            Return home
          </ButtonLink>
        </div>
      </div>
    </section>
  </>
);

export default NotFound;
