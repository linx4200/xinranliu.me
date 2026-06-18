'use client';

import { useMemo, useState } from 'react';

import type { ProofBingoLineId } from '@/data/proof-bingo';
import type {
  LocalizedProofBingoCompletionActions,
  LocalizedProofBingoCompletionSummaries,
  LocalizedProofBingoTile,
} from '@/services/proof-bingo';

type ProofBingoProps = {
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
      className="mx-auto w-full max-w-[min(88vw,22rem)] text-center"
      aria-label="Proof Bingo"
      data-dev-mode-react-name="ProofBingo"
      dev-mode="tailwind"
    >
      <div
        className="grid grid-cols-3 gap-2"
        dev-mode="tailwind"
      >
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            aria-pressed={selectedTileIds.has(tile.id)}
            disabled={Boolean(completedLineId)}
            onClick={() => handleTileToggle(tile.id)}
            className={[
              'aspect-square cursor-pointer rounded-lg border px-2 text-[0.7rem] font-medium leading-tight transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-[0.8rem]',
              'hover:border-primary hover:bg-primary/10 hover:text-primary hover:ring-2 hover:ring-primary/20',
              'disabled:cursor-default disabled:hover:ring-0',
              selectedTileIds.has(tile.id)
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border bg-surface text-text dark:text-primary',
              completedTileIds.has(tile.id) ? 'border-primary ring-2 ring-primary/25' : '',
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
