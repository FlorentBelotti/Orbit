import { useEffect, useRef } from "react";
import sceneConfig from "./config.js";
import { createScene } from "./scene/createScene";
import { createScrollViewObserver } from "./scene/scrollViews";
import type { SceneConfig } from "./scene/sceneTypes";

const config = sceneConfig as SceneConfig;

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<ReturnType<typeof createScene> | null>(null);

  const views = config.views;

  useEffect(() => {
    const canvas = canvasRef.current;
    const scroll = scrollRef.current;

    if (!canvas || !scroll) {
      return;
    }

    const scene = createScene(canvas, config);
    sceneRef.current = scene;

    if (views.length > 0) {
      scene.setViewByIndex(0, { immediate: true });
    }

    const sections = Array.from(
      scroll.querySelectorAll<HTMLElement>("[data-view-index]"),
    );

    const stopObserving = createScrollViewObserver(
      scroll,
      sections,
      (index) => {
        scene.setViewByIndex(index);
      },
    );

    const handleResize = () => {
      scene.resize();
    };

    window.addEventListener("resize", handleResize);
    requestAnimationFrame(() => scene.resize());

    return () => {
      stopObserving();
      window.removeEventListener("resize", handleResize);
      scene.dispose();
    };
  }, []);

  return (
    <div className="app">
      <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />
      <div ref={scrollRef} className="scroll">
        {views.map((view, index) => (
          <section
            key={view.label}
            className="scroll-section"
            data-view-index={index}
          >
            <div className="section-inner">
              <p className="section-tag">
                View {String(index + 1).padStart(2, "0")}
              </p>
              <h1>{view.label}</h1>
              <p className="section-hint">
                Scroll to shift the camera to the next point of view.
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
