# Project Context

## Project

Build an original, desktop-only clone of the Airbnb listing page at:

<https://airbnb-clone-umber-two.vercel.app>

The reference page is the visual and behavioural source of truth. The assignment document is:

`Playpower Labs Assignment_ Airbnb-Clone App.docx`

## Assignment requirements

The application must reproduce three desktop views:

1. **Listing Page** — the complete property listing page, including its layout, spacing, typography, colours, icons, imagery, and interactions.
2. **Photo Tour** — the full-screen photo gallery opened from **Show all photos** or a hero image. It must reproduce the gallery layout and behaviour.
3. **Lightbox** — a single-photo viewer opened from a gallery photo, with previous/next arrows, keyboard `Left Arrow`/`Right Arrow` navigation, and matching transitions/animations.

The implementation is desktop-only; a mobile layout is explicitly not required.

## Quality bar

- Match the reference as precisely as possible: layout, spacing, typography, colours, icons, assets, and content presentation.
- Reproduce relevant hover states, scroll animations, transitions, and overlay behaviour.
- Support keyboard navigation, sensible focus management, and accessible controls/labels.
- Keep the implementation original. Do not directly lift and shift the reference site’s codebase or plagiarize its implementation.
- Use AI-assisted development and retain the prompt sequence used during development for submission.

## Technology and architecture constraints

- The technology stack is flexible. React, Next.js, or Angular are suggested frontend options.
- A backend is optional. Data may remain in the frontend/browser if that keeps the implementation focused.
- Any free hosting platform may be used for deployment.
- Submit a high-level production-scale architecture diagram for a vacation-rental marketplace. It should show the scaling strategy for:
  - frontend delivery;
  - backend/services;
  - storage;
  - search;
  - deployment.
- Include AI sub-agent/skill configuration files in the submission.

## Submission deliverables

- A ZIP containing the application code.
- The architecture diagram as an image or PDF, included with the submission ZIP.
- The sequence of prompts used for AI-assisted development, available for the assignment submission process.
- Do not push the code to a public GitHub repository.

## Reference material found in the assignment document

The DOCX contains embedded reference images showing:

- the main listing page;
- the Playpower logo/branding asset;
- the lightbox view with a large image, counter, close control, and navigation arrows;
- the photo-tour view with a thumbnail strip, labels, back/share/favourite controls, and gallery content.

These images are reference material for analysis, not yet application assets.

## Current status

**Phase:** Basic project scaffold complete; assignment feature implementation is pending.

- The assignment document has been read and analyzed.
- The project has a minimal Node/Express backend and React/Vite frontend.
- No listing-page, photo-tour, or lightbox feature has been implemented.
- The scaffold has been run locally and the initial production client build succeeds.
- `TASK_TRACKER.md` was shown as an open IDE tab but was not present on disk when the project was first inspected.
- `PROJECT_CONTEXT.md` and `TASK_CHECKLIST.md` are maintained as the project planning records.
- No final component structure, data model, asset strategy, architecture diagram, or deployment target has been chosen yet.

## Project structure

```text
client/                 React/Vite frontend
  src/App.jsx           Temporary scaffold screen and backend health check
  src/main.jsx          React entry point
  src/index.css         Temporary scaffold styles
  vite.config.js        Vite + React configuration
server/                 Node/Express backend
  src/index.js          Express app and GET /api/health
package.json            npm workspace scripts
package-lock.json       Locked dependency tree
```

## Local development setup

- Node.js: `v22.16.0` observed locally.
- npm: `11.4.2` observed locally.
- Frontend: React `19.2.8`, Vite `8.2.2`, and `@vitejs/plugin-react` `6.1.1`.
- Backend: Express `5.2.1` and CORS `2.8.6`.
- Development tooling: `concurrently` `10.0.5` and `nodemon` `3.1.14`.
- `npm install` installs the workspace dependencies.
- `npm run dev` starts both services: Vite at `http://localhost:5173` and Express at `http://localhost:3001`.
- `npm run build` creates the initial Vite production build.
- The frontend checks `GET http://localhost:3001/api/health` and displays the connection status only as a scaffold verification.

## Decisions made

- Work will proceed in small, reviewable stages.
- The initial setup stage is intentionally limited to a runnable scaffold; assignment features wait for a later instruction.
- Scope is desktop-only, as allowed by the assignment.
- The backend will use Node.js with Express.
- The frontend will use React with Vite.
- The client and server are organized as npm workspaces under one project root.
- The initial backend surface is limited to `GET /api/health`; no assignment data or business logic has been added.
- CORS is enabled for local development because the Vite and Express services run on separate ports.
- The implementation must be original rather than copied from the reference site.

## Decisions still to make

- Source and licensing strategy for the property images, icons, fonts, and other visual assets.
- Exact interaction/state model for the listing page, photo tour, and lightbox.
- Whether any persistence is needed for controls such as save/favourite.
- Architecture-diagram format/tool and the production-scale components to depict.
- AI sub-agent/skill configuration format and prompt-log location.
- Deployment target and final validation procedure.

## Important implementation notes for later stages

- Treat the reference page and screenshots as the authority for visual details; avoid inventing alternate responsive behaviour that is outside the desktop scope.
- Model overlay state explicitly so opening, closing, switching between photo tour and lightbox, arrow navigation, keyboard navigation, and focus restoration can be tested independently.
- Keep the photo set and labels centralized so thumbnails, hero images, counters, and lightbox navigation cannot drift out of sync.
- Verify accessibility and keyboard behaviour as part of implementation, not only at the end.
- Keep the final archive clean: include source, required configuration, architecture diagram, and AI workflow/config files; exclude secrets and unnecessary build/cache output.

## Suggested next step

Review the scaffold and make a small UI-planning decision before implementing features: map the reference listing screenshot into a component/data outline and identify the exact desktop viewport, typography, image set, and visible sections to reproduce first. The next implementation stage should likely build only the static listing-page shell, leaving photo-tour and lightbox behaviour for a separate reviewed stage.
