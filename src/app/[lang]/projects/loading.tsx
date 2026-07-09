import { ProjectGridSkeleton } from '@/components/ProjectGridSkeleton';

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-surface-strong/70 ${className ?? ''}`} />
);

export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <section className="mt-10 lg:mt-20" aria-labelledby="projects-loading-heading">
        <SkeletonBlock className="ml-4 h-7 w-28 lg:mx-auto lg:h-8" />
        <h2 id="projects-loading-heading" className="sr-only">
          Loading Projects
        </h2>
        <ProjectGridSkeleton />
      </section>
    </div>
  );
}
