'use client';

import { useMemo, useState } from 'react';

import type { ProofBingoLineId } from '@/data/proof-bingo';
import type {
  LocalizedProofBingoCompletionSummaries,
  LocalizedProofBingoTile,
} from '@/services/proof-bingo';

type ProofBingoProps = {
  title: string;
  tiles: LocalizedProofBingoTile[];
  resetLabel: string;
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
  bg-bg/45
  text-[0.68rem] font-medium leading-snug text-balance text-text sm:text-[0.8rem]
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
  bg-primary/12
  font-semibold text-text
`;

const TILE_SELECTED_CLASS = `
  bg-primary/8
  text-text
  hover:bg-primary/10
`;

const TILE_IDLE_CLASS = `
  hover:bg-primary/5
`;

// Proof Bingo has a compact completion panel, so its actions intentionally use
// smaller metrics than the global CTAButton while keeping the same shape language.
const ACTION_BASE_CLASS = `
  inline-flex min-h-8 items-center justify-center
  border border-transparent px-1 py-1
  text-xs font-medium
  underline-offset-4
  transition-colors duration-200 ease-out
`;

const RESET_ACTION_CLASS = `
  text-text-muted
  hover:text-text hover:underline
  focus-visible:underline
`;

const COMPLETION_PANEL_BASE_CLASS = `
  absolute inset-0
  px-5 py-5
  transition-[opacity,transform] duration-200 ease-out
  motion-reduce:transform-none motion-reduce:transition-opacity
`;

const COMPLETION_PANEL_VISIBLE_CLASS = `
  translate-y-0 opacity-100
`;

const COMPLETION_PANEL_HIDDEN_CLASS = `
  pointer-events-none translate-y-1 opacity-0
`;

type ActiveTileEdgesProps = {
  completed: boolean;
  edges: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
};

const ACTIVE_TILE_EDGE_CLASS = 'pointer-events-none absolute bg-primary';
const TILE_SEPARATOR_CLASS = 'pointer-events-none absolute bg-border/15';

function TileSeparators({
  index,
  selectedTileIds,
  tileIds,
}: {
  index: number;
  selectedTileIds: Set<string>;
  tileIds: string[];
}) {
  const isSelected = selectedTileIds.has(tileIds[index]);
  const rightNeighborIsSelected = selectedTileIds.has(tileIds[index + 1]);
  const bottomNeighborIsSelected = selectedTileIds.has(tileIds[index + 3]);
  const showRight = index % 3 !== 2 && !isSelected && !rightNeighborIsSelected;
  const showBottom = index < 6 && !isSelected && !bottomNeighborIsSelected;

  return (
    <>
      {showRight ? (
        <span aria-hidden="true" className={`${TILE_SEPARATOR_CLASS} inset-y-0 right-0 w-px`} />
      ) : null}
      {showBottom ? (
        <span aria-hidden="true" className={`${TILE_SEPARATOR_CLASS} inset-x-0 bottom-0 h-px`} />
      ) : null}
    </>
  );
}

function ActiveTileEdges({ completed, edges }: ActiveTileEdgesProps) {
  const edgeColorClass = completed ? 'opacity-100' : 'opacity-70';

  return (
    <>
      {edges.top ? (
        <span aria-hidden="true" className={`${ACTIVE_TILE_EDGE_CLASS} ${edgeColorClass} inset-x-0 top-0 h-px`} />
      ) : null}
      {edges.right ? (
        <span aria-hidden="true" className={`${ACTIVE_TILE_EDGE_CLASS} ${edgeColorClass} inset-y-0 right-0 w-px`} />
      ) : null}
      {edges.bottom ? (
        <span aria-hidden="true" className={`${ACTIVE_TILE_EDGE_CLASS} ${edgeColorClass} inset-x-0 bottom-0 h-px`} />
      ) : null}
      {edges.left ? (
        <span aria-hidden="true" className={`${ACTIVE_TILE_EDGE_CLASS} ${edgeColorClass} inset-y-0 left-0 w-px`} />
      ) : null}
    </>
  );
}

export function ProofBingo({
  title,
  tiles,
  resetLabel,
  completionSummaries,
}: ProofBingoProps) {
  const [selectedTileIds, setSelectedTileIds] = useState<Set<string>>(() => new Set());
  const [completedLineId, setCompletedLineId] = useState<ProofBingoLineId | null>(null);

  const tileIds = useMemo(() => tiles.map((tile) => tile.id), [tiles]);
  const completedLine = WINNING_LINES.find((line) => line.id === completedLineId);
  const completedTileIds = new Set(completedLine?.indexes.map((index) => tileIds[index]) ?? []);
  const completionSummary = completedLineId ? completionSummaries[completedLineId].summary : null;

  const getActiveTileEdges = (index: number, activeTileIds: Set<string>) => ({
    top: index < 3 || !activeTileIds.has(tileIds[index - 3]),
    right: true,
    bottom: true,
    left: index % 3 === 0 || !activeTileIds.has(tileIds[index - 1]),
  });

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

    setSelectedTileIds(
      nextCompletedLine
        ? new Set(nextCompletedLine.indexes.map((index) => tileIds[index]))
        : nextSelectedTileIds,
    );
    setCompletedLineId(nextCompletedLine?.id ?? null);
  };

  return (
    <div
      className="
        w-full max-w-100 mx-auto overflow-hidden rounded-md
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
          px-4 py-2.5
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
        {tiles.map((tile, index) => {
          const isSelected = selectedTileIds.has(tile.id);
          const isCompleted = completedTileIds.has(tile.id);

          return (
            <button
              key={tile.id}
              type="button"
              aria-pressed={isSelected}
              disabled={Boolean(completedLineId)}
              onClick={() => handleTileToggle(tile.id)}
              className={[
                TILE_BASE_CLASS,
                isCompleted ? TILE_COMPLETED_CLASS : isSelected ? TILE_SELECTED_CLASS : TILE_IDLE_CLASS,
                'disabled:cursor-default disabled:active:translate-y-0',
              ].join(' ')}
              dev-mode="tailwind"
            >
              <TileSeparators index={index} selectedTileIds={selectedTileIds} tileIds={tileIds} />
              {tile.label}
              {isSelected ? (
                <ActiveTileEdges
                  completed={isCompleted}
                  edges={getActiveTileEdges(index, selectedTileIds)}
                />
              ) : null}
              {/* Winning tiles need a non-color cue so the completed line remains clear for color-blind users. */}
              {isCompleted ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-4 bottom-2 h-0.5 rounded-full bg-primary"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        className="
          relative h-[14rem] overflow-hidden sm:h-[10.25rem]
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
            'flex flex-col items-center justify-between gap-4 overflow-hidden text-center',
            completionSummary ? COMPLETION_PANEL_VISIBLE_CLASS : COMPLETION_PANEL_HIDDEN_CLASS,
          ].join(' ')}
          aria-hidden={!completionSummary}
          dev-mode="tailwind"
        >
          {completionSummary ? (
            <>
              <div
                className="
                  flex max-w-[20rem] grow items-center justify-center
                  animate-proof-bingo-pop
                  motion-reduce:animate-none
                "
                dev-mode="tailwind"
              >
                <p
                  className="
                    overflow-y-auto
                    text-base font-semibold leading-6 text-text
                    sm:text-lg sm:leading-7
                  "
                  dev-mode="tailwind"
                >
                  {completionSummary}
                </p>
              </div>
              <div className="flex justify-center" dev-mode="tailwind">
                <button
                  type="button"
                  onClick={handleReset}
                  className={`${ACTION_BASE_CLASS} ${RESET_ACTION_CLASS}`}
                  dev-mode="tailwind"
                >
                  {resetLabel}
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
