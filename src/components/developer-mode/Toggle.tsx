'use client';

import { useDeveloperModeStore } from '@/store/useDeveloperModeStore';

export const DevModeToggle = () => {
  const isEnabled = useDeveloperModeStore(state => state.isEnabled);
  const setIsEnabled = useDeveloperModeStore(state => state.toggle);
  const activeTab = useDeveloperModeStore(state => state.mode);
  const setActiveTab = useDeveloperModeStore(state => state.updateMode);

  const tabs = [
    {
      id: 'react',
      label: 'React',
    },
    {
      id: 'tailwind',
      label: 'Tailwind CSS',
    },
    // {
    //   id: 'nextjs',
    //   label: 'Next.js',
    // },
  ] as const;

  const handleToggle = () => setIsEnabled();

  // todo: only show this when it's not mobile device

  return (
    <div className={`hidden lg:block ${isEnabled ? '' : 'pb-16'}`} data-dev-mode-react-name="DevModeToggle">
      <div className="mt-6 flex items-center justify-center gap-3" dev-mode="tailwind">
        <span className="inline font-bold">👀&nbsp;&nbsp;&nbsp;Curious how this site is built?</span>
        <button
          type="button"
          role="switch"
          aria-label="Toggle developer mode"
          aria-checked={isEnabled}
          onClick={handleToggle}
          className={`inline-flex h-6 w-10 items-center rounded-full cursor-pointer border transition-colors duration-150 ${isEnabled ? 'bg-primary border-primary' : 'bg-stone-200 border-stone-300 dark:bg-stone-700 dark:border-stone-600'}`}
        >
          <span className="sr-only">Developer mode</span>
          <span
            className={`size-5 rounded-full bg-white shadow transition-transform duration-150 ${isEnabled ? 'translate-x-4' : 'translate-x-0.5'}`}
          >
          </span>
        </button>
      </div>

      {isEnabled && (<div className="mt-6 h-10">
        <div
          className="inline-flex overflow-hidden rounded-full border border-stone-100 bg-stone-100 dark:border-stone-800 dark:bg-stone-800"
          role="tablist"
          aria-label="Developer stack"
        >
          {tabs.map(tab => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1 text-sm transition-colors duration-150 ${isActive ? 'bg-white text-stone-900 dark:bg-stone-700 dark:text-stone-100' : 'text-stone-500 hover:bg-white/60 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-stone-700/60 dark:hover:text-stone-200 hover:cursor-pointer'}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>)}
    </div>
  );
};
