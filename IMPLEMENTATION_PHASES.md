# Airbnb Clone Implementation Phases

This roadmap is based on the assignment brief, `PROJECT_CONTEXT.md`, and
`TASK_CHECKLIST.md`. The reference URL from the Word document must not be
opened by the AI agent; visual details should be taken from the supplied
reference images and any manual inspection performed by the user.

## Phase 1: Establish the visual source of truth

- Review the embedded reference images in the assignment document.
- If available, manually inspect the reference URL without delegating access
  to the AI agent.
- Record the target desktop viewport size.
- Record the header height, content width, spacing, typography, colours,
  borders, radii, shadows, and visible sections.
- Identify the exact listing text, image ordering, aspect ratios, labels,
  controls, and overlay layouts.
- Decide which assets can be created originally and which require an
  appropriately licensed source.

## Phase 2: Create the application data model

- Add centralized listing data under `client/src/data/`.
- Store listing title, location, host, rating, reviews, price, amenities,
  description, rules, and photo metadata.
- Store photo ordering and labels in one source of truth.
- Reuse the same photo data for the hero gallery, photo tour, thumbnails,
  counters, and lightbox navigation.

## Phase 3: Build the static listing page

- Replace the scaffold screen with the listing-page shell.
- Build reusable components for the header, listing heading, hero gallery,
  property summary, amenities, description, reviews, and reservation card.
- Match the desktop reference layout before adding complex interactions.
- Keep the backend minimal because frontend/browser data is allowed.

## Phase 4: Add photo-tour and lightbox state

- Model overlay state explicitly:
  - `activeView`: listing, photo tour, or lightbox
  - `activePhotoIndex`
  - triggering element for focus restoration
- Open the photo tour from “Show all photos”.
- Open the photo tour from the applicable hero-image interaction.
- Open the lightbox from gallery photos.
- Implement close, previous, next, and boundary behavior.
- Implement `Escape`, `ArrowLeft`, and `ArrowRight`.
- Keep keyboard focus inside overlays where appropriate.
- Restore focus to the triggering control after closing.

## Phase 5: Add original and legally appropriate assets

- Create `client/src/assets/` or an equivalent asset location.
- Use original, generated, or properly licensed images.
- Use original SVGs or an appropriate icon library.
- Add fonts only when licensing and local loading are appropriate.
- Verify all assets work in clean local and production builds.
- Do not copy code or protected implementation details from the reference.

## Phase 6: Match interaction and accessibility requirements

- Use semantic buttons, links, navigation, and dialogs.
- Add useful alternative text to meaningful images.
- Provide visible keyboard focus states.
- Prevent inappropriate background interaction while overlays are open.
- Match relevant hover, active, scroll, transition, and animation states.
- Test the primary flows using keyboard-only navigation.

## Phase 7: Create the architecture diagram

- Choose a diagram format such as Excalidraw, SVG, PNG, or PDF.
- Show users, CDN/edge delivery, frontend delivery, API gateway or load
  balancer, backend services, storage, search/indexing, deployment, and
  observability.
- Show the scaling and availability strategy for frontend, backend,
  storage, search, and deployment.
- Export the diagram and include it in the final submission ZIP.

## Phase 8: Add AI workflow deliverables

- Keep a chronological sequence of prompts used during development.
- Add the required AI sub-agent or skill configuration files.
- Keep project-specific AI instructions with the submission materials.
- Ensure the workflow files do not contain secrets.

## Phase 9: Validate the finished project

- Run `npm install` from a clean checkout or archive.
- Run `npm run build`.
- Run `npm run dev`.
- Compare the listing page, photo tour, and lightbox at the target desktop
  viewport.
- Test all mouse and keyboard entry, exit, and navigation paths.
- Check focus behavior, image loading, transitions, console output, and build
  warnings.
- Verify the final production/deployment build.

## Phase 10: Prepare the final ZIP

- Include the application source.
- Include the architecture diagram image or PDF.
- Include the AI prompt sequence.
- Include AI sub-agent or skill configuration files.
- Include package manifests and run instructions.
- Exclude `node_modules/`, generated build output, caches, secrets, and
  unnecessary temporary files.
- Do not push the code to a public GitHub repository.
