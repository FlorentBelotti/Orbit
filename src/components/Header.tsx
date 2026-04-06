import type { RefObject } from "react";
import type { Viewpoint } from "../scene/sceneTypes";

type HeaderProps = {
  views: Viewpoint[];
  scrollRef: RefObject<HTMLDivElement>;
  activeViewIndex: number;
  isVisible: boolean;
};

const FALLBACK_LABEL_PREFIX = "View";

export function Header({
  views,
  scrollRef,
  activeViewIndex,
  isVisible,
}: HeaderProps) {
  const viewLabels = views.map((view, index) => getViewLabel(view, index));

  const handleJumpToView = (index: number) => {
    const scroll = scrollRef.current;
    if (!scroll) {
      return;
    }

    const target = scroll.querySelector<HTMLElement>(
      `[data-view-index="${index}"]`,
    );
    if (!target) {
      return;
    }

    scroll.scrollTo({
      top: target.offsetTop,
      behavior: getScrollBehavior(),
    });
  };

  return (
    <header className="site-header" data-visible={isVisible}>
      <div className="site-header__inner">
        <div className="site-header__brand">Seneca X Nero</div>
        <nav className="site-header__nav" aria-label="Scene navigation">
          {viewLabels.map((label, index) => (
            <button
              key={`view-${index}`}
              className="site-header__link"
              data-active={index === activeViewIndex}
              aria-current={index === activeViewIndex ? "step" : undefined}
              type="button"
              onClick={() => handleJumpToView(index)}
            >
              <span className="site-header__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="site-header__label">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function getViewLabel(view: Viewpoint, index: number) {
  const label = view.contents?.[0]?.content;
  if (label && label.trim().length > 0) {
    return label;
  }

  return `${FALLBACK_LABEL_PREFIX} ${String(index + 1).padStart(2, "0")}`;
}

function getScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") {
    return "auto";
  }

  const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  return prefersReducedMotion ? "auto" : "smooth";
}
