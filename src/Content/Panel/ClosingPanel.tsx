import panelContent from "./panelContent";

export function ClosingPanel() {
  return (
    <section className="closing-section" data-closing-section>
      <div className="closing-panel" data-closing-panel>
        <div className="closing-inner">
          <p className="closing-kicker">{panelContent.kicker}</p>
          <h2>{panelContent.title}</h2>
          <p>{panelContent.intro}</p>
          <div className="closing-columns">
            {panelContent.columns.map((column) => (
              <div key={column.title}>
                <h3>{column.title}</h3>
                <p>{column.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
