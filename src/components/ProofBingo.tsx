'use client';

import { useMemo, useState } from 'react';

import Link from '@/components/Link';
import type { ProofBingoLineId } from '@/data/proof-bingo';
import type {
  LocalizedProofBingoCompletionActions,
  LocalizedProofBingoCompletionSummaries,
  LocalizedProofBingoTile,
} from '@/services/proof-bingo';

type ProofBingoProps = {
  title: string;
  tiles: LocalizedProofBingoTile[];
  completionActions: LocalizedProofBingoCompletionActions;
  completionSummaries: LocalizedProofBingoCompletionSummaries;
  projectCta: string;
  contactHref: string;
  projectsHref: string;
};

const WINNING_LINES = [
  { id: 'top-row', indexes: [0, 1, 2] },
  { id: 'middle-row', indexes: [3, 4, 5] },
  { id: 'bottom-row', indexes: [6, 7, 8] },
  { id: 'left-column', indexes: [0, 3, 6] },
  { id: 'center-column', indexes: [1, 4, 7] },
  { id: 'right-column', indexes: [2, 5, 8] },
  { id: 'main-diagonal', indexes: [0, 4, 8] },
  { id: 'anti-diagonal', indexes: [2, 4, 6] },
] as const satisfies readonly {
  id: ProofBingoLineId;
  indexes: readonly number[];
}[];

export function ProofBingo({
  title,
  tiles,
  completionActions,
  completionSummaries,
  projectCta,
  contactHref,
  projectsHref,
}: ProofBingoProps) {
  const [selectedTileIds, setSelectedTileIds] = useState<Set<string>>(() => new Set());
  const [completedLineId, setCompletedLineId] = useState<ProofBingoLineId | null>(null);

  const tileIds = useMemo(() => tiles.map((tile) => tile.id), [tiles]);
  const completedLine = WINNING_LINES.find((line) => line.id === completedLineId);
  const completedTileIds = new Set(completedLine?.indexes.map((index) => tileIds[index]) ?? []);
  const completionSummary = completedLineId ? completionSummaries[completedLineId].summary : null;

  const handleReset = () => {
    setSelectedTileIds(new Set());
    setCompletedLineId(null);
  };

  const handleTileToggle = (tileId: string) => {
    if (completedLineId) return;

    const nextSelectedTileIds = new Set(selectedTileIds);

    if (nextSelectedTileIds.has(tileId)) {
      nextSelectedTileIds.delete(tileId);
    } else {
      nextSelectedTileIds.add(tileId);
    }

    const nextCompletedLine = WINNING_LINES.find((line) =>
      line.indexes.every((index) => nextSelectedTileIds.has(tileIds[index])),
    );

    setSelectedTileIds(nextSelectedTileIds);
    setCompletedLineId(nextCompletedLine?.id ?? null);
  };

  return (
    <div
      className="mx-auto w-full overflow-hidden rounded-md border border-[#1a1b22]/70 bg-[#fffaf4] text-center text-[#1a1b22] dark:border-[#f1effa]/70 dark:bg-[#151313] dark:text-[#f1effa]"
      aria-label="Proof Bingo"
      data-dev-mode-react-name="ProofBingo"
      dev-mode="tailwind"
    >
      <div className="border-b border-[#1a1b22]/60 bg-[#fffaf4] px-4 py-2 text-[#4c4546] dark:border-[#f1effa]/60 dark:bg-[#151313] dark:text-[#cfc4c5]" dev-mode="tailwind">
        <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] sm:text-[0.62rem]" dev-mode="tailwind">
          {title}
        </p>
      </div>

      <div
        className="grid grid-cols-3 border-t-0 border-[#1a1b22]/60 dark:border-[#f1effa]/60"
        dev-mode="tailwind"
      >
        {tiles.map((tile, index) => (
          <button
            key={tile.id}
            type="button"
            aria-pressed={selectedTileIds.has(tile.id)}
            disabled={Boolean(completedLineId)}
            onClick={() => handleTileToggle(tile.id)}
            className={[
              'aspect-square cursor-pointer border-[#1a1b22]/60 px-2 text-[0.72rem] font-extrabold leading-tight transition-colors focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#b90538] sm:text-[0.88rem] dark:border-[#f1effa]/60',
              index % 3 === 2 ? '' : 'border-r',
              index < 6 ? 'border-b' : '',
              completedTileIds.has(tile.id)
                ? 'border-[#1a1b22]/80 bg-[#b90538] text-white dark:border-[#f1effa]/80 dark:bg-[#ffb2b7] dark:text-[#40000d]'
                : selectedTileIds.has(tile.id)
                  ? 'bg-[#b90538]/10 text-[#b90538] hover:bg-[#b90538]/8 hover:text-[#b90538] hover:ring-2 hover:ring-inset hover:ring-[#b90538]/30 dark:bg-[#f43f5e]/20 dark:text-[#ffb2b7] dark:hover:bg-[#f43f5e]/15 dark:hover:text-[#ffb2b7]'
                  : 'bg-[#fffaf4] text-[#1a1b22] hover:bg-[#b90538]/8 hover:text-[#b90538] hover:ring-2 hover:ring-inset hover:ring-[#b90538]/30 dark:bg-[#151313] dark:text-[#f1effa] dark:hover:bg-[#f43f5e]/15 dark:hover:text-[#ffb2b7]',
              'disabled:cursor-default disabled:hover:ring-0',
            ].join(' ')}
            dev-mode="tailwind"
          >
            <span dev-mode="tailwind">{tile.label}</span>
          </button>
        ))}
      </div>
      <div className="h-[8.75rem] border-t border-[#1a1b22]/60 px-4 py-3 dark:border-[#f1effa]/60" dev-mode="tailwind">
        {completionSummary ? (
          <div className="flex h-full flex-col justify-between gap-2 overflow-hidden" role="status" aria-live="polite" dev-mode="tailwind">
            <p className="overflow-y-auto text-sm font-medium leading-5" dev-mode="tailwind">{completionSummary}</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center" dev-mode="tailwind">
              <Link
                href={projectsHref}
                className="inline-flex min-h-9 items-center justify-center rounded-md border border-[#1a1b22] bg-[#1a1b22] px-3 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#fff9f1] transition-colors hover:bg-[#1a1b22]/85 dark:border-[#f1effa] dark:bg-[#f1effa] dark:text-[#151313] dark:hover:bg-[#f1effa]/85"
                dev-mode="tailwind"
              >
                {projectCta}
              </Link>
              <Link
                href={contactHref}
                className="inline-flex min-h-9 items-center justify-center rounded-md border border-[#1a1b22] px-3 text-[0.68rem] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[#1a1b22]/5 dark:border-[#f1effa] dark:hover:bg-[#f1effa]/10"
                dev-mode="tailwind"
              >
                {completionActions.cta}
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-9 items-center justify-center rounded-md px-3 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#4c4546] transition-colors hover:bg-[#1a1b22]/5 dark:text-[#cfc4c5] dark:hover:bg-[#f1effa]/10"
                dev-mode="tailwind"
              >
                {completionActions.reset}
              </button>
            </div>
          </div>
        ) : (
          <p className="flex h-full items-center justify-center text-xs font-semibold uppercase tracking-[0.16em] text-[#4c4546] dark:text-[#cfc4c5]" dev-mode="tailwind">
            {selectedTileIds.size}/3
          </p>
        )}
      </div>
    </div>
  );
}
