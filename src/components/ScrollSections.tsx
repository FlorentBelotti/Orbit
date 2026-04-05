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
      <section className="closing-section" data-closing-section>
        <div className="closing-panel" data-closing-panel>
          <div className="closing-inner">
            <p className="closing-kicker">Epilogue</p>
            <h2>Notes from the marble</h2>
            <p>
              The experience transitions into a quiet archive: a place to read,
              reflect, and linger after the final viewpoint fades.
            </p>
            <div className="closing-columns">
              <div>
                <h3>Context</h3>
                <p>
                  The scroll journey is now complete. This panel behaves like a
                  regular page, with long-form text, links, or credits.
                </p>
              </div>
              <div>
                <h3>Credits</h3>
                <p>
                  Add your sources, acknowledgments, or next steps here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
