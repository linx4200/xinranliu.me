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
  px-2.5 sm:px-3
  border-border/15
  bg-bg/45
  text-[0.72rem] font-medium leading-snug text-balance text-text sm:text-[0.84rem]
  [overflow-wrap:anywhere]
  transition-[background-color,border-color,color,box-shadow,transform]
  duration-200 ease-out
  active:translate-y-px
  motion-reduce:transition-colors motion-reduce:active:translate-y-0
  focus-visible:relative focus-visible:z-10
  focus-visible:outline focus-visible:outline-2
  focus-visible:outline-offset-[-4px] focus-visible:outline-primary
`;

const TILE_COMPLETED_CLASS = `
  border-primary/80
  bg-primary/12
  font-semibold text-text
  ring-1 ring-inset ring-primary/45
`;

const TILE_SELECTED_CLASS = `
  border-primary/65
  bg-primary/8
  text-text
  ring-1 ring-inset ring-primary/25
  hover:bg-primary/10
  hover:ring-primary/35
`;

const TILE_IDLE_CLASS = `
  hover:border-primary/45
  hover:bg-primary/5
`;

const ACTION_BASE_CLASS = `
  inline-flex min-h-11 items-center justify-center
  rounded-lg border px-5 py-2.5
  text-sm font-medium
  transition-colors duration-200 ease-out
`;

const PRIMARY_ACTION_CLASS = `
  border-primary bg-primary text-white
  hover:border-accent-600 hover:bg-accent-600
`;

const SECONDARY_ACTION_CLASS = `
  border-border/25 bg-transparent text-text
  hover:border-primary hover:bg-primary/5 hover:text-primary
`;

const RESET_ACTION_CLASS = `
  border-transparent text-text-muted
  hover:border-border/20 hover:bg-bg/60 hover:text-text
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
        border border-border/20
        bg-surface
        text-center text-text
      "
      aria-label="Proof Bingo"
      data-dev-mode-react-name="ProofBingo"
      dev-mode="tailwind"
    >
      <div
        className="
          px-5 py-3
          border-b border-border/15
          text-text-muted
        "
        dev-mode="tailwind"
      >
        <p className="text-xs font-medium uppercase tracking-[0.18em]" dev-mode="tailwind">
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
              'disabled:cursor-default disabled:active:translate-y-0',
            ].join(' ')}
            dev-mode="tailwind"
          >
            {tile.label}
            {/* Winning tiles need a non-color cue so the completed line remains clear for color-blind users. */}
            {completedTileIds.has(tile.id) ? (
              <span
                aria-hidden="true"
                className="absolute inset-x-4 bottom-2 h-0.5 rounded-full bg-primary"
              />
            ) : null}
          </button>
        ))}
      </div>

      <div
        className="
          relative h-[14.5rem] overflow-hidden sm:h-[9.25rem]
          border-t border-border/15
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
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted" dev-mode="tailwind">
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
              <p className="overflow-y-auto text-sm font-medium leading-6 text-text" dev-mode="tailwind">
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
