import { ProjectCard } from '@/components/ProjectCard';
import type { Dictionary } from '@/dictionaries';
import type { LocalizedProject } from '@/services/projects';

export const ProjectGrid = ({ projects, copy }: { projects: LocalizedProject[], copy: Dictionary['ui']['projects'] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 px-4 lg:px-0" role="list" dev-mode="tailwind" data-dev-mode-react-name="ProjectGrid">
      {projects.map(project => (
        <div key={project.id} className="w-full max-w-md lg:max-w-none mx-auto" role="listitem">
          <ProjectCard {...project} copy={copy} />
        </div>
      ))}
    </div>
  );
};
