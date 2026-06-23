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

const TILE_BASE_CLASS = `
  relative flex aspect-square w-full cursor-pointer items-center justify-center
  overflow-hidden
  px-2
  border-[#1a1b22]/60 dark:border-[#f1effa]/60
  text-[0.72rem] font-extrabold leading-tight text-balance sm:text-[0.88rem]
  [overflow-wrap:anywhere]
  transition-[background-color,border-color,color,box-shadow,transform]
  duration-150 ease-out
  active:scale-[0.985]
  motion-reduce:transition-colors motion-reduce:active:scale-100
  focus-visible:relative focus-visible:z-10
  focus-visible:outline focus-visible:outline-2
  focus-visible:outline-offset-[-4px] focus-visible:outline-[#b90538]
`;

const TILE_COMPLETED_CLASS = `
  border-[#1a1b22]/80 dark:border-[#f1effa]/80
  bg-[#b90538] dark:bg-[#ffb2b7]
  text-white dark:text-[#40000d]
  ring-2 ring-inset ring-[#1a1b22] dark:ring-[#f1effa]
`;

const TILE_SELECTED_CLASS = `
  border-[#b90538]/80 dark:border-[#ffb2b7]/80
  bg-[#b90538]/10 dark:bg-[#f43f5e]/20
  text-[#b90538] dark:text-[#ffb2b7]
  ring-1 ring-inset ring-[#b90538]/30 dark:ring-[#ffb2b7]/30
  hover:bg-[#b90538]/8 dark:hover:bg-[#f43f5e]/15
  hover:text-[#b90538] dark:hover:text-[#ffb2b7]
  hover:ring-2 hover:ring-inset hover:ring-[#b90538]/30
`;

const TILE_IDLE_CLASS = `
  hover:bg-[#b90538]/8 dark:hover:bg-[#f43f5e]/15
  hover:text-[#b90538] dark:hover:text-[#ffb2b7]
  hover:ring-2 hover:ring-inset hover:ring-[#b90538]/30
`;

const ACTION_BASE_CLASS = `
  inline-flex min-h-11 items-center justify-center
  rounded-md px-3
  text-[0.68rem] font-bold uppercase tracking-[0.08em]
  transition-colors
`;

const PRIMARY_ACTION_CLASS = `
  border border-[#1a1b22] dark:border-[#f1effa]
  bg-[#1a1b22] dark:bg-[#f1effa]
  text-[#fff9f1] dark:text-[#151313]
  hover:bg-[#1a1b22]/85 dark:hover:bg-[#f1effa]/85
`;

const SECONDARY_ACTION_CLASS = `
  border border-[#1a1b22] dark:border-[#f1effa]
  hover:bg-[#1a1b22]/5 dark:hover:bg-[#f1effa]/10
`;

const RESET_ACTION_CLASS = `
  text-[#4c4546] dark:text-[#cfc4c5]
  hover:bg-[#1a1b22]/5 dark:hover:bg-[#f1effa]/10
`;

const COMPLETION_PANEL_BASE_CLASS = `
  absolute inset-0
  px-4 py-3
  transition-[opacity,transform] duration-200 ease-out
  motion-reduce:transform-none motion-reduce:transition-opacity
`;

const COMPLETION_PANEL_VISIBLE_CLASS = `
  translate-y-0 opacity-100
`;

const COMPLETION_PANEL_HIDDEN_CLASS = `
  pointer-events-none translate-y-1 opacity-0
`;

export function ProofBingo({
  title,
  tiles,
  completionActions,
  completionSummaries,
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
      className="
        w-full overflow-hidden rounded-md
        border border-[#1a1b22]/70 dark:border-[#f1effa]/70
        bg-[#fffaf4] dark:bg-[#151313]
        text-center text-[#1a1b22] dark:text-[#f1effa]
      "
      aria-label="Proof Bingo"
      data-dev-mode-react-name="ProofBingo"
      dev-mode="tailwind"
    >
      <div
        className="
          px-4 py-2
          border-b border-[#1a1b22]/60 dark:border-[#f1effa]/60
          text-[#4c4546] dark:text-[#cfc4c5]
        "
        dev-mode="tailwind"
      >
        <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] sm:text-[0.62rem]" dev-mode="tailwind">
          {title}
        </p>
      </div>

      <div className="grid grid-cols-3" dev-mode="tailwind">
        {tiles.map((tile, index) => (
          <button
            key={tile.id}
            type="button"
            aria-pressed={selectedTileIds.has(tile.id)}
            disabled={Boolean(completedLineId)}
            onClick={() => handleTileToggle(tile.id)}
            className={[
              TILE_BASE_CLASS,
              index % 3 === 2 ? '' : 'border-r',
              index < 6 ? 'border-b' : '',
              completedTileIds.has(tile.id)
                ? TILE_COMPLETED_CLASS
                : selectedTileIds.has(tile.id)
                  ? TILE_SELECTED_CLASS
                  : TILE_IDLE_CLASS,
              'disabled:cursor-default disabled:hover:ring-0',
            ].join(' ')}
            dev-mode="tailwind"
          >
            {tile.label}
            {/* Winning tiles need a non-color cue so the completed line remains clear for color-blind users. */}
            {completedTileIds.has(tile.id) ? (
              <span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-2 h-0.5 rounded-full bg-current"
              />
            ) : null}
          </button>
        ))}
      </div>

      <div
        className="
          relative h-[14.5rem] overflow-hidden sm:h-[9.25rem]
          border-t border-[#1a1b22]/60 dark:border-[#f1effa]/60
        "
        dev-mode="tailwind"
      >
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {completionSummary ?? ''}
        </p>

        <div
          className={[
            COMPLETION_PANEL_BASE_CLASS,
            'flex items-center justify-center',
            completionSummary ? COMPLETION_PANEL_HIDDEN_CLASS : COMPLETION_PANEL_VISIBLE_CLASS,
          ].join(' ')}
          aria-hidden={Boolean(completionSummary)}
          dev-mode="tailwind"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4c4546] dark:text-[#cfc4c5]" dev-mode="tailwind">
            {selectedTileIds.size}/3
          </p>
        </div>

        <div
          className={[
            COMPLETION_PANEL_BASE_CLASS,
            'flex flex-col justify-between gap-2 overflow-hidden',
            completionSummary ? COMPLETION_PANEL_VISIBLE_CLASS : COMPLETION_PANEL_HIDDEN_CLASS,
          ].join(' ')}
          aria-hidden={!completionSummary}
          dev-mode="tailwind"
        >
          {completionSummary ? (
            <>
              <p className="overflow-y-auto text-sm font-medium leading-5" dev-mode="tailwind">
                {completionSummary}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-center" dev-mode="tailwind">
                <Link
                  href="/projects"
                  className={`${ACTION_BASE_CLASS} ${PRIMARY_ACTION_CLASS}`}
                  dev-mode="tailwind"
                >
                  {completionActions.projects}
                </Link>
                <Link
                  href="/contact"
                  className={`${ACTION_BASE_CLASS} ${SECONDARY_ACTION_CLASS}`}
                  dev-mode="tailwind"
                >
                  {completionActions.cta}
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  className={`${ACTION_BASE_CLASS} ${RESET_ACTION_CLASS}`}
                  dev-mode="tailwind"
                >
                  {completionActions.reset}
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
