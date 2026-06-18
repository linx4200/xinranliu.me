'use client';

import { useMemo, useState, type ReactNode } from 'react';

import type { ProofBingoLineId } from '@/data/proof-bingo';
import type {
  LocalizedProofBingoCompletionActions,
  LocalizedProofBingoCompletionSummaries,
  LocalizedProofBingoTile,
} from '@/services/proof-bingo';

type ProofBingoProps = {
  heading: ReactNode;
  tiles: LocalizedProofBingoTile[];
  completionActions: LocalizedProofBingoCompletionActions;
  completionSummaries: LocalizedProofBingoCompletionSummaries;
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
  heading,
  tiles,
}: ProofBingoProps) {
  const [selectedTileIds, setSelectedTileIds] = useState<Set<string>>(() => new Set());
  const [completedLineId, setCompletedLineId] = useState<ProofBingoLineId | null>(null);

  const tileIds = useMemo(() => tiles.map((tile) => tile.id), [tiles]);
  const completedLine = WINNING_LINES.find((line) => line.id === completedLineId);
  const completedTileIds = new Set(completedLine?.indexes.map((index) => tileIds[index]) ?? []);

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
      className="mx-auto w-full max-w-[min(92vw,24rem)] overflow-hidden rounded-lg border-2 border-[#17805b] bg-[#f7f2e5] text-center text-[#17805b] dark:border-[#4fc08d] dark:bg-[#151a17] dark:text-[#7ee0ad]"
      aria-label="Proof Bingo"
      data-dev-mode-react-name="ProofBingo"
      dev-mode="tailwind"
    >
      <div className="border-b-2 border-[#17805b] bg-[#17805b] px-4 py-2 text-[#f7f2e5] dark:border-[#4fc08d] dark:bg-[#0f5139] dark:text-[#d9ffe8]" dev-mode="tailwind">
        {heading}
      </div>

      <div
        className="grid grid-cols-3 border-t-0 border-[#17805b] dark:border-[#4fc08d]"
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
              'aspect-square cursor-pointer border-[#17805b] px-2 text-[0.75rem] font-black leading-tight transition-colors focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#0b5f43] sm:text-[0.95rem]',
              index % 3 === 2 ? '' : 'border-r-2',
              index < 6 ? 'border-b-2' : '',
              'hover:bg-[#17805b] hover:text-[#f7f2e5] hover:ring-2 hover:ring-inset hover:ring-[#0b5f43]',
              'disabled:cursor-default disabled:hover:ring-0',
              selectedTileIds.has(tile.id)
                ? 'bg-[#17805b]/15 text-[#0b5f43] dark:bg-[#4fc08d]/20 dark:text-[#bdf8d1]'
                : 'bg-[#f7f2e5] text-[#17805b] dark:bg-[#151a17] dark:text-[#7ee0ad]',
              completedTileIds.has(tile.id) ? 'bg-[#17805b] text-[#f7f2e5] ring-4 ring-inset ring-[#0b5f43] dark:bg-[#4fc08d] dark:text-[#102016]' : '',
            ].join(' ')}
            dev-mode="tailwind"
          >
            <span dev-mode="tailwind">{tile.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
