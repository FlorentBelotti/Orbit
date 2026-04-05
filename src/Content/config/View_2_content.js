import defaultContent from "../defaultContent";

const view2Content = {
  ...defaultContent,
  content: "Nero's contempt",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  labelStyle: {
    ...defaultContent.labelStyle,
    variant: "glass",
    background: "var(--label-capsule-bg-glass)",
    borderColor: "var(--label-border-glass)",
    shadowColor: "var(--label-shadow-deep)",
  },
};

export default view2Content;
