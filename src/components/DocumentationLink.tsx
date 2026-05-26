
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export const DocumentationLink = ({ ariaLabel }: { ariaLabel: string }) => {
  return (
    <a
      href="https://github.com/linx4200/xinran.liu/tree/main/specs"
      target="_blank"
      rel="noreferrer noopener"
      className="rounded-full p-2 hover:bg-surface-strong cursor-pointer flex items-center justify-center text-stone-900 dark:text-stone-300"
      aria-label={ariaLabel}
    >
      <FontAwesomeIcon icon={faBook} size="lg" />
    </a>
  );
};
