import defaultContent from "../defaultContent";

const view3Content = {
  ...defaultContent,
  content: "Seneca's pledge",
  labelPlacement: {
    layer: "behind",
    x: 70,
    y: 30,
  },
  labelStyle: {
    ...defaultContent.labelStyle,
    variant: "glass",
    background: "var(--label-capsule-bg-glass)",
    borderColor: "var(--label-border-glass)",
    bodyColor: "var(--label-body-soft)",
    shadowColor: "var(--label-shadow-deep)",
    textAlign: "right",
    showTitle: false,
    showSubtitle: false,
    showBody: true,
  },
};

export default view3Content;
