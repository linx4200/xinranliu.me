import Image from 'next/image';
import profile from './profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Availability } from '@/components/Availability';
import { getDictionary } from '@/dictionaries';

const calendarUrl = `https://calendar.google.com/calendar/u/0?cid=${process.env.GOOGLE_CALENDAR_ID}`;

const CTAButton = ({ text, link, type = 'normal' }: { text: string, link?: string, type?: 'primary' | 'normal' }) => {
  const isDisabled = !link;
  const variantClassName = type === 'normal'
    ? 'border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 bg-white dark:bg-surface-strong'
    : 'border-transparent bg-primary text-white';
  const hoverClassName = isDisabled
    ? 'cursor-not-allowed opacity-60'
    : type === 'normal'
      ? 'hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-700'
      : 'hover:bg-primary/90';
  /* Responsive button: full width on mobile, auto on desktop */
  const responsiveClassName = 'w-full md:w-auto';
  const sharedClassName = `inline-flex justify-center px-5 py-3 md:py-2 rounded-full border text-sm font-medium tracking-wide transition-all duration-200 ease-out ${variantClassName} ${hoverClassName} ${responsiveClassName}`;

  if (isDisabled) {
    return (
      <button type="button" className={sharedClassName} disabled aria-disabled>
        {text}
      </button>
    );
  }

  return (
    <a
      href={link}
      target='_blank'
      rel="noreferrer noopener"
      className={sharedClassName}
    >
      {text}
    </a>
  );
};

export default async function Page({ params }: PageProps<'/[lang]'>) {

  const { lang } = await params;
  const dict = await getDictionary(lang);

  const statusCopies = dict.contact.status;
  const summaries = {
    free: statusCopies.free,
    busy: statusCopies.busy,
    available: statusCopies.available,
    booked: statusCopies.booked,
    nextAvailable: statusCopies.nextAvailable,
    unknown: statusCopies.unknown,
  };

  return (
    <div className="px-5 lg:px-0">
      <section
        className="
          flex flex-col-reverse md:flex-row items-center md:justify-between md:items-start gap-5
          mt-10 md:mt-20"
        aria-labelledby="contact-hero-heading"
        dev-mode="tailwind"
      >
        <div className="text-center md:text-left w-full">
          <h1 id="contact-hero-heading" className="text-3xl md:text-5xl font-bold mb-5 leading-tight" dev-mode="tailwind">{dict.contact.hero.title}</h1>
          <p className="text-text-muted" dev-mode="tailwind">{dict.contact.hero.location}</p>
          <Availability summaries={summaries} calendarUrl={calendarUrl} />
        </div>
        <div className="relative w-[60%] md:w-[280px] aspect-square">
          <Image
            width={280}
            height={280}
            className='w-full h-auto rounded-full aspect-square object-cover'
            src={profile}
            alt="Portrait of Xinran Liu"
          />
          <a href='https://www.instagram.com/xinranwhatever' target='_blank' rel="noreferrer noopener" aria-label="Visit Xinran Liu on Instagram" className="
            absolute right-0 bottom-0 w-[60px] h-[60px] flex items-center justify-center
            rounded-[30%] bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]
          ">
            <FontAwesomeIcon icon={faInstagram} color='white' size="3x" />
          </a>
        </div>
      </section>

      <section className="mt-10 md:mt-20" aria-labelledby="professional-background-heading">
        <h2 id="professional-background-heading" className="text-xl md:text-2xl pb-5 border-b border-border border-solid font-bold">{dict.contact.sections.professionalBackground}</h2>

        <div className="flex flex-col md:flex-row md:justify-between mt-5 md:items-center gap-3" dev-mode="tailwind">
          <div>
            <h3 className="font-semibold mb-1 md:mb-2 text-lg md:text-base" dev-mode="tailwind">{dict.contact.links.linkedin.title}</h3>
            <p className="text-text-muted text-sm md:text-base" dev-mode="tailwind">{dict.contact.links.linkedin.description}</p>
          </div>
          <CTAButton text={dict.contact.links.linkedin.button} link="https://www.linkedin.com/in/xinran-liu-502897318" />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between mt-5 md:items-center gap-3" dev-mode="tailwind">
          <div>
            <h3 className="font-semibold mb-1 md:mb-2 text-lg md:text-base" dev-mode="tailwind">{dict.contact.links.github.title}</h3>
            <p className="text-text-muted text-sm md:text-base" dev-mode="tailwind">{dict.contact.links.github.description}</p>
          </div>
          <CTAButton text={dict.contact.links.github.button} link="https://github.com/linx4200" />
        </div>
      </section>

      <section className="mt-10 md:mt-20 mb-20 md:mb-0" aria-labelledby="hire-contact-heading">
        <h2 id="hire-contact-heading" className="text-xl md:text-2xl pb-5 border-b border-border border-solid font-bold">{dict.contact.sections.hireOrContact}</h2>

        <div className="flex flex-col md:flex-row md:justify-between mt-5 md:items-center gap-3" dev-mode="tailwind">
          <div>
            <h3 className="font-semibold mb-1 md:mb-2 text-lg md:text-base" dev-mode="tailwind">{dict.contact.links.upwork.title}</h3>
            <p className="text-text-muted text-sm md:text-base" dev-mode="tailwind">{dict.contact.links.upwork.description}</p>
          </div>
          <CTAButton text={dict.contact.links.upwork.button} link="https://www.upwork.com/freelancers/~01ac39294b49d6fc88?mp_source=share" type="primary" />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between mt-5 md:items-center gap-3" dev-mode="tailwind">
          <div>
            <h3 className="font-semibold mb-1 md:mb-2 text-lg md:text-base" dev-mode="tailwind">{dict.contact.links.fiverr.title}</h3>
            <p className="text-text-muted text-sm md:text-base" dev-mode="tailwind">{dict.contact.links.fiverr.description}</p>
          </div>
          <CTAButton text={dict.contact.links.fiverr.button} type="primary" />
        </div>
      </section>
    </div>
  );
}
