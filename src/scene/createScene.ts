import {
  AmbientLight,
  Box3,
  Color,
  DirectionalLight,
  Object3D,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { SceneConfig, Viewpoint } from "./sceneTypes";
import { animateCameraTransition } from "./cameraTransition";

export function createScene(canvas: HTMLCanvasElement, config: SceneConfig) {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: config.renderer.antialias,
    powerPreference: "high-performance",
    alpha: true,
  });

  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(new Color(config.background), 0);

  const scene = new Scene();

  const camera = new PerspectiveCamera(
    config.camera.fov,
    1,
    config.camera.near,
    config.camera.far,
  );

  const ambient = new AmbientLight(
    config.lighting.ambient.color,
    config.lighting.ambient.intensity,
  );
  const keyLight = new DirectionalLight(
    config.lighting.key.color,
    config.lighting.key.intensity,
  );
  keyLight.position.set(...config.lighting.key.direction);

  scene.add(ambient, keyLight);

  const rig = {
    position: new Vector3(),
    target: new Vector3(),
  };

  let activeTransition: { stop: () => void } | null = null;
  let currentIndex = -1;

  const renderFrame = () => {
    camera.position.copy(rig.position);
    camera.lookAt(rig.target);
    renderer.render(scene, camera);
  };

  const applyView = (view: Viewpoint) => {
    rig.position.set(...view.position);
    rig.target.set(...view.target);
  };

  const setViewByIndex = (index: number, options?: { immediate?: boolean }) => {
    const view = config.views[index];

    if (!view || index === currentIndex) {
      return;
    }

    activeTransition?.stop();
    activeTransition = null;

    if (options?.immediate) {
      applyView(view);
      renderFrame();
      currentIndex = index;
      return;
    }

    const fromPos = rig.position.clone();
    const fromTarget = rig.target.clone();
    const toPos = new Vector3(...view.position);
    const toTarget = new Vector3(...view.target);

    activeTransition = animateCameraTransition({
      fromPos,
      toPos,
      fromTarget,
      toTarget,
      durationMs: config.transition.durationMs,
      easing: config.transition.easing,
      onUpdate: (pos, target) => {
        rig.position.copy(pos);
        rig.target.copy(target);
        renderFrame();
      },
      onComplete: () => {
        currentIndex = index;
        activeTransition = null;
      },
    });
  };

  const resize = () => {
    const { clientWidth, clientHeight } = canvas;

    if (!clientWidth || !clientHeight) {
      return;
    }

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, config.renderer.pixelRatioCap),
    );
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderFrame();
  };

  const dispose = () => {
    activeTransition?.stop();
    renderer.dispose();
  };

  const loader = new GLTFLoader();
  loader.load(
    config.model.url,
    (gltf) => {
      const model = gltf.scene;

      if (config.model.center) {
        const box = new Box3().setFromObject(model);
        const center = box.getCenter(new Vector3());
        model.position.sub(center);
      }

      applyModelTransform(model, config.model);
      scene.add(model);
      renderFrame();
    },
    undefined,
    () => {
      renderFrame();
    },
  );

  return {
    setViewByIndex,
    resize,
    dispose,
  };
}

function applyModelTransform(model: Object3D, config: SceneConfig["model"]) {
  const rotation = config.rotation;
  const offset = config.position;

  if (Array.isArray(config.scale)) {
    model.scale.set(config.scale[0], config.scale[1], config.scale[2]);
  } else {
    model.scale.setScalar(config.scale);
  }

  model.rotation.set(rotation[0], rotation[1], rotation[2]);
  model.position.add(new Vector3(offset[0], offset[1], offset[2]));
}
