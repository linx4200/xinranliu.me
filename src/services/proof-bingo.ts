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

export type LocalizedProofBingoIdentity = {
  headline: string;
  subline: string;
};

export type LocalizedProofBingoCompletionActions = {
  cta: string;
  reset: string;
};

export type LocalizedProofBingoCompletionSummaries = Record<
  ProofBingoLineId,
  {
    summary: string;
  }
>;

export type LocalizedProofBingo = {
  identity: LocalizedProofBingoIdentity;
  tiles: LocalizedProofBingoTile[];
  completionActions: LocalizedProofBingoCompletionActions;
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
    identity: {
      headline: proofBingoCopy.identity.headline[resolvedLang],
      subline: proofBingoCopy.identity.subline[resolvedLang],
    },
    tiles,
    completionActions: {
      cta: proofBingoCopy.completionActions.cta[resolvedLang],
      reset: proofBingoCopy.completionActions.reset[resolvedLang],
    },
    completionSummaries,
  };
};
