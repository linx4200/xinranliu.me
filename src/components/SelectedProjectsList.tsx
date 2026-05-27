import { ProjectCard } from '@/components/ProjectCard';
import type { Dictionary } from '@/dictionaries';
import { getSelectedProjects } from '@/services/projects';

export const SelectedProjectsList = ({ lang, copy }: { lang: string, copy: Dictionary['ui']['projects'] }) => {
  const selectedProjects = getSelectedProjects(lang);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10 px-4 lg:px-0" role="list" dev-mode="tailwind">
      {selectedProjects.map(({ title, desc, github, image, hoveredImage }) => (
        <div key={title} className="w-full max-w-md lg:max-w-none mx-auto">
          <ProjectCard title={title} desc={desc} github={github} image={image} hoveredImage={hoveredImage} role="listitem" copy={copy} />
        </div>
      ))}
    </div>
  );
};
