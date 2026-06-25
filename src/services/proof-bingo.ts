import {
  proofBingoCopy,
  proofBingoTiles,
  type ProofBingoLineId,
  type ProofBingoTile,
} from '@/data/proof-bingo';
import { resolveLocale } from '@/dictionaries';

export type LocalizedProofBingoTile = Omit<ProofBingoTile, 'label'> & {
  label: string;
};

export type LocalizedProofBingoCompletionSummaries = Record<
  ProofBingoLineId,
  {
    summary: string;
  }
>;

export type LocalizedProofBingo = {
  title: string;
  tiles: LocalizedProofBingoTile[];
  resetLabel: string;
  completionSummaries: LocalizedProofBingoCompletionSummaries;
};

export const getProofBingo = (lang: string): LocalizedProofBingo => {
  const resolvedLang = resolveLocale(lang);

  const tiles = [...proofBingoTiles]
    .sort((a, b) => a.row - b.row || a.col - b.col)
    .map(({ label, ...tile }) => ({
      ...tile,
      label: label[resolvedLang],
    }));

  const completionSummaries = Object.fromEntries(
    Object.entries(proofBingoCopy.completionSummaries).map(([lineId, completion]) => [
      lineId,
      {
        summary: completion.summary[resolvedLang],
      },
    ]),
  ) as LocalizedProofBingoCompletionSummaries;

  return {
    title: proofBingoCopy.title[resolvedLang],
    tiles,
    resetLabel: proofBingoCopy.resetLabel[resolvedLang],
    completionSummaries,
  };
};
