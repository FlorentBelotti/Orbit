export type Vec3 = [number, number, number];

export type EasingName = "linear" | "easeInOutCubic" | "easeOutCubic";

export type LabelLayer = "front" | "behind";

export type LabelPlacement = {
  layer: LabelLayer;
  x: number;
  y: number;
};

export type LabelStyleVariant = "glass" | "solid" | "outline";

export type LabelStyle = {
  variant?: LabelStyleVariant;
  background?: string;
  capsuleColor?: string;
  capsuleWidth?: number | string;
  capsulePadding?: number | string;
  borderColor?: string;
  textColor?: string;
  bodyColor?: string;
  titleColor?: string;
  tagColor?: string;
  subtitleColor?: string;
  shadowColor?: string;
  maxWidth?: number | string;
  titleSize?: number | string;
  subtitleSize?: number | string;
  bodySize?: number | string;
  textAlign?: "left" | "center" | "right";
  showTitle?: boolean;
  showSubtitle?: boolean;
  showBody?: boolean;
};

export type LabelContent = {
  content: string;
  body?: string;
  labelPlacement?: LabelPlacement;
  labelStyle?: LabelStyle;
};

export type Viewpoint = {
  contents: LabelContent[];
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
