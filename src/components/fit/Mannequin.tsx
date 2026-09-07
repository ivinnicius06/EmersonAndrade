"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { Measurements } from "@/lib/fit";

type Runtime = {
  update: (m: Measurements) => void;
  turn: (angle: number) => void;
};
type Ring = [number, number, number];
// A continuous elliptical surface, not stacked primitives: radii vary along the torso.
function torsoGeometry(m: Measurements) {
  const volume = 1 + (m.weight - 78) * 0.0017;
  const chest = m.chest / 104,
    waist = m.waist / 88,
    hips = m.hips / 100;
  const rings: Ring[] = [
    [0.78, 0.08, 0.08],
    [0.83, 0.143 * hips, 0.101 * hips],
    [0.9, 0.16 * hips, 0.106 * hips],
    [1.0, 0.143 * waist, 0.101 * waist],
    [1.11, 0.147 * waist, 0.105 * waist],
    [1.22, 0.179 * chest, 0.113 * chest],
    [1.34, 0.193 * chest, 0.107 * chest],
    [1.4, m.shoulders / 235, 0.087],
    [1.44, 0.15, 0.075],
    [1.48, 0.062, 0.058],
    [1.54, 0.055, 0.054],
  ];
  const points = rings.map(
    ([y, x, z]) => new THREE.Vector3(x * volume, y, z * volume),
  );
  const curve = new THREE.CatmullRomCurve3(points);
  const verts: number[] = [],
    indices: number[] = [];
  const rows = 64,
    segments = 64;
  for (let i = 0; i <= rows; i++) {
    const p = curve.getPoint(i / rows);
    for (let j = 0; j <= segments; j++) {
      const a = (j / segments) * Math.PI * 2;
      verts.push(p.x * Math.cos(a), p.y, p.z * Math.sin(a));
    }
  }
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < segments; j++) {
      const a = i * (segments + 1) + j,
        b = a + segments + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}
function limbGeometry(rings: [number, number, number, number][]) {
  const curve = new THREE.CatmullRomCurve3(
    rings.map(([y, r, x]) => new THREE.Vector3(r, y, x)),
  );
  const verts: number[] = [],
    indices: number[] = [];
  const rows = 56,
    segments = 40;
  for (let i = 0; i <= rows; i++) {
    const p = curve.getPoint(i / rows);
    for (let j = 0; j <= segments; j++) {
      const a = (j / segments) * Math.PI * 2;
      verts.push(p.z + p.x * Math.cos(a), p.y, p.x * Math.sin(a) * 1.06);
    }
  }
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < segments; j++) {
      const a = i * (segments + 1) + j,
        b = a + segments + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}
