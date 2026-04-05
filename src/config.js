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
    presets: {
      lightScene: [0.0, 10, 30],
      lightLeftScene: [20, 10, 30],
      lightRightScene: [-20, 10, 30],
    },
  },
  transition: {
    durationMs: 1200,
    easing: "easeInOutCubic",
  },
  backgroundParticles: {
    enabled: true,
    count: 700,
    color: "#9aa6ff",
    opacity: 0.5,
    size: 0.3,
    bounds: [50, 24, 50],
    center: [0.0, 4.0, -12.0],
    drift: {
      amplitude: 0.25,
      speed: 0.18,
    },
  },
  views: [
    {
      contents: [view1Title],
      lightPreset: "lightScene",
      position: [30, 0, 15],
      target: [-2, 3, 0],
    },
    {
      contents: [view2Title, view2Content],
      lightPreset: "lightLeftScene",
      position: [5, 5, 10],
      target: [-4, 3.5, 0.0],
    },
    // {
    //   contents: [view2Title, view2Content],
    //   lightPreset: "lightLeftScene",
    //   position: [10, 5, 5],
    //   target: [-25, 3.5, 0.0],
    // },
    {
      contents: [view3Content],
      lightPreset: "lightRightScene",
      position: [5, 5, 10],
      target: [7.2, 3.5, 0.0],
    },
  ],
};

export default sceneConfig;
