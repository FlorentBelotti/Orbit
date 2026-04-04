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

Edit only `src/config.js` to add or tweak viewpoints, lighting, or transitions.

- Add a new view: append a new object to `views` with `label`, `position`, and `target`.
- Change lighting: update `lighting.ambient` or `lighting.key`.
- Adjust transitions: edit `transition.durationMs` or `transition.easing`.
- Fit the model: tweak `model.scale`, `model.rotation`, and `model.position`.

## Structure

- `src/App.tsx`: UI layout and scene lifecycle.
- `src/scene/createScene.ts`: Three.js setup, model loading, and render calls.
- `src/scene/scrollViews.ts`: Scroll section observer.
- `src/scene/cameraTransition.ts`: Camera tweening.
