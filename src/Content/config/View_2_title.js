import defaultContent from "../defaultContent";

const view2Title = {
  ...defaultContent,
  content: "Nero's contempt",
  labelPlacement: {
    layer: "behind",
    x: 5,
    y: 10,
  },
  labelStyle: {
    ...defaultContent.labelStyle,
    variant: "outline",
    background: "transparent",
    borderColor: "transparent",
    titleColor: "var(--label-title-hero)",
    shadowColor: "transparent",
    capsuleWidth: "var(--label-capsule-width-xxl)",
    capsulePadding: "var(--label-capsule-padding-none)",
    textAlign: "left",
    titleSize: "var(--font-size-xxl)",
    showTitle: true,
    showSubtitle: false,
    showBody: false,
  },
};

export default view2Title;
