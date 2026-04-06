import type { RefObject } from "react";
import type { Viewpoint } from "../scene/sceneTypes";

type ScrollSectionsProps = {
  views: Viewpoint[];
  scrollRef: RefObject<HTMLDivElement>;
};

export function ScrollSections({ views, scrollRef }: ScrollSectionsProps) {
  return (
    <div ref={scrollRef} className="scroll" aria-hidden="true">
      {views.map((view, index) => (
        <section
          key={`view-${index}`}
          className="scroll-section"
          data-view-index={index}
        />
      ))}
    </div>
  );
}
