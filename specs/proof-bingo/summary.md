# Requirement Summary

本轮访谈选择：暂时还不清楚 / 无法具体归类的通用需求。

当前需求方向：为现有网站的 hero section 增加一个 Proof Bingo 互动功能。

已确认信息：
- 当前问题：网站互动性不够强，技能和能力展示不够充分。
- 期望功能：每个 bingo 格子展示一个个人技能、能力证据或 fact。
- 主要交互：用户点击格子并连成线。
- 触发结果：连成线后出现展示个人特长、身份和工作的动画。
- 主要目标用户：潜在客户。
- 希望形成的印象：专业、高效、注重细节的 web developer。
- 内容维护：不需要频繁更新，但由于网站开源，希望使用清晰、容易配置的数据结构。
- 数据结构：新增显式 Proof Bingo 数据源，保存 stable id、category、position 与中英文 label；通过 service 返回本地化后的组件数据，避免在 JSX 中散落文案。
- hero 定位：bingo card 是 hero 的核心视觉，原本标题和介绍可融合进 bingo 文案。
- hero 信息架构：外部只保留克制的身份锚点，Proof Bingo 承担主要叙事，完成态弹出身份总结。
- Hero Identity Anchor 文案：
  - EN headline: `Xinran Liu`
  - EN subline: `Independent full-stack web developer`
  - ZH headline: `Xinran Liu`
  - ZH subline: `独立全栈 Web 开发者`
- Developer Mode：现有 hero section 内入口先移除；后续再为 Developer Mode 寻找更合适的位置。
- 初始规格：3x3 bingo。
- 内容类型：技术技能、项目经验、工作方式、个人 fact、服务能力都需要覆盖。
- 9 格内容结构：按证据类型平衡，而不是自由挑选最强卖点；任意三连线都应能读成一个可信组合。
- 动效方向：翻牌/连线动效 + 弹出一句身份总结。
- 完成态身份总结：不同 winning line 使用不同的中英文文案，避免所有组合落到同一句总结。
- 完成态 CTA：
  - EN: `Hire Xinran`
  - ZH: `联系 Xinran`
  - Destination: `/contact`
- 完成态 Reset：
  - EN: `Reset`
  - ZH: `重置`
  - 位置：完成态区域内，作为低权重 secondary action，视觉权重低于联系 CTA。
  - 行为：清空已选 tile、完成线和完成态，回到初始 bingo 状态；Reset 后焦点回到第一个 Proof Tile。
- CTA：互动完成后跳转到现有联系页；`Hire Me` 是 CTA 文案，不新增独立 `/hire-me` 页面。
- 格子文案：由执行方基于现有网站内容先拟一版。
- 首版 Proof Tile 英文文案：
  - `React / Vue / Next.js`
  - `TypeScript-first builds`
  - `Accessible UI details`
  - `Vue Color is live`
  - `This portfolio is handmade`
  - `MirrorOn: tiny macOS utility`
  - `SEO-aware by default`
  - `Freelance web apps`
  - `Precise, playful, detail-driven`
- 首版 3x3 布局：

```text
React / Vue / Next.js      Vue Color is live              Accessible UI details
TypeScript-first builds    This portfolio is handmade     SEO-aware by default
Freelance web apps         MirrorOn: tiny macOS utility   Precise, playful, detail-driven
```

  中心格使用 `This portfolio is handmade`，强调站点本身也是可信证据；每条横线、竖线和斜线都应尽量能读成一个可信组合。
- 首版 3x3 中文文案：

```text
React / Vue / Next.js      Vue Color 已上线          无障碍 UI 细节
TypeScript 优先构建        这个作品集手工打造        默认考虑 SEO
自由职业 Web 应用          MirrorOn 小工具           精准、有趣、重细节
```

  中文文案优先自然短句，不做逐字硬翻。
- 规则：贴合大众 bingo 认知，3x3 中任意横、竖或斜向三连线即可触发完成状态。
- 语气：身份总结偏 playful、有趣。
- 移动端：保留完整 3x3 互动。
- 移动端布局：3x3 始终完整显示，不改轮播/列表；tile 使用稳定尺寸或 `aspect-ratio: 1 / 1`；文案保持短句并允许换行，不在 tile 内放详细解释；完成态 CTA 需适合触控。
- 文案语言：身份总结中英双语。
- 内容来源：允许读取现有网站内容，先拟一版 9 个格子文案。
- a11y：需要保留，尤其是键盘操作、焦点状态和完成状态可理解；后续需要针对 a11y 做单独测试。
- a11y 交互模型：每个 Proof Tile 使用真实 `button`，通过 Tab 聚焦、Enter/Space 切换选中，`aria-pressed` 表示选中状态；完成态使用 polite live region 宣布；完成后锁定结果，不再允许切换改变完成线，但提供显式 Reset 按钮重新开始。
- 实现边界：首页保持 Server Component；Proof Bingo 本身作为局部 Client Component，接收本地化后的数据并负责点击、键盘选择、连线判断和完成态展示。
- SEO 边界：Proof Bingo 作为首页可见内容和首屏表达方式存在，不新增 `Game`、`Quiz`、`ItemList` 等 JSON-LD 类型；首页结构化数据仍保持身份与作品集可信度方向。
- Developer Mode：移除 hero 内 `DevModeToggle` 入口，但保留全局 floating Developer Mode；Proof Bingo 关键容器仍应保留 Tailwind/React Developer Mode 标记。
- 动效策略：这是展示动画能力的例外区域，不要求按常规 reduced-motion 关闭核心动画，但实现仍需保证基本可理解性和可操作性。
- 视觉动效边界：采用高完成度的轻量动效，不引入动画库；点击格子有轻微翻牌/压下反馈，成线用细 rose 线条连接，完成态在 bingo 区域内浮现或展开，不做全屏 modal。
- reduced-motion：不完全关闭核心反馈，但降为无位移/低动效版本，保留选中态、连线和完成文案。
- 时间线：无明确 deadline，优先完成设计与实现质量。

待确认重点：
- Implementation spec 已整理到 `specs/Proof Bingo Implementation Spec.md`。
- Step-by-step TODO 已整理到 `specs/Proof Bingo Implementation Todo.md`。

术语决策：
- `Proof Bingo` 是该功能的产品内概念；`bingo card` 只描述 UI 形态。
- `Hero Identity Anchor` 指 Proof Bingo 外部的短身份文本，不承载完整叙事。
- `Proof Tile` 指 Proof Bingo 中的单个格子，必须表达一个信任证据，而不是普通标签。
- `Proof Motion` 指 Proof Bingo 的克制动效语言，用精确反馈服务可信表达，而不是游戏化特效。
