import type { LangCode } from '@/dictionaries';

export type ProofBingoTileCategory =
  | 'technology'
  | 'project-evidence'
  | 'work-style'
  | 'service'
  | 'personal-signal';

export type ProofBingoLineId =
  | 'top-row'
  | 'middle-row'
  | 'bottom-row'
  | 'left-column'
  | 'center-column'
  | 'right-column'
  | 'main-diagonal'
  | 'anti-diagonal';

export type LocalizedCopy = Record<LangCode, string>;

export type ProofBingoTile = {
  id: string;
  category: ProofBingoTileCategory;
  row: 0 | 1 | 2;
  col: 0 | 1 | 2;
  label: LocalizedCopy;
};

export type ProofBingoCopy = {
  title: LocalizedCopy;
  resetLabel: LocalizedCopy;
  completionSummaries: Record<
    ProofBingoLineId,
    {
      summary: LocalizedCopy;
    }
  >;
};

export const proofBingoTiles = [
  {
    id: 'stack-react-vue-next',
    category: 'technology',
    row: 0,
    col: 0,
    label: {
      en: 'React / Vue / Next.js',
      zh: 'React / Vue / Next.js',
    },
  },
  {
    id: 'project-vue-color',
    category: 'project-evidence',
    row: 0,
    col: 1,
    label: {
      en: 'Vue Color: 100k weekly downloads',
      zh: 'Vue Color：周下载 10 万+',
    },
  },
  {
    id: 'style-accessible-ui',
    category: 'work-style',
    row: 0,
    col: 2,
    label: {
      en: 'Accessibility-minded UI',
      zh: '关注无障碍体验的 UI',
    },
  },
  {
    id: 'stack-typescript-first',
    category: 'technology',
    row: 1,
    col: 0,
    label: {
      en: 'TypeScript-first builds',
      zh: 'TypeScript 优先构建',
    },
  },
  {
    id: 'project-portfolio-handmade',
    category: 'project-evidence',
    row: 1,
    col: 1,
    label: {
      en: 'Designed and built this portfolio',
      zh: '设计并开发这个作品集',
    },
  },
  {
    id: 'capability-seo-aware',
    category: 'service',
    row: 1,
    col: 2,
    label: {
      en: 'SEO-aware by default',
      zh: '默认考虑 SEO',
    },
  },
  {
    id: 'service-freelance-web-apps',
    category: 'service',
    row: 2,
    col: 0,
    label: {
      en: 'Independent contractor',
      zh: '独立开发者',
    },
  },
  {
    id: 'project-mirroron-utility',
    category: 'project-evidence',
    row: 2,
    col: 1,
    label: {
      en: 'MirrorOn: tiny macOS utility',
      zh: 'MirrorOn 小 MacOS 工具',
    },
  },
  {
    id: 'style-precise-playful-detail',
    category: 'personal-signal',
    row: 2,
    col: 2,
    label: {
      en: 'Precise, playful, detail-driven',
      zh: '精准、有趣、重细节',
    },
  },
] satisfies ProofBingoTile[];

export const proofBingoCopy: ProofBingoCopy = {
  title: {
    en: 'Pick any three proof points',
    zh: '点亮任意三个证据点',
  },
  resetLabel: {
    en: 'Reset',
    zh: '重置',
  },
  completionSummaries: {
    'top-row': {
      summary: {
        en: 'Bingo. You found a front-end builder who turns product details into polished interfaces.',
        zh: 'Bingo。你找到了一位能把产品细节做成精致界面的前端开发者。',
      },
    },
    'middle-row': {
      summary: {
        en: 'Bingo. You found a product-minded engineer who builds websites with clean structure, reliable code, and SEO in mind.',
        zh: 'Bingo。你找到了一位有产品思维的工程师，会把网站做得结构清晰、代码可靠，也照顾搜索体验。',
      },
    },
    'bottom-row': {
      summary: {
        en: 'Bingo. You found an independent builder who makes projects precise, efficient, and playful.',
        zh: 'Bingo。你找到了一位会把项目做得精准、高效、有趣的独立开发者。',
      },
    },
    'left-column': {
      summary: {
        en: 'Bingo. You found a full-stack web developer ready to build typed, modern web apps.',
        zh: 'Bingo。你找到了一位能构建现代、类型安全 Web 应用的全栈开发者。',
      },
    },
    'center-column': {
      summary: {
        en: 'Bingo. You found a maker with real projects, not just a skill list.',
        zh: 'Bingo。你找到的不是技能清单，而是有真实项目的创造者。',
      },
    },
    'right-column': {
      summary: {
        en: 'Bingo. You found a detail-driven developer who makes web products clearer for people and search.',
        zh: 'Bingo。你找到了一位重细节、也懂用户和搜索体验的开发者。',
      },
    },
    'main-diagonal': {
      summary: {
        en: 'Bingo. You found a developer who pairs modern front-end tools with thoughtful design and precise, playful details.',
        zh: 'Bingo。你找到了一位能把现代前端技术、设计判断和精准有趣的细节结合起来的开发者。',
      },
    },
    'anti-diagonal': {
      summary: {
        en: 'Bingo. You found a web developer who balances accessibility, craft, and client-ready delivery.',
        zh: 'Bingo。你找到了一位能平衡无障碍、质感和客户交付的 Web 开发者。',
      },
    },
  },
};
