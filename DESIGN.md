# Design

## Style

Crayon Dev Diary: a hand-drawn programmer notebook with loose marker fills, paper texture, crooked sticky notes, pencil borders, and small code-life annotations.

## Color

Use OKLCH tokens in CSS. The palette is full and expressive, derived from the user's requested colors and the impeccable amber seed:

- Background: off-white sketchbook paper.
- Ink: near-black pencil graphite.
- Blue: hand-painted backend highlight.
- Yellow: sticky-note surfaces and primary calls to action.
- Pink: marker emphasis and handwritten edits.
- Green: skill tape and success accents.
- Amber: tiny stars, tape, and warm marks.

## Typography

Use `ZCOOL KuaiLe` for expressive Chinese headings and `LXGW WenKai` for handwritten body copy. Use `Comic Neue` and `JetBrains Mono` for small English and code fragments. Rotate and offset selected labels slightly, but keep body text readable.

## Layout

The homepage behaves like one notebook spread: asymmetric hero, doodle portrait panel, loose navigation, skill strip, recent notes, project stickers, and about-file fragments. Sections should look placed on paper rather than aligned to a strict grid.

## Components

- Hand-drawn navigation with marker underline.
- Torn tape labels.
- Irregular paper notes for projects and posts.
- Pencil-outline frames with non-uniform radii.
- Marker highlights behind important words.
- Doodle symbols for backend concepts: braces, bug, SQL table, API arrows.

## Motion

Use small hover jitter on interactive notes and buttons. Page entrance should feel like paper settling on a desk. Disable nonessential motion under `prefers-reduced-motion`.
