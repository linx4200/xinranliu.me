
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export const DocumentationLink = ({ ariaLabel }: { ariaLabel: string }) => {
  return (
    <a
      href="https://github.com/linx4200/xinran.liu/tree/main/specs"
      target="_blank"
      rel="noreferrer noopener"
      className="flex size-10 items-center justify-center rounded-full hover:bg-surface-strong cursor-pointer"
      aria-label={ariaLabel}
    >
      <FontAwesomeIcon icon={faBook} size="lg" className='text-neutral-900 dark:text-neutral-300' />
    </a>
  );
};
