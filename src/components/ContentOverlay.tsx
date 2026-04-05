import type { CSSProperties } from "react";
import type {
  LabelContent,
  LabelPlacement,
  LabelStyle,
} from "../scene/sceneTypes";

type ContentOverlayProps = {
  item: LabelContent;
  viewIndex: number;
};

const defaultPlacement: LabelPlacement = {
  layer: "front",
  x: 12,
  y: 18,
};

const defaultStyle: LabelStyle = {
  variant: "glass",
  showTitle: true,
  showSubtitle: true,
  showBody: true,
};

export function ContentOverlay({ item, viewIndex }: ContentOverlayProps) {
  const placement = item.labelPlacement ?? defaultPlacement;
  const style = { ...defaultStyle, ...item.labelStyle };
  const variant = style.variant ?? "glass";
  const showTitle = style.showTitle ?? true;
  const showSubtitle = style.showSubtitle ?? true;
  const showBody = style.showBody ?? true;
  const capsuleBackground = style.capsuleColor ?? style.background;
  const subtitleColor = style.subtitleColor ?? style.tagColor;
  const bodyColor = style.bodyColor ?? style.textColor;
  const capsuleWidth = style.capsuleWidth ?? style.maxWidth;
  const bodyText =
    item.body ?? "Scroll to shift the camera to the next point of view.";

  const layerStyle = {
    "--label-x": `${placement.x}%`,
    "--label-y": `${placement.y}%`,
  } as CSSProperties;

  const cardStyle = {
    "--label-bg": capsuleBackground,
    "--label-border": style.borderColor,
    "--label-text": bodyColor,
    "--label-title": style.titleColor,
    "--label-tag": subtitleColor,
    "--label-shadow": style.shadowColor,
    "--label-width": toCssSize(capsuleWidth),
    "--label-align": style.textAlign,
    "--label-padding": toCssSize(style.capsulePadding),
    "--label-title-size": toCssSize(style.titleSize),
    "--label-subtitle-size": toCssSize(style.subtitleSize),
    "--label-body-size": toCssSize(style.bodySize),
  } as CSSProperties;

  return (
    <div
      className={`label-layer label-layer--${placement.layer}`}
      style={layerStyle}
      aria-hidden="true"
    >
      <div className={`label-card label-card--${variant}`} style={cardStyle}>
        {showSubtitle ? (
          <p className="label-tag">
            View {String(viewIndex + 1).padStart(2, "0")}
          </p>
        ) : null}
        {showTitle ? <h1 className="label-title">{item.content}</h1> : null}
        {showBody ? <p className="label-hint">{bodyText}</p> : null}
      </div>
    </div>
  );
}

function toCssSize(value?: number | string) {
  if (typeof value === "number") {
    return `${value}px`;
  }

  return value;
}
