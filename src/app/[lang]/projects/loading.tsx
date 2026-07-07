import { Card } from '@/components/Card';

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-surface-strong/70 ${className ?? ''}`} />
);

const ProjectCardSkeleton = () => (
  <Card className="h-full" aria-hidden="true">
    <SkeletonBlock className="aspect-square w-full" />
    <div className="mt-5 space-y-3">
      <SkeletonBlock className="h-5 w-2/3" />
      <SkeletonBlock className="h-4 w-full" />
      <SkeletonBlock className="h-4 w-5/6" />
    </div>
    <div className="mt-5 flex flex-wrap gap-2">
      <SkeletonBlock className="h-6 w-16 rounded-full" />
      <SkeletonBlock className="h-6 w-20 rounded-full" />
      <SkeletonBlock className="h-6 w-14 rounded-full" />
    </div>
    <div className="mt-5 flex justify-end gap-4">
      <SkeletonBlock className="h-6 w-6" />
      <SkeletonBlock className="h-6 w-6" />
    </div>
  </Card>
);

export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <section className="mt-10 lg:mt-20" aria-labelledby="projects-loading-heading">
        <SkeletonBlock
          className="ml-4 h-7 w-28 lg:mx-auto lg:h-8"
        />
        <h2 id="projects-loading-heading" className="sr-only">
          Loading Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 px-4 lg:px-0" role="list">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`project-skeleton-${index}`} className="w-full max-w-md lg:max-w-none mx-auto" role="listitem">
              <ProjectCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
