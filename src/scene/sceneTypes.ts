export type Vec3 = [number, number, number];

export type EasingName = "linear" | "easeInOutCubic" | "easeOutCubic";

export type Viewpoint = {
  label: string;
  position: Vec3;
  target: Vec3;
};

export type LightingConfig = {
  ambient: {
    color: string;
    intensity: number;
  };
  key: {
    color: string;
    intensity: number;
    direction: Vec3;
  };
};

export type TransitionConfig = {
  durationMs: number;
  easing: EasingName;
};

export type ModelConfig = {
  url: string;
  position: Vec3;
  rotation: Vec3;
  scale: number | Vec3;
  center: boolean;
};

export type RendererConfig = {
  pixelRatioCap: number;
  antialias: boolean;
};

export type CameraConfig = {
  fov: number;
  near: number;
  far: number;
};

export type SceneConfig = {
  background: string;
  renderer: RendererConfig;
  camera: CameraConfig;
  model: ModelConfig;
  lighting: LightingConfig;
  transition: TransitionConfig;
  views: Viewpoint[];
};
