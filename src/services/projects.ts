import { projects } from '@/data/projects';
import { resolveLocale } from '@/dictionaries';

export interface LocalizedProject {
  selected?: boolean;
  title: string;
  desc: string;
  tags?: string[];
  site?: string;
  github?: string;
  image?: string;
  hoveredImage?: string;
}

export const getAllProjects = (lang: string): LocalizedProject[] => {
  const resolvedLang = resolveLocale(lang);
  return projects.map((project) => ({
    ...project,
    title: project.title[resolvedLang],
    desc: project.desc[resolvedLang],
  }));
};

export const getSelectedProjects = (lang: string): LocalizedProject[] => {
  const resolvedLang = resolveLocale(lang);
  return getAllProjects(resolvedLang).filter((project) => project.selected);
};