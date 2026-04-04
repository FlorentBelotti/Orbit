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
      label: "The Scene",
      position: [30, 0, 15],
      target: [-2, 3, 0],
    },
    {
      label: "Nero's contempt",
      position: [5, 5, 10],
      target: [-3, 3.5, 0.0],
    },
    {
      label: "Seneca's pledge",
      position: [5, 5, 10],
      target: [7, 3.5, 0.0],
    },
  ],
};

export default sceneConfig;
