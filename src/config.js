import view1Title from "./Content/config/View_1_title";
import view2Content from "./Content/config/View_2_content";
import view2Title from "./Content/config/View_2_title";
import view3Content from "./Content/config/View_3_content";

const sceneConfig = {
  background: "#070812",
  renderer: {
    antialias: true,
    pixelRatioCap: 1.5,
  },
  camera: {
    fov: 32,
    near: 0.1,
    far: 200,
  },
  model: {
    url: "/nero_and_seneca.glb",
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    center: true,
  },
  lighting: {
    ambient: {
      color: "#2a2f4a",
      intensity: 1,
    },
    key: {
      color: "#8fa1e6",
      intensity: 2.4,
      direction: [2.2, 3.4, 1.2],
    },
  },
  transition: {
    durationMs: 1200,
    easing: "easeInOutCubic",
  },
  views: [
    {
      contents: [view1Title],
      position: [30, 0, 15],
      target: [-2, 3, 0],
    },
    {
      contents: [view2Title, view2Content],
      position: [5, 5, 10],
      target: [-3, 3.5, 0.0],
    },
    {
      contents: [view3Content],
      position: [5, 5, 10],
      target: [7, 3.5, 0.0],
    },
  ],
};

export default sceneConfig;
