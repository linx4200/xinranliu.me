import { cacheLife } from 'next/cache';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { resolveLocale } from '@/dictionaries';

export interface LocalizedProject {
  id: number;
  selected?: boolean;
  title: string;
  desc: string;
  tags?: string[];
  site?: string;
  github?: string;
  image?: string;
  hoveredImage?: string;
}

type ProjectRow = {
  id: number;
  title_en: string;
  title_zh: string;
  desc_en: string;
  desc_zh: string;
  tags: string[] | null;
  site: string | null;
  github: string | null;
  image: string | null;
};

const projectColumns = [
  'id',
  'title_en',
  'title_zh',
  'desc_en',
  'desc_zh',
  'tags',
  'site',
  'github',
  'image',
].join(',');

const mapProjectRow = (project: ProjectRow, lang: ReturnType<typeof resolveLocale>): LocalizedProject => ({
  id: project.id,
  title: lang === 'zh' ? project.title_zh : project.title_en,
  desc: lang === 'zh' ? project.desc_zh : project.desc_en,
  tags: project.tags ?? undefined,
  site: project.site ?? undefined,
  github: project.github ?? undefined,
  image: project.image ?? undefined,
});

export const getAllProjects = async (lang: string): Promise<LocalizedProject[]> => {
  'use cache';
  cacheLife('hours');

  const resolvedLang = resolveLocale(lang);
  const supabase = getSupabaseServerClient();
  await sleep(1 * 60 * 1000);
  const { data, error } = await supabase
    .from('projects')
    .select(projectColumns)
    .limit(10)
    .order('id', { ascending: true })
    .overrideTypes<Array<ProjectRow>, { merge: false }>();

  if (error) {
    throw new Error(`Failed to load projects from Supabase: ${error.message}`);
  }

  return (data ?? []).map((project) => mapProjectRow(project, resolvedLang));
};

export const getSelectedProjects = async (lang: string): Promise<LocalizedProject[]> => {
  const projects = await getAllProjects(lang);
  const selectedProjects = projects.filter((project) => project.selected);

  return selectedProjects.length > 0 ? selectedProjects : projects.slice(0, 3);
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

