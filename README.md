# Nero and Seneca - Scroll Camera POC

A minimal scroll-driven 3D scene where each scroll section snaps the camera to a new viewpoint around the statue.

## Run

```bash
npm install
npm run dev
```

## How it works

- `src/config.js` is the single source of truth for camera viewpoints, lighting, model transform, and transition timing.
- Each entry in `views` becomes a scroll section in the UI.
- When a section becomes active, the camera transitions smoothly to that view.

### Code flow

1. `App` builds the scroll sections from `config.views` and creates the Three.js scene.
2. `createScrollViewObserver` watches which section is in view.
3. When a new section becomes active, `setViewByIndex` is called.
4. `animateCameraTransition` interpolates camera position and target using the configured easing.
5. The renderer draws a frame on each animation step.

## Configuration

Edit only `src/config.js` to add or tweak viewpoints, lighting, or transitions. A single archetype lives in `src/Content/defaultContent.js`, while view-specific entries live in `src/Content/config`.

- Add a new view: append a new object to `views` with `contents`, `position`, `target`.
- Add multiple labels per view: push more entries into `contents`.
- Provide custom body text per label with `body` inside a `contents` entry.
- Change lighting: update `lighting.ambient` or `lighting.key`.
- Per-view lighting: set `lighting.presets` and choose a `lightPreset` per view.
- Adjust transitions: edit `transition.durationMs` or `transition.easing`.
- Background particles: tweak `backgroundParticles` for star count, color, and drift.
- Fit the model: tweak `model.scale`, `model.rotation`, and `model.position`.
- Move labels: set `labelPlacement` with `{ layer: "front" | "behind", x, y }` where `x` and `y` are viewport percentages.
- Restyle labels: set `labelStyle` with size and visibility controls like `titleSize`, `subtitleSize`, `bodySize`, `capsuleWidth`, `capsulePadding`, `showTitle`, `showSubtitle`, `showBody`.
- Animate labels: set `labelMotion.entrance` and `labelMotion.exit` to `top`, `bottom`, `left`, `right`, or `none`.
- Use presets: import `defaultContent` and override just the fields you need for each content entry.
- Name content entries consistently (example files: `View_1_title`, `View_1_content`).
- Control label colors with `titleColor`, `subtitleColor`, `bodyColor`, `background` (capsule color), `borderColor`, and `shadowColor`.

## Structure

- `src/App.tsx`: UI layout and scene lifecycle.
- `src/scene/createScene.ts`: Three.js setup, model loading, and render calls.
- `src/scene/scrollViews.ts`: Scroll section observer.
- `src/scene/cameraTransition.ts`: Camera tweening.
- `src/styles/colors.css`: color tokens used across the app.
- `src/styles/effects.css`: gradients, shadows, and other visual effects.
- `src/styles/fonts.css`: font imports and font-family tokens.
