# AGENTS.md

## 这是什么项目

这是 Xinran Liu 的个人作品集网站，不只是一个展示页面，更是面向潜在客户和合作方的数字名片。它需要同时传达三件事：

1. 业务能力：做过什么项目、解决过什么问题、是否值得信任。
2. 专业能力：前端、全栈、SEO、可访问性、工程化是否扎实。
3. 活人感：有趣、有判断力、有设计感，而不是一个套模板的“标准程序员主页”。

任何代理在这里工作时，都应该把“可信、克制、精致、有个性”当成默认目标。

## 与 Owner 协作的默认方式

- 默认用简体中文写说明、变更摘要和协作文档；面向用户的站点内容继续保持中英双语。
- 这是一个偏 spec-driven 的项目。开始较大改动前，先读相关文档，而不是直接猜：
  - `specs/PRD.md`
  - `specs/Technical Specification.md`
  - `specs/Technical Specification - Developer Mode.md`
  - `specs/DESIGN.md`
  - `specs/ADR.md`
- 这里不欢迎“能跑就行”的临时方案。实现应尽量一次性覆盖视觉一致性、响应式、SEO、a11y 和内容完整性。
- 如果需要在“炫技”和“可信表达”之间取舍，优先后者。
- 如果需要在“复杂交互”和“维护成本”之间取舍，优先结构清晰、意图明确的实现。

## 产品与体验原则

- 网站核心定位是 `full-stack engineer + freelancer`，不是单纯的个人博客。
- 页面应体现专业感，但不能冷冰冰；适度保留灵动细节，比如 logo / 文案 / 动效里的性格表达。
- 不要把页面做成通用 SaaS 模板风，也不要过度堆叠特效。
- SEO、可访问性、移动端适配都属于产品需求，不是收尾项。
- Desktop 体验可以更完整；mobile 要更聚焦，尤其是 Developer Mode 要降级处理。

## 视觉方向

当前设计系统是 `Precision Minimalist`，代理改 UI 时请优先守住这些原则：

- 轻背景、克制配色、清晰排版、大留白。
- 黑色是主信息色，点缀色以低饱和玫瑰红为主。
- 优先使用细边框、层级色差和版式节奏表达层次，而不是厚重阴影。
- 字体与信息层级比花哨装饰更重要。
- 视觉上应给人“精确、现代、克制、高级”的感觉。

如果要做大胆设计，也应该是“有判断的突破”，而不是随机增加流行元素。

## 技术与架构速览

- 框架：Next.js App Router
- 语言：TypeScript
- UI：React 19 + Tailwind CSS v4
- 状态管理：Zustand
- 外部集成：Google Calendar API

关键结构：

- `src/app/[lang]`：按语言分组的页面路由
- `src/proxy.ts`：根路径语言重定向逻辑
- `src/dictionaries`：中英文文案
- `src/data`：静态数据源
- `src/services`：数据整理与第三方集成
- `src/components`：通用组件
- `src/components/developer-mode`：开发者模式相关组件
- `src/store/useDeveloperModeStore.ts`：Developer Mode 全局状态
- `src/lib/seo.ts`、`src/app/sitemap.ts`、`src/app/robots.ts`：SEO 相关逻辑
- `src/styles`：全局样式、主题、开发者模式样式

## 多语言约束

- 当前支持语言只有 `en` 和 `zh`。
- URL 使用路由前缀，而不是 query 参数切语言。
- 内部中文路由是 `/zh/...`，HTML `lang` 标记是 `zh-CN`。
- 修改任何用户可见文案时，必须同时检查：
  - `src/dictionaries/en.json`
  - `src/dictionaries/zh-CN.json`
- 不要引入会破坏 SEO 的前端临时翻译方案。

## 组件与渲染约束

- 默认优先 Server Component；只把真正需要交互的局部做成 Client Component。
- 不要无意义扩大 client boundary，尤其是 layout、导航、列表页和 SEO 相关区域。
- 保持数据流简单：静态展示优先从 `src/data` + `src/services` 读取，不要为了小需求引入新的远程依赖。
- 新增组件时，优先保证语义化 HTML、键盘可访问性和清晰的 props 边界。

## Developer Mode 约束

Developer Mode 是这个站点体现“工程可信度”和“有趣灵魂”的关键差异化功能，改动时要格外小心。

- 全局状态位于 `src/store/useDeveloperModeStore.ts`。
- 相关 UI 位于 `src/components/developer-mode/`。
- React 模式依赖组件上的 `data-dev-mode-react-name` 标记，以及生成文件 `src/data/dev-mode-react-components.js`。
- 如果你修改了被标记组件、props 结构，或者新增了需要被 React 模式识别的组件，记得运行：

```bash
npm run dev-mode:generate:react
```

- Tailwind 模式依赖页面元素上的 `dev-mode="tailwind"` 标记；不要随手删掉这些标记。
- 移动端不应完整暴露 Developer Mode 的复杂交互。

## SEO 与内容可信度

- 任何页面级改动，都要考虑 metadata、canonical、alternate languages、Open Graph、JSON-LD 是否仍然正确。
- 相关逻辑优先复用 `src/lib/seo.ts`，不要在页面里散落重复实现。
- sitemap / robots 是产品的一部分，不要忽略。
- 联系页与可用时间接口属于高信任区，文案要真实、克制，不要写得像营销落地页。

## Contact / Availability 约束

- Google Calendar 可用时间接口在 `src/app/api/google-calendar/route.ts`。
- 这是面向站点前端使用的 API，不应该被搜索引擎索引；保留现有 `X-Robots-Tag` 约束。
- 不要把密钥、凭证、邮箱私密信息写入仓库；继续使用 `.env.local`。

## 文档维护要求

- 如果改动影响了行为、架构、约束或设计原则，顺手更新对应 `specs/` 文档。
- 如果只是实现细节微调，不必为了“看起来完整”而机械改文档。
- 文档目标是帮助后续代理快速接手，不是制造维护噪音。

## 改动前后的检查清单

开始前：

- 确认本次改动对应的 spec。
- 确认是否涉及双语、SEO、响应式、Developer Mode。

完成后至少做这些检查：

```bash
npm run lint
```

有以下情况时，额外执行：

- 改了路由、metadata、SSR 或构建敏感逻辑：`npm run build`
- 改了 React Developer Mode 元数据来源：`npm run dev-mode:generate:react`

手动验证时，优先看这些路径：

- `/en`
- `/zh`
- `/en/projects`
- `/zh/contact`

并确认：

- 中英文切换正常
- Dark mode 正常
- 导航与 CTA 在移动端可用
- Skip link、focus visible、语义结构没有退化
- Developer Mode 在桌面端仍可工作

## 不要做的事

- 不要把这个站点改成通用模板风格。
- 不要为了省事牺牲 SEO 或可访问性。
- 不要引入沉重依赖去解决一个简单展示问题。
- 不要把临时调试代码、占位文案、假数据说明留在生产界面。
- 不要在没有必要时重写现有架构。

## 推荐工作方式

1. 先读相关 spec 和现有实现。
2. 明确这次改动是在增强“业务能力展示 / 专业能力展示 / 活人感”中的哪一项。
3. 用最小但完整的改动实现目标。
4. 完成后做 lint、必要构建和手动核验。
5. 如果引入了新约束或新模式，补文档。

## 常用命令

```bash
npm run dev
npm run lint
npm run build
npm run dev-mode:generate:react
```
