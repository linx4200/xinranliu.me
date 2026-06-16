# Xinran Liu Portfolio Context

This context defines the product language for Xinran Liu's personal portfolio website. It keeps future design and implementation work aligned around portfolio-specific concepts.

## Language

**Contact Page**:
The primary destination for hiring, collaboration, availability, and professional verification.
_Avoid_: Hire Me page

**Hire Me**:
A call-to-action phrase that can point visitors to the **Contact Page**.
_Avoid_: Treating Hire Me as a separate page concept

**Proof Bingo**:
The homepage hero interaction that presents Xinran's skills, project evidence, service strengths, and personality as a bingo card.
_Avoid_: Skill Bingo, Portfolio Bingo

**Hero Identity Anchor**:
The short identity text outside **Proof Bingo** that names Xinran and frames the visitor's first impression.
_Avoid_: Repeating the full Proof Bingo narrative outside the card

**Proof Tile**:
One cell in **Proof Bingo** that presents a single trust-building signal.
_Avoid_: Generic skill tag

**Bingo Completion**:
The state reached when a visitor completes a valid line in **Proof Bingo** and sees the identity summary plus contact action.
_Avoid_: Game win screen

**Proof Motion**:
The restrained motion language for **Proof Bingo**, using precise tile, line, and completion feedback to support trust rather than spectacle.
_Avoid_: Heavy game effects, animation showcase

## Relationships

- A **Hire Me** call to action leads to the **Contact Page**.
- The **Contact Page** combines hiring intent with broader collaboration and verification needs.
- **Proof Bingo** uses the familiar bingo card pattern to organize trust-building evidence in the homepage hero.
- The **Hero Identity Anchor** supports **Proof Bingo** without competing with it.
- A **Proof Tile** can represent a technical skill, project evidence, work style, service capability, or personal signal.
- **Bingo Completion** turns selected **Proof Tile** evidence into a concise identity summary and a **Hire Me** call to action.
- **Proof Motion** clarifies selection, valid lines, and **Bingo Completion** without changing the site's Precision Minimalist character.

## Example Dialogue

> **Dev:** "Should the bingo completion link go to a separate **Hire Me** page?"
> **Domain expert:** "No — **Hire Me** is the action label, and the **Contact Page** is the destination."
> **Dev:** "Is **Proof Bingo** just the skills list rendered differently?"
> **Domain expert:** "No — it includes skills, project evidence, work style, service fit, and personal signal."
> **Dev:** "Should the homepage hero keep the Developer Mode prompt next to **Proof Bingo**?"
> **Domain expert:** "No — the hero should focus on **Proof Bingo** first, and Developer Mode can find a better placement later."
> **Dev:** "Can every **Proof Tile** just be a framework name?"
> **Domain expert:** "No — the grid should balance hard skills with project evidence, work style, service fit, and personality."
> **Dev:** "Should **Bingo Completion** feel like a game victory modal?"
> **Domain expert:** "No — it can start playfully, but it should land on a credible professional identity and contact action."
> **Dev:** "Should **Proof Motion** use a heavy animation library?"
> **Domain expert:** "No — CSS transitions and React state are enough for precise feedback."

## Flagged Ambiguities

- "hire-me" was used as though it were a separate destination — resolved: **Hire Me** is CTA wording, while **Contact Page** is the canonical destination.
- "bingo card" was used as a feature name — resolved: **Proof Bingo** is the feature concept, and bingo card is the UI pattern.
- "hero intro" was used broadly — resolved: **Hero Identity Anchor** is the concise identity text, while **Proof Bingo** carries the detailed first-screen narrative.
- "bingo格子" was used broadly — resolved: **Proof Tile** is the canonical term for a trust-building cell in **Proof Bingo**.
- "完成态" was used broadly — resolved: **Bingo Completion** is the trust-summary state, not a generic game win screen.
- "动画能力展示" was used broadly — resolved: **Proof Motion** is restrained interaction feedback, not a broad animation showcase.
