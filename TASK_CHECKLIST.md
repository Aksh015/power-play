# Task Checklist

This checklist covers the assignment deliverables and the staged work needed to complete them. Items are checked only after they are actually completed and verified.

## Planning and scope

- [x] Read the assignment document.
- [x] Analyze the three required desktop views and the stated quality bar.
- [x] Record requirements, decisions, open decisions, and current status in `PROJECT_CONTEXT.md`.
- [x] Create and maintain this checklist.
- [x] Agree on the first implementation step before writing application code.
- [x] Choose React for the frontend, Node/Express for the backend, Vite for frontend tooling, and npm workspace run commands.
- [x] Define the implementation scope for the desktop reference without adding unrequested mobile work.

## Project setup

- [x] Create the root npm workspace.
- [x] Create the React/Vite client package under `client/`.
- [x] Create the Node/Express server package under `server/`.
- [x] Install React and React DOM.
- [x] Install Vite and the React Vite plugin.
- [x] Install Express and CORS.
- [x] Install development tooling: `concurrently` and `nodemon`.
- [x] Add a minimal React scaffold screen without assignment features.
- [x] Add the backend `GET /api/health` endpoint.
- [x] Add root scripts to start the client and server together, build the client, and start the server.
- [x] Verify the initial client production build with `npm run build`.
- [x] Verify local Vite and Express startup and the backend health response.
- [ ] Review and approve the scaffold before beginning assignment feature implementation.

## Listing page

- [x] Scaffold the application shell.
- [ ] Recreate the desktop header/navigation and its controls.
- [ ] Recreate the listing title and action controls.
- [ ] Recreate the hero image layout and image interactions.
- [ ] Recreate the property summary, amenities/details, rating/review information, and visible cards/sections shown by the reference.
- [ ] Recreate the reservation/price card and other visible callouts shown by the reference.
- [ ] Match reference typography, spacing, colours, borders, shadows, radii, icons, and imagery.
- [ ] Implement relevant hover, active, scroll, and transition states.

## Photo tour

- [ ] Open the photo tour from **Show all photos**.
- [ ] Open the photo tour from the applicable hero-image interaction.
- [ ] Recreate the photo-tour header and controls.
- [ ] Recreate the thumbnail strip/grid, labels, selected state, and gallery content layout.
- [ ] Recreate photo-tour scrolling and transitions.
- [ ] Provide a clear, accessible way to return to the listing page.

## Lightbox

- [ ] Open the lightbox from a gallery photo.
- [ ] Recreate the single-photo viewer layout, counter, close control, and navigation arrows.
- [ ] Implement previous/next navigation with correct boundaries or reference-equivalent behaviour.
- [ ] Implement keyboard `Left Arrow` and `Right Arrow` navigation.
- [ ] Implement keyboard-accessible close behaviour, including `Escape` if consistent with the reference/standard dialog behaviour.
- [ ] Match lightbox opening, closing, and photo-change animations/transitions.
- [ ] Restore focus to the triggering control after closing.

## Accessibility and behaviour

- [ ] Use semantic controls for buttons, links, navigation, and dialogs/overlays.
- [ ] Provide accessible names and useful alternative text for meaningful images.
- [ ] Ensure visible keyboard focus states.
- [ ] Keep keyboard focus inside an open modal/lightbox where appropriate.
- [ ] Prevent inappropriate background interaction while an overlay is open.
- [ ] Verify the main flows with keyboard-only navigation.
- [ ] Verify that the desktop layout remains stable at the target reference viewport sizes.

## Assets and data

- [ ] Establish an original, legally appropriate strategy for property images, icons, fonts, and other assets.
- [ ] Centralize property/photo metadata, labels, ordering, and counters.
- [ ] Ensure all displayed assets load reliably in a clean local build and deployment build.
- [ ] Avoid copying source code or other protected implementation details from the reference site.

## Architecture diagram

- [ ] Choose a diagram tool/format.
- [ ] Create a high-level production-scale vacation-rental marketplace architecture diagram.
- [ ] Show frontend delivery and scaling.
- [ ] Show backend/services and scaling.
- [ ] Show storage and its scaling/availability strategy.
- [ ] Show search and indexing.
- [ ] Show deployment and supporting infrastructure.
- [ ] Export the diagram as an image or PDF.
- [ ] Include the diagram in the final submission ZIP.

## AI workflow and project quality

- [ ] Decide which AI sub-agents/skills/configuration files are used.
- [ ] Include the required sub-agent/skill configuration files in the submission.
- [ ] Keep a chronological sequence of prompts used for AI-assisted development.
- [ ] Keep project structure clean and focused on the requested experience.
- [ ] Remove secrets and avoid committing generated caches or unnecessary build output.

## Validation

- [ ] Run the application locally from a clean install/build.
- [ ] Compare the listing page against the reference at the target desktop viewport.
- [ ] Compare the photo tour against the reference at the target desktop viewport.
- [ ] Compare the lightbox against the reference at the target desktop viewport.
- [ ] Test all documented entry points and exit paths between the three views.
- [ ] Test mouse, keyboard, focus, and overlay behaviour.
- [ ] Check console/build output for errors and warnings that affect quality.
- [ ] Verify the final production/deployment build.

## Submission

- [ ] Package the application code in a ZIP file.
- [ ] Include the architecture diagram image/PDF in the ZIP.
- [ ] Include required AI sub-agent/skill configuration files in the ZIP.
- [ ] Prepare the AI prompt sequence for submission.
- [ ] Confirm no secrets or unintended files are included.
- [ ] Confirm the code has not been pushed to a public GitHub repository.
- [ ] Submit the package according to the instructions shared by email.
