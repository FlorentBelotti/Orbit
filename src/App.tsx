import { useEffect, useRef, useState } from "react";
import sceneConfig from "./config.js";
import { ContentOverlay } from "./components/ContentOverlay";
import { ScrollSections } from "./components/ScrollSections";
import { createScene } from "./scene/createScene";
import { createScrollViewObserver } from "./scene/scrollViews";
import type { SceneConfig } from "./scene/sceneTypes";

const config = sceneConfig as SceneConfig;

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<ReturnType<typeof createScene> | null>(null);
  const [activeViewIndex, setActiveViewIndex] = useState(0);

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
        setActiveViewIndex(index);
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

  useEffect(() => {
    document.documentElement.style.setProperty("--scene-bg", config.background);
  }, []);

  const activeView = views[activeViewIndex] ?? views[0];
  const activeContents = activeView?.contents ?? [];

  return (
    <div className="app">
      <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />
      {activeContents.map((item, contentIndex) => (
        <ContentOverlay
          key={`${activeViewIndex}-${contentIndex}-${item.content}`}
          item={item}
          viewIndex={activeViewIndex}
        />
      ))}
      <ScrollSections views={views} scrollRef={scrollRef} />
    </div>
  );
}
