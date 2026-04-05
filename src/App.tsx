import { useEffect, useRef, useState } from "react";
import sceneConfig from "./config.js";
import { ContentOverlay } from "./components/ContentOverlay";
import { ScrollSections } from "./components/ScrollSections";
import { createScene } from "./scene/createScene";
import { createScrollViewObserver } from "./scene/scrollViews";
import type { LabelContent, SceneConfig } from "./scene/sceneTypes";

const config = sceneConfig as SceneConfig;

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<ReturnType<typeof createScene> | null>(null);
  const views = config.views;
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [displayedContents, setDisplayedContents] = useState<
    DisplayedContent[]
  >(() => buildDisplayEntries(views[0]?.contents ?? [], 0));
  const hasMounted = useRef(false);

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

  useEffect(() => {
    const nextContents = activeView?.contents ?? [];

    if (!hasMounted.current) {
      hasMounted.current = true;
      setDisplayedContents(buildDisplayEntries(nextContents, activeViewIndex));
      return;
    }

    setDisplayedContents((prev) => {
      const exitId = Date.now();
      const exiting = prev.map((entry) => ({
        ...entry,
        isExiting: true,
        key: `${entry.key}-exit-${exitId}`,
      }));
      const next = buildDisplayEntries(nextContents, activeViewIndex);
      return [...exiting, ...next];
    });

    const timeoutId = window.setTimeout(() => {
      setDisplayedContents((prev) => prev.filter((entry) => !entry.isExiting));
    }, EXIT_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [activeViewIndex, activeView]);

  return (
    <div className="app">
      <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />
      {displayedContents.map((entry) => (
        <ContentOverlay
          key={entry.key}
          item={entry.item}
          viewIndex={entry.viewIndex}
          isExiting={entry.isExiting}
        />
      ))}
      <ScrollSections views={views} scrollRef={scrollRef} />
    </div>
  );
}

const EXIT_DURATION_MS = 450;

type DisplayedContent = {
  key: string;
  item: LabelContent;
  viewIndex: number;
  isExiting: boolean;
};

function buildDisplayEntries(contents: LabelContent[], viewIndex: number) {
  return contents.map((item, index) => ({
    key: `view-${viewIndex}-content-${index}-${slugify(item.content)}`,
    item,
    viewIndex,
    isExiting: false,
  }));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
