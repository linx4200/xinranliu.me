# Technical Specification

## 技术栈

- [Next.js](https://nextjs.org/): 因为是个人网站的属性，重前端轻后端，重信息展示，且 SEO 非常重要，因此服务器渲染技术十分合适，因此选用 Next.js 框架。
- Tailwind CSS: 适合样式不复杂，轻量化快速开发的网站。
- React
- Zustand: 简单高效的状态管理库。

## 概要设计

### 项目结构

```
xinran.liu/
├── public/                       # Static public assets
├── scripts/                      # Development and build scripts
├── specs/                        # Project specifications and documentation
├── src/                          # Main application source code
│   ├── proxy.ts                  # Proxy server for API requests
│   ├── app/                      # Next.js App Router directory
│   │   ├── [lang]/               # Language-specific pages
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── projects/page.tsx # Projects page
│   │   │   ├── contact/page.tsx  # Contact page
│   │   │   └── layout.tsx        # Shared layout component
│   ├── components/               # Reusable React components
│   ├── data/                     # Static data
│   ├── dictionaries/             # Language dictionaries
│   ├── hooks/                    # Custom React hooks
│   ├── store/                    # State management (Zustand)
│   └── styles/                   # Global and component-level styles
├── eslint.config.mjs             # ESLint configuration for code linting
├── next.config.ts                # Next.js framework configuration
├── package.json                  # Project metadata, dependencies, and scripts
├── postcss.config.mjs            # PostCSS configuration for Tailwind CSS
├── README.md                     # Project overview and instructions
└── tsconfig.json                 # TypeScript compiler configuration
```

### 页面路由设计

| Page         	| Route Path 	| Page File  	|
|--------------	|------------	|-------------	|
| Home Page    	| /          	| src/app/page.tsx    	|
| Project      	| /projects  	| src/app/projects/page.tsx 	|
| Contact Page 	| /contact   	| src/app/contact/page.tsx  	|

根据 Next.js 的定义，页面文件放在项目的 src/app 目录下。

使用 `src/app/[lang]/layout.tsx` 页面组件作为布局组件，放置 `<Nav />`、`<Footer />`、Developer Mode 浮动入口等全局组件。首页采用一屏数字名片布局，`<Nav />` 在首页只保留 theme、language、documentation 工具入口，Projects 与 Contact 由 hero CTA 承担；`<Footer />` 在首页隐藏，子页面保留。

## 具体功能设计

### 样式设计

总体使用 Tailwind CSS 中自带的 class names。为了保证整个网站样式的连贯，额外定义一些 theme 变量。

```css
@theme {
  --color-bg: #fff;
  /* 主要容器/卡片背景 */
  --color-surface: var(--color-stone-50);
  --color-surface-strong: var(--color-stone-200);
  /* 主要文字 */
  --color-text: #1f1510;
  /* 次要文字 */
  --color-text-muted: var(--color-stone-500);
  --color-border: var(--color-zinc-900);
  --color-primary: var(--color-accent-500);
}
```

### 组件设计

为了网站的首屏加载速度和 SEO，需要尽量保持 client component 的范围最小。因此项目组件结构如下，（黄色背景为 client component）:

```plantuml
@startuml
component "<Layout />" as layout
component "<Nav />" as nav #Yellow
component "<DarkModeSwitch />" as darkmode #Yellow
component "<LangSwitch />" as lang #Yellow

component "<DeveloperModeFloatingToggle />" as devtoggle #Yellow
component "<DeveloperModePopUpInfo />" as devinfo #Yellow

component "<Footer />" as footer

layout --> nav
nav --> darkmode
nav --> lang
layout --> [Page components]
layout --> footer
layout --> devtoggle
layout --> devinfo

@enduml
```

```
@startuml
component "<Page /> (Index Page)" as page
component "<ProofBingo />" as proof #Yellow
component "<Link /> CTA" as cta #Yellow

page --> proof
page --> cta

@enduml
```

```plantuml
@startuml
component "<Page /> (Projects Page)" as projects_page
component "<ProjectGrid />" as projectgrid
component "<ProjectCard />" as projectcard_grid

projects_page --> projectgrid
projectgrid --> projectcard_grid

@enduml
```

- `<Nav />`: 头部导航组件。子页面包含 Home、Projects、Hire Me/Contact，以及中英文切换、黑暗模式切换、文档链接；首页只展示工具入口，主导航动作由 hero CTA 承担。
- `<ProofBingo />`: 首页核心交互组件，以 3x3 proof matrix 展示技术栈、项目证据、工作方式和个人特质。用户点亮任意一条线后，展示本地化 summary 和 reset 控制；View Projects / Hire Me 转化入口由首页左侧 hero CTA 常驻承载，避免重复。
- `<Footer />`: 子页面页脚。首页为了保持一屏数字名片体验不渲染页脚。
- `<Card />`: 卡片形式的容器组件，用于统一卡片的样式。使用 children prop 来进行子组件的渲染。
- `<ProjectCard />`: 项目卡片组件，用于展示项目信息。该组件的最外层容器是 `<Card />`， 里面包含项目名称、项目描述、项目链接、项目图片等信息。
- `<ProjectGrid />`: 项目网格组件，用于展示项目列表。获取 project data 后渲染多个 `<ProjectCard />`。
- `<SkillSet />`: 技能组件，用于展示技能信息。
- `<SkillSetList />`: 技能集合组件，用于展示技能集合。获取 skill data 后渲染多个 `<SkillSet />`。

### 黑暗模式 Dark Mode

定义 `<DarkModeSwitch />` 组件，用于切换黑暗模式。

#### 黑暗模式 JS 开关

根据当前[系统设置(使用 `prefers-color-scheme` 媒体查询获取)](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme)和当前浏览生命周期内的手动开关状态，往 HTML 标签上添加 `.dark` 或者 `.light` 的 class。

初始化必须永远跟随系统偏好。这里的“进入网站”按浏览器页面生命周期理解：手动刷新、重新打开标签页、直接访问 URL 都会重新初始化为系统主题。用户手动切换主题后，主题只作为当前客户端运行时的内存 override 保留；通过 Next.js 站内导航进入下一个页面时继续沿用该 override。不要用 `localStorage`、`sessionStorage`、cookie 或 `theme=dark|light` search param 持久化主题状态。

```plantuml
@startuml
start;
:Get initial mode by `window.matchMedia('(prefers-color-scheme: dark)`;
if (manual override exists?) then (yes)
  :ignore system change, use manual override value;
else (no)
  :apply system change;
endif
if (is dark mode?)
  :add `.dark` to html element;
else
  :add `.light` to html element;
endif
fork
  :listen to change event of ``window.matchMedia('(prefers-color-scheme: dark)`;
fork again
  :user clicks dark mode switch;
end merge
if (effective theme is dark?)
  :add `.dark` to html element;
else
  :add `.light` to html element;
endif
end
@enduml
```

```js
type Theme = 'light' | 'dark';

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
};
```

#### 黑暗模式 CSS 样式

使用 [Tailwind CSS 的官方建议用法](https://tailwindcss.com/docs/dark-mode), 使用 `dark:` 前缀来定义黑暗模式的样式。

但因为本网站的暗黑模式可以手动设置而不跟随系统，因此需要重新定义 `dark:` 前缀。

```css
@custom-variant dark (&:where(.dark, .dark *));

.html.dark {
  --color-bg: #0f0b09;
  /* other theme variables ... */
}
```

### 中英文切换

参考 [Next.js 官方文档](https://nextjs.org/docs/app/guides/internationalization) 进行设计。

#### 路由设计

因为需要考虑 SEO，希望搜索引擎也能抓取到中文的信息，因此中英文切换需要使用路由切换，而不是 URL 参数切换。

```plantuml
@startuml
start
if (路径中是否已经包含 locale 信息?) then (yes)
    if (locale 信息是否合法) then (yes)
        :不需进行任何处理;
    else (no)
        :返回 404;
    endif
  stop
else (no)
  :"获取请求 headers 中的 Accept-Language";
  :决定当前请求应该使用的语言;
  :组装 url /{locale}/{pageName};
  :重新跳转到 url;
endif
end
@enduml
```

https://nextjs.org/docs/app/getting-started/layouts-and-pages#creating-a-nested-route

#### 文案文件

将中英文文案分别放在 `src/dictionaries/en.json` 和 `src/dictionaries/zh-CN.json` 中。

#### 项目数据

项目展示数据来自 Supabase `projects` table，并在 `src/services/projects.ts` 中转换成页面组件使用的 `LocalizedProject`。页面组件不直接依赖数据库字段名，Projects 页面只取一次数据，并把同一份结果传给项目列表和 JSON-LD，避免页面内容与结构化数据漂移。

因为网站只设置简体中文和英文两种语言，因此数据库里的可翻译字段使用简单高效的双列模型：`title_en` / `title_zh`、`desc_en` / `desc_zh`。项目按 `id` 升序展示；`tags` 使用数组字段；`site`、`github`、`image` 都是可选字段。

`projects` 是公开展示内容，只需要匿名只读访问。Supabase 侧应保证该表已暴露给 Data API、启用 RLS，并为 `anon` 提供只读 SELECT policy，不要在站点代码中使用 `service_role` key。

### 移动端适配

参考：https://tailwindcss.com/docs/responsive-design

布局适配：

1. 头部 logo 居中并取消动画；导航栏放置左侧，收起为汉堡菜单；右侧保留 dark mode 和 语言切换 icon。
2. Hero Section 保持居中布局。
3. Developer Mode 入口取消。
4. 标题改为居左显示，卡片垂直排列，一行一个卡片。
5. Contact Page 的 HeroSection 保持居中布局; 头像： 缩小比例（约为屏幕宽度的 50%-60%），置于顶部居中; "Experienced Web Developer" 居中对齐，字体大小调至 28px-32px; 状态： "Available for Freelance Work" 紧随其后，绿点与文字居中对齐。
6. Contact Page 的 专业背景与联系板块 (List Sections) 改为:
- 堆叠布局： 标题和描述占满行宽，按钮放置在下方并变为通栏按钮 (Full-width Button)。这样更易于大拇指点击。
- 间距优化： 增加列表项之间的内边距（Padding），防止误触。
- Footer 保持不变

### Developer Mode

详细查看 [Developer Mode 技术方案](./Developer%20Mode.md)

### Available Time

Contact Page 和 Available Time 功能通过查询个人 Google Calendar 的空闲时间实现。

参考 https://developers.google.com/workspace/calendar/api/quickstart/nodejs 进行实现。

### SEO

1. 静态元数据 (首页和 Contact Page)

在 `layout.tsx` 和 各个子页面的 `page.tsx` 中直接导出 metadata 对象(Metadata API)。

https://nextjs.org/docs/app/getting-started/metadata-and-og-images

2. 动态元数据 (Project Page)
使用 `generateMetadata` 函数(Metadata API)，根据项目内容自动生成标题和描述。

3. 创建 `app/sitemap.ts` 文件

https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts

4. 创建 `app/robot.txt` 文件

https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#static-robotstxt


5. 加入 JSON-LD

在 `app/layout.tsx` 中加入 JSON-LD: https://nextjs.org/docs/app/guides/json-ld

## 数据统计

https://nextjs.org/docs/app/guides/analytics

## 部署

### Vercel 部署

todo: add
