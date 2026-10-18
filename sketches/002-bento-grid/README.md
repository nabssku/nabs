# Variant 2: Bento Grid (sketches/002-bento-grid/)

## Design Stance
Modular bento grid system where every section is organized into distinct cards of varying sizes. Highly scannable, information-dense, yet structured and visually engaging.

## Key Choices
- **Layout**: Hero is structured as a bento grid (combining main bio card, avatar card, metrics cards, and quick social links). Journey/About section uses bento cards for education and freelance milestones.
- **Typography**: Playful contrast mixing Space Grotesk for bold headings and Fredoka for badges/subtitles.
- **Color Palette**: Neo-brutalism palette where individual bento cards feature distinct accent background colors (yellow, pink, blue, green, purple).
- **Skills**: Detailed progress bars embedded directly inside individual skill bento cells with quantitative percentage ratings.
- **Interactive Elements**: Card tilt/lift hover effect (`bento-card` translation and shadow scaling), mobile menu toggle, contact form confirmation state.

## Trade-offs
- **Pros**: Outstanding information density, highly organized, very modern modular look that allows users to quickly digest stats, skills, and projects at a glance.
- **Cons**: Requires structured card layouts that can feel dense on smaller mobile screens if not carefully responsive.

## Best For
Developers who want to showcase a rich set of metrics, skills, timelines, and projects simultaneously in a structured, dashboard-like bento presentation.
