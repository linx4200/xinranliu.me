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
  completionActions: {
    projects: LocalizedCopy;
    cta: LocalizedCopy;
    reset: LocalizedCopy;
  };
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
      en: 'Vue Color is live',
      zh: 'Vue Color 已上线',
    },
  },
  {
    id: 'style-accessible-ui',
    category: 'work-style',
    row: 0,
    col: 2,
    label: {
      en: 'Accessible UI details',
      zh: '无障碍 UI 细节',
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
      en: 'This portfolio is handmade',
      zh: '这个作品集手工打造',
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
      en: 'Freelance web apps',
      zh: '自由职业 Web 应用',
    },
  },
  {
    id: 'project-mirroron-utility',
    category: 'project-evidence',
    row: 2,
    col: 1,
    label: {
      en: 'MirrorOn: tiny macOS utility',
      zh: 'MirrorOn 小工具',
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
  completionActions: {
    projects: {
      en: 'View Projects',
      zh: '查看项目',
    },
    cta: {
      en: 'Hire Xinran',
      zh: '联系 Xinran',
    },
    reset: {
      en: 'Reset',
      zh: '重置',
    },
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
        en: 'Bingo. You found an engineer who treats the website itself as a maintainable, searchable product.',
        zh: 'Bingo。你找到了一位会把网站本身也当作可维护、可搜索产品来做的工程师。',
      },
    },
    'bottom-row': {
      summary: {
        en: 'Bingo. You found an independent builder who keeps useful tools precise, practical, and human.',
        zh: 'Bingo。你找到了一位会把实用工具做得精准、实际、有人味的独立开发者。',
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
        en: 'Bingo. You found a precise builder with modern stack, handmade craft, and personality.',
        zh: 'Bingo。你找到了一位有现代技术栈、手工质感和个人判断的开发者。',
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
