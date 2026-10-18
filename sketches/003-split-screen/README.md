# Variant 3: Split Screen (sketches/003-split-screen/)

## Design Stance
Editorial split-screen layout where the left 40% serves as a sticky identity and navigation panel, while the right 60% contains scrollable content sections. Clean, structured, and sophisticated.

## Key Choices
- **Layout**: 40/60 sticky side-by-side split on desktop (collapsing gracefully to a top bar on mobile). Left panel anchors avatar, bio, active section highlights, and socials. Right panel streams through overview, about timeline, projects, skills, and contact.
- **Typography**: Space Grotesk for bold editorial headings and Plus Jakarta Sans for crystal-clear readability.
- **Color Palette**: Restrained Neo-Brutalism palette anchored by warm cream (`#FFFDF7`), stark black borders, and vibrant yellow (`#FDE047`) sidebar with targeted pops of accent colors.
- **Skills & Experience**: Clean timeline list for educational milestones and compact grid cards with proficiency indicator dots for tech stack.
- **Interactive Elements**: Scroll spy using Intersection Observer that dynamically highlights active navigation links in the sticky sidebar as the user scrolls through sections; interactive contact form with success feedback.

## Trade-offs
- **Pros**: Outstanding desktop editorial feel, persistent identity and navigation always visible on screen, smooth reading flow.
- **Cons**: Requires desktop viewport width to fully shine; mobile view collapses into a stacked vertical layout.

## Best For
Developers looking for an editorial, portfolio-magazine feel with persistent sidebar navigation and smooth scroll-spy interaction.