export default function Mannequin({
  measurements,
  active,
}: {
  measurements: Measurements;
  active: string;
}) {
  const host = useRef<HTMLDivElement>(null),
    runtime = useRef<Runtime | null>(null);
  const latest = useRef(measurements);
  latest.current = measurements;
  const [unavailable, setUnavailable] = useState(false);
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const el = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setUnavailable(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    el.prepend(renderer.domElement);
    renderer.domElement.setAttribute(
      "aria-label",
      "Manequim masculino 3D. Arraste para girar ou use os botões de rotação.",
    );
    renderer.domElement.setAttribute("role", "img");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20);
    camera.position.set(0, 1.05, 3.9);
    camera.lookAt(0, 0.9, 0);
    const ambient = new THREE.HemisphereLight(0xffffff, 0x7c786d, 2.1);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xfff6e7, 3.5);
    key.position.set(-2, 4, 3);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -2;
    key.shadow.camera.right = 2;
    key.shadow.camera.top = 3;
    key.shadow.camera.bottom = -2;
    key.shadow.normalBias = 0.015;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xe7f1f2, 2);
    fill.position.set(2, 2, -1);
    scene.add(fill);
    const material = new THREE.MeshStandardMaterial({
      color: 0xaaa99d,
      roughness: 0.67,
      metalness: 0.14,
    });
    const body = new THREE.Group();
    scene.add(body);
    const torso = new THREE.Mesh(torsoGeometry(latest.current), material);
    torso.castShadow = true;
    body.add(torso);
    function ellipsoid(
      position: [number, number, number],
      scale: [number, number, number],
    ) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 40, 32),
        material,
      );
      mesh.position.set(...position);
      mesh.scale.set(...scale);
      mesh.castShadow = true;
      body.add(mesh);
      return mesh;
    }
    // Faceless, elongated editorial head and restrained, relaxed proportions.
    ellipsoid([0, 1.635, 0], [0.086, 0.121, 0.084]);
    const legs: THREE.Mesh[] = [];
    const arms: THREE.Mesh[] = [];
    for (const side of [-1, 1]) {
      const leg = new THREE.Mesh(
        limbGeometry([
          [0.05, 0.032, side * 0.091, 0],
          [0.12, 0.033, side * 0.092, 0],
          [0.27, 0.05, side * 0.092, 0],
          [0.37, 0.056, side * 0.092, 0],
          [0.48, 0.049, side * 0.091, 0],
          [0.55, 0.054, side * 0.087, 0],
          [0.7, 0.078, side * 0.081, 0],
          [0.83, 0.083, side * 0.075, 0],
          [0.91, 0.065, side * 0.069, 0],
        ]),
        material,
      );
      leg.castShadow = true;
      body.add(leg);
      legs.push(leg);
      ellipsoid([side * 0.089, 0.064, 0.034], [0.052, 0.052, 0.117]);
      const arm = new THREE.Mesh(
        limbGeometry([
          [0.68, 0.006, side * 0.282, 0],
          [0.72, 0.027, side * 0.282, 0],
          [0.78, 0.029, side * 0.28, 0],
          [0.82, 0.026, side * 0.28, 0],
          [0.92, 0.038, side * 0.277, 0],
          [1.04, 0.044, side * 0.267, 0],
          [1.1, 0.045, side * 0.261, 0],
          [1.22, 0.057, side * 0.242, 0],
          [1.34, 0.063, side * 0.221, 0],
          [1.4, 0.046, side * 0.207, 0],
          [1.43, 0.007, side * 0.201, 0],
        ]),
        material,
      );
      arm.castShadow = true;
      body.add(arm);
      arms.push(arm);
    }
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.44, 0.46, 0.045, 80),
      new THREE.MeshStandardMaterial({ color: 0xc9c8be, roughness: 0.85 }),
    );
    pedestal.position.y = -0.017;
    pedestal.receiveShadow = true;
    scene.add(pedestal);
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: 0.15 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.04;
    floor.receiveShadow = true;
    scene.add(floor);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x767e73,
      transparent: true,
      opacity: 0.6,
    });
    const guideGroup = new THREE.Group();
    body.add(guideGroup);
    let frame = 0,
      visible = true,
      dragging = false,
      lastX = 0,
      targetRotation = 0;
    let current = { ...latest.current },
      target = { ...current };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updateBody() {
      const next = torsoGeometry(current);
      torso.geometry.dispose();
      torso.geometry = next;
      body.scale.y = current.height / 178;
      const volume = 1 + (current.weight - 78) * 0.0017;
      legs.forEach((mesh) => {
        mesh.scale.x = (current.hips / 100) * volume;
        mesh.scale.z = volume;
      });
      arms.forEach((mesh, i) => {
        mesh.position.x = ((i === 0 ? -1 : 1) * (current.shoulders - 47)) / 235;
      });
      while (guideGroup.children.length) {
        const child = guideGroup.children[0] as THREE.Line;
        child.geometry.dispose();
        guideGroup.remove(child);
      }
      const specs: [string, number, number][] = [
        ["shoulders", 1.4, current.shoulders / 235],
        ["chest", 1.31, ((0.193 * current.chest) / 104) * volume],
        ["waist", 1.06, ((0.147 * current.waist) / 88) * volume],
        ["hips", 0.9, ((0.16 * current.hips) / 100) * volume],
      ];
      for (const [name, y, r] of specs) {
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-r - 0.09, y, 0.14),
            new THREE.Vector3(r + 0.09, y, 0.14),
          ]),
          lineMat,
        );
        line.userData.name = name;
        guideGroup.add(line);
      }
    }
    function draw() {
      frame = 0;
      if (!visible) return;
      let moving = false;
      for (const k of Object.keys(current) as (keyof Measurements)[]) {
        const d = target[k] - current[k];
        if (Math.abs(d) > 0.015) {
          current[k] += d * (reduce.matches ? 1 : 0.18);
          moving = true;
        } else current[k] = target[k];
      }
      if (moving) updateBody();
      const delta = targetRotation - body.rotation.y;
      if (Math.abs(delta) > 0.001) {
        body.rotation.y += delta * (reduce.matches ? 1 : 0.16);
        moving = true;
      }
      body.updateMatrixWorld(true);
      guideGroup.children.forEach((child) => {
        const name = child.userData.name;
        const label = el.querySelector<HTMLElement>(`[data-measure="${name}"]`);
        if (!label) return;
        const pos = (child as THREE.Line).geometry.getAttribute("position");
        const endpoint = name === "shoulders" || name === "waist" ? 0 : 1;
        const p = new THREE.Vector3(
          pos.getX(endpoint),
          pos.getY(endpoint),
          pos.getZ(endpoint),
        )
          .applyMatrix4(body.matrixWorld)
          .project(camera);
        label.style.left = `${(p.x * 0.5 + 0.5) * el.clientWidth}px`;
        label.style.top = `${(-p.y * 0.5 + 0.5) * el.clientHeight}px`;
      });
      renderer.render(scene, camera);
      if (moving) frame = requestAnimationFrame(draw);
    }
    function requestDraw() {
      if (!frame && visible) frame = requestAnimationFrame(draw);
    }
    runtime.current = {
      update(m) {
        target = { ...m };
        requestDraw();
      },
      turn(angle) {
        targetRotation = angle;
        requestDraw();
      },
    };
    const resize = new ResizeObserver(() => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      requestDraw();
    });
    resize.observe(el);
    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) requestDraw();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0 },
    );
    intersection.observe(el);
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (dragging) {
        targetRotation += (e.clientX - lastX) * 0.008;
        lastX = e.clientX;
        requestDraw();
      }
    };
    const up = () => {
      dragging = false;
    };
    const lost = (e: Event) => {
      e.preventDefault();
      setUnavailable(true);
    };
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerup", up);
    renderer.domElement.addEventListener("pointercancel", up);
    renderer.domElement.addEventListener("webglcontextlost", lost);
    updateBody();
    requestDraw();
    return () => {
      runtime.current = null;
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerup", up);
      renderer.domElement.removeEventListener("pointercancel", up);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose();
        }
      });
      material.dispose();
      lineMat.dispose();
      (pedestal.material as THREE.Material).dispose();
      (floor.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  useEffect(() => {
    runtime.current?.update(measurements);
  }, [measurements]);
  return (
    <div className="mannequin-wrap">
      <div ref={host} className="mannequin-canvas">
        {!unavailable &&
          (["shoulders", "chest", "waist", "hips"] as const).map((key, i) => (
            <div
              key={key}
              data-measure={key}
              className={`measure-label ${active === key ? "active" : ""}`}
            >
              <span>{["OMBROS", "TÓRAX", "CINTURA", "QUADRIL"][i]}</span>
              <b>
                {measurements[key]} <small>cm</small>
              </b>
            </div>
          ))}
        {unavailable && (
          <div className="webgl-fallback">
            <p>A visualização 3D não está disponível neste navegador.</p>
            <span>
              Você pode continuar preenchendo e enviar suas medidas normalmente.
            </span>
          </div>
        )}
      </div>
      <div className="model-controls">
        <button
          type="button"
          aria-label="Girar manequim para a esquerda"
          onClick={() => {
            const next = rotation - Math.PI / 4;
            setRotation(next);
            runtime.current?.turn(next);
          }}
        >
          ↶
        </button>
        <span>ARRASTE PARA EXPLORAR</span>
        <button
          type="button"
          aria-label="Girar manequim para a direita"
          onClick={() => {
            const next = rotation + Math.PI / 4;
            setRotation(next);
            runtime.current?.turn(next);
          }}
        >
          ↷
        </button>
        <button
          type="button"
          className="reset-view"
          onClick={() => {
            setRotation(0);
            runtime.current?.turn(0);
          }}
        >
          Frente
        </button>
      </div>
    </div>
  );
}
