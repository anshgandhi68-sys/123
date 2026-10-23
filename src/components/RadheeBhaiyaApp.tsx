/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function RadheeBhaiyaApp() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ===== EDIT ME: all personal content lives here. Put photos in "img" as a URL or data path. ===== */
    const CONFIG = {
      memories: [
        {
          title: "My Favourite Memory",
          caption: "A golden memory of laughter and warmth that I will always cherish.",
          img: "/images/memories/memory-1.svg",
          alt: "Favourite memory",
        },
        {
          title: "Our Funniest Moment",
          caption: "Those silly jokes, teasing, and uncontrollable laughs only we understand.",
          img: "/images/memories/memory-2.svg",
          alt: "Funniest moment",
        },
        {
          title: "Little Childhood Memories",
          caption: "Growing up together, innocent fights, and all the childhood mischief.",
          img: "/images/memories/memory-3.svg",
          alt: "Childhood memories",
        },
        {
          title: "Family Moments",
          caption: "Festivals, family dinners, and having you right beside us as our anchor.",
          img: "/images/memories/memory-4.svg",
          alt: "Family moments",
        },
        {
          title: "A Memory I’ll Always Keep",
          caption: "A quiet moment of care that reminded me how lucky I am to have you as my Bhaiya.",
          img: "/images/memories/memory-5.svg",
          alt: "A memory I'll always keep",
        },
      ],
      letter: [
        "Dear Bhaiya, ♡",
        "Happy Birthday to the most special bhaiya in my world! ❤️",
        "Pata hai, main shayad har baar express nahi kar paati ki aap mere liye kitne special ho, but aapki presence meri life ko aur beautiful bana deti hai.",
        "Thank you for being you — for the care, the smiles, the little moments, and all those things that make having you as my Bhaiya so special.",
        "Meri wish hai ki aapki life hamesha happiness, success, peace aur endless reasons to smile se bhari rahe. Aap jo bhi dream karo, woh poora ho, aur aapko hamesha woh love mile jo aap deserve karte ho.",
        "Aur haan, chahe hum kitna bhi lad lein ya ek-doosre ko kitna bhi tease karein, you’ll always have a special place in my heart. That’s never going to change.",
        "Keep smiling, keep shining, and never forget how much you mean to me.",
        "Happy Birthday, Bhaiya! ♡",
        "Lots and lots of love,",
      ],
      sign: "Your Radhee ♡",
      qualities: [
        [
          "My Forever Protector",
          "No matter how big the world feels, knowing you’re there makes things feel a little easier.",
        ],
        [
          "My Favourite Person to Tease",
          "Life would be a lot less fun without our little fights, silly jokes, and endless teasing.",
        ],
        [
          "My Biggest Cheerleader",
          "I hope life gives you as many reasons to smile as you give to the people around you.",
        ],
        [
          "My Safe Place",
          "Some bonds don’t need perfect words. They just need love, trust, and the comfort of knowing we’re family.",
        ],
        [
          "My Very Own Bhaiya",
          "Among all the relationships in this world, getting to call you my Bhaiya will always be something special.",
        ],
      ],
      final: [
        "Happy Birthday, Bhaiya! ❤️",
        "Aap hamesha khush raho, healthy raho, aur life mein jo bhi achieve karna chaho, woh sab aapko mile.",
        "May your life be filled with happiness, peace, success, beautiful memories, and people who love you just as much as you deserve.",
        "No matter how much life changes, you’ll always be my favourite Bhaiya.",
        "This little world was made just for you, with all the love in my heart.",
        "With endless love,",
        "Your Radhee ♡",
      ],
      finalSign: "Always your little sister. Always your biggest fan. ♡",
      musicOnByDefault: false,
    };

    const $ = (s: string) => document.querySelector(s) as any;
    const $$ = (s: string) => [...document.querySelectorAll(s)] as any[];
    const RM = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const MOB = window.innerWidth < 760;
    const esc = (s: any) =>
      String(s).replace(/[&<>"]/g, (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] || c)
      );
    const ph = (i: number) =>
      "data:image/svg+xml," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#252744'/><stop offset='1' stop-color='#8F5146'/></linearGradient></defs><rect width='400' height='500' fill='url(#g)'/><circle cx='200' cy='200' r='46' fill='none' stroke='#F5C86A' stroke-width='3'/><path d='M200 222c-26-18-30-34-18-42 8-5 16 0 18 6 2-6 10-11 18-6 12 8 8 24-18 42z' fill='#F5C86A'/><text x='200' y='310' fill='#FAF0E1' font-family='Georgia' font-size='26' text-anchor='middle'>Your photo ${
          i + 1
        } goes here</text></svg>`
      );

    /* ---------- Audio (synthesised, optional, off by default) ---------- */
    let AC: any = null;
    let soundOn = false;
    let musT: any = null;

    function ac() {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        AC = AC || new AudioCtx();
        if (AC.state === "suspended") AC.resume();
      } catch (e) {}
      return AC;
    }

    function tone(f: number, d = 0.6, v = 0.05, type: OscillatorType = "sine", at = 0) {
      if (!soundOn || !AC) return;
      const o = AC.createOscillator();
      const g = AC.createGain();
      const t = AC.currentTime + at;
      o.type = type;
      o.frequency.value = f;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(v, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g).connect(AC.destination);
      o.start(t);
      o.stop(t + d + 0.05);
    }

    const sparkle = () =>
      [1318, 1760, 2093, 2637].forEach((f, i) => tone(f, 0.4, 0.03, "sine", i * 0.07));

    const puff = () => {
      if (!soundOn || !AC) return;
      const b = AC.createBuffer(1, AC.sampleRate * 0.3, AC.sampleRate);
      const d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++)
        d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
      const s = AC.createBufferSource();
      const g = AC.createGain();
      const fl = AC.createBiquadFilter();
      fl.type = "lowpass";
      fl.frequency.value = 900;
      g.gain.value = 0.12;
      s.buffer = b;
      s.connect(fl).connect(g).connect(AC.destination);
      s.start();
    };

    const reveal = () =>
      [523, 659, 784, 1047].forEach((f, i) => tone(f, 1.4, 0.05, "triangle", i * 0.12));

    function setSound(on: boolean) {
      soundOn = on;
      const b = $("#snd");
      if (!b) return;
      b.setAttribute("aria-pressed", String(on));
      b.setAttribute(
        "aria-label",
        on ? "Turn music and sounds off" : "Turn music and sounds on"
      );
      if (b.lastElementChild) {
        b.lastElementChild.textContent = on ? "Sound on" : "Sound off";
      }
      clearInterval(musT);
      if (on) {
        ac();
        const n = [262, 330, 392, 523, 392, 330, 294, 392];
        let i = 0;
        musT = setInterval(
          () => tone(n[i++ % n.length], 1.6, 0.025, "triangle"),
          900
        );
        sparkle();
      }
    }

    const sndBtn = $("#snd");
    if (sndBtn) sndBtn.onclick = () => setSound(!soundOn);

    /* ---------- Content rendering ---------- */
    const mgrid = $("#mgrid");
    if (mgrid) {
      mgrid.innerHTML = CONFIG.memories
        .map(
          (m, i) =>
            `<button class="mem" data-i="${i}" aria-label="Open photo: ${esc(
              m.title
            )}"><img src="${esc(m.img || ph(i))}" alt="${esc(
              m.alt || "Photo placeholder for " + m.title
            )}" onerror="this.onerror=null;this.src=ph(${i})"><h3>${esc(
              m.title
            )}</h3><p>${esc(m.caption)}</p><span class="more">View bigger ✦</span></button>`
        )
        .join("");
    }

    const cardsEl = $("#cards");
    if (cardsEl) {
      cardsEl.innerHTML = CONFIG.qualities
        .map(
          (q) =>
            `<button class="glass q" aria-expanded="false"><span class="hint">Tap to open ✦</span><h3>${esc(
              q[0]
            )}</h3><p class="m">${esc(q[1])}</p></button>`
        )
        .join("");
    }

    $$(".q").forEach(
      (b) =>
        (b.onclick = () => {
          const o = b.getAttribute("aria-expanded") === "true";
          b.setAttribute("aria-expanded", String(!o));
          const h = b.querySelector(".hint");
          if (h) h.textContent = o ? "Tap to open ✦" : "";
          if (!o) sparkle();
        })
    );

    if (window.matchMedia("(hover:hover)").matches) {
      $$(".mem,.q").forEach((c) => {
        c.onpointermove = (e: PointerEvent) => {
          const r = c.getBoundingClientRect();
          c.style.setProperty(
            "--ry",
            ((e.clientX - r.left) / r.width - 0.5) * 10 + "deg"
          );
          c.style.setProperty(
            "--rx",
            -((e.clientY - r.top) / r.height - 0.5) * 10 + "deg"
          );
        };
        c.onpointerleave = () => {
          c.style.setProperty("--rx", "0deg");
          c.style.setProperty("--ry", "0deg");
        };
      });
    }

    /* ---------- Photo viewer ---------- */
    let mi = 0;
    let lastF: HTMLElement | null = null;
    function showM(i: number) {
      mi = (i + CONFIG.memories.length) % CONFIG.memories.length;
      const m = CONFIG.memories[mi];
      const im = $("#mimg");
      if (im) {
        im.src = m.img || ph(mi);
        im.alt = m.alt || "Photo placeholder for " + m.title;
        im.onerror = () => {
          im.onerror = null;
          im.src = ph(mi);
        };
      }
      const mt = $("#mt");
      if (mt) mt.textContent = m.title;
      const mc = $("#mc");
      if (mc) mc.textContent = m.caption;
    }

    function openM(i: number) {
      lastF = document.activeElement as HTMLElement;
      showM(i);
      const mod = $("#modal");
      if (mod) mod.classList.add("on");
      const mx = $("#mx");
      if (mx) mx.focus();
    }

    function closeM() {
      const mod = $("#modal");
      if (mod) mod.classList.remove("on");
      if (lastF) lastF.focus();
    }

    if (mgrid) {
      mgrid.onclick = (e: MouseEvent) => {
        const b = (e.target as HTMLElement).closest(".mem") as HTMLElement;
        if (b && b.dataset.i) openM(+b.dataset.i);
      };
    }

    const mxBtn = $("#mx");
    if (mxBtn) mxBtn.onclick = closeM;
    const mpBtn = $("#mp");
    if (mpBtn) mpBtn.onclick = () => showM(mi - 1);
    const mnBtn = $("#mn");
    if (mnBtn) mnBtn.onclick = () => showM(mi + 1);

    const modalEl = $("#modal");
    if (modalEl) {
      modalEl.onclick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).id === "modal") closeM();
      };
    }

    const keyListener = (e: KeyboardEvent) => {
      const mod = $("#modal");
      if (!mod || !mod.classList.contains("on")) return;
      if (e.key === "Escape") closeM();
      if (e.key === "ArrowLeft") showM(mi - 1);
      if (e.key === "ArrowRight") showM(mi + 1);
      if (e.key === "Tab") {
        const f = $$("#modal button");
        const a = document.activeElement;
        if (e.shiftKey && a === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && a === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    window.addEventListener("keydown", keyListener);

    /* ---------- Letter ---------- */
    const lines = [...CONFIG.letter, CONFIG.sign];
    let lt: any[] = [];
    const paperEl = $("#paper");
    if (paperEl) {
      paperEl.innerHTML =
        lines
          .map(
            (l, i) =>
              `<p${i === lines.length - 1 ? ' class="sig"' : ""}>${esc(l)}</p>`
          )
          .join("") + '<p class="hand" style="text-align:center">♡</p>';
    }

    function showAll() {
      lt.forEach(clearTimeout);
      $$("#paper p").forEach((p) => p.classList.add("show"));
      const skipL = $("#skipL");
      if (skipL) skipL.hidden = true;
    }

    const openLBtn = $("#openL");
    if (openLBtn) {
      openLBtn.onclick = () => {
        const env = $("#env");
        if (env) env.classList.add("open");
        openLBtn.hidden = true;
        sparkle();
        const p = $("#paper");
        setTimeout(() => {
          if (p) {
            p.hidden = false;
            p.scrollIntoView({ behavior: RM ? "auto" : "smooth", block: "center" });
          }
          if (RM) return showAll();
          const skipL = $("#skipL");
          if (skipL) skipL.hidden = false;
          $$("#paper p").forEach((el, i) =>
            lt.push(
              setTimeout(() => {
                el.classList.add("show");
                if (i === $$("#paper p").length - 1 && skipL) skipL.hidden = true;
              }, 400 + i * 1100)
            )
          );
        }, RM ? 0 : 800);
      };
    }

    const skipLBtn = $("#skipL");
    if (skipLBtn) skipLBtn.onclick = showAll;

    /* ---------- 3D scene ---------- */
    let GL = true;
    let R: any = null;
    let S: any = null;
    let cam: any = null;
    let animId: number = 0;

    const st: any = {
      wish: false,
      lit: [1, 1, 1, 1, 1],
      keep: [1, 1, 1, 1, 1],
      gift: 0,
      giftGo: false,
      cur: "welcome",
      fall: false,
      burst: 0,
    };

    const cams: Record<string, [[number, number, number], [number, number, number]]> = {
      welcome: [[0, 2.6, 9], [0, 1.2, 0]],
      hero: [[-0.4, 2.3, 6.4], [-1.4, 1.4, 0]],
      wish: [[0, 2.3, 3.8], [0, 1.5, 0]],
      memories: [[0, 2.6, 8.5], [0, 2.4, 0]],
      letter: [[-3.2, 2.2, 8], [-3.2, 1.8, 0]],
      special: [[3.2, 2.2, 8], [3.2, 1.8, 0]],
      surprise: [[7, 2.6, 6.4], [7, 2.1, 0]],
      giftOpen: [[7, 2.6, 4.4], [7, 2.3, 0]],
      finale: [[0, 2.3, 6.6], [0, 1.5, 0]],
    };

    let burst = (o: [number, number, number], n: number) => {};
    let setFall = (on: boolean) => {};

    try {
      const glCanvas = $("#gl");
      R = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: !MOB });
      if (!R.getContext()) throw new Error("No WebGL context");
      R.setPixelRatio(Math.min(window.devicePixelRatio, MOB ? 1.5 : 2));
      R.shadowMap.enabled = !MOB;
      R.shadowMap.type = THREE.PCFSoftShadowMap;

      S = new THREE.Scene();
      S.background = new THREE.Color(0x10172d);
      S.fog = new THREE.Fog(0x10172d, 12, 30);
      cam = new THREE.PerspectiveCamera(45, 1, 0.1, 60);

      const M = (c: any, r = 0.7, m = 0) =>
        new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
      const add = (p: any, g: any, mat: any, x = 0, y = 0, z = 0) => {
        const o = new THREE.Mesh(g, mat);
        o.position.set(x, y, z);
        o.castShadow = o.receiveShadow = true;
        p.add(o);
        return o;
      };
      const B = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
      const Cy = (a: number, b: number, h: number, s = 40) =>
        new THREE.CylinderGeometry(a, b, h, s);

      const gold = M(0xf5c86a, 0.3, 0.8);
      const cream = M(0xfaf0e1, 0.6);

      const amb = new THREE.AmbientLight(0x8fa0d8, 0.55);
      S.add(amb, new THREE.HemisphereLight(0xc8a8ff, 0x252744, 0.35));

      const cl = new THREE.PointLight(0xf5c86a, 1.4, 7);
      cl.position.set(0, 2.5, 0.3);
      S.add(cl);

      const lamp = new THREE.PointLight(0xeba75e, 1.1, 10);
      lamp.position.set(-2.3, 2.4, 0.6);
      S.add(lamp);

      const sp = new THREE.SpotLight(0xffe2a8, 0.8, 12, 0.8, 0.6);
      sp.position.set(-2.3, 3, 1.5);
      sp.target.position.set(0, 1, 0);
      sp.castShadow = !MOB;
      S.add(sp, sp.target);

      const gl2 = new THREE.PointLight(0xffd27a, 0, 7);
      gl2.position.set(7, 2, 0.3);
      S.add(gl2);

      add(S, new THREE.PlaneGeometry(50, 14), M(0x252744, 0.95), 0, 5, -4);
      const fl = add(S, new THREE.PlaneGeometry(50, 24), M(0x171d35, 0.8), 0, -1, 6);
      fl.rotation.x = -Math.PI / 2;

      /* desk */
      add(S, B(5.4, 0.16, 2.6), M(0x6b3d33, 0.55), 0, 0.72, 0);
      [
        [-2.5, -1.1],
        [2.5, -1.1],
        [-2.5, 1.1],
        [2.5, 1.1],
      ].forEach((p) => add(S, B(0.16, 1.7, 0.16), M(0x4a2a22), p[0], -0.15, p[1]));

      /* cake */
      const cake = new THREE.Group();
      S.add(cake);
      add(cake, Cy(1.3, 1.3, 0.06), M(0xe8d9b8, 0.3, 0.5), 0, 0.83, 0);
      add(cake, Cy(1, 1, 0.72), M(0x4a2a22, 0.8), 0, 1.22, 0);
      add(cake, Cy(1.03, 1.03, 0.08), cream, 0, 1.6, 0);
      add(cake, Cy(0.72, 0.72, 0.5), M(0x5b3328, 0.8), 0, 1.9, 0);
      add(cake, Cy(0.75, 0.75, 0.08), cream, 0, 2.17, 0);

      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * 6.283;
        add(
          cake,
          new THREE.SphereGeometry(0.055, 10, 10),
          gold,
          Math.cos(a) * 0.66,
          2.25,
          Math.sin(a) * 0.66
        );
      }

      const flames: any[] = [];
      [0xfaf0e1, 0xf5c86a, 0xc8a8ff, 0xfaf0e1, 0xf5c86a].forEach((c, i) => {
        const a = (i / 5) * 6.283;
        const x = Math.cos(a) * 0.38;
        const z = Math.sin(a) * 0.38;
        add(cake, Cy(0.045, 0.045, 0.4, 12), M(c, 0.5), x, 2.42, z);
        const f = new THREE.Mesh(
          new THREE.ConeGeometry(0.07, 0.22, 10),
          new THREE.MeshBasicMaterial({ color: 0xffd27a })
        );
        f.position.set(x, 2.76, z);
        cake.add(f);
        flames.push(f);
      });

      const sh = new THREE.Mesh(
        new THREE.CircleGeometry(1.5, 32),
        new THREE.MeshBasicMaterial({ color: 0, transparent: true, opacity: 0.35 })
      );
      sh.rotation.x = -Math.PI / 2;
      sh.position.y = 0.81;
      cake.add(sh);

      /* lamp, present, books */
      add(S, Cy(0.3, 0.35, 0.08), gold, -2.3, 0.82, 0.2);
      add(S, Cy(0.03, 0.03, 1.3), gold, -2.3, 1.45, 0.2);
      add(
        S,
        new THREE.ConeGeometry(0.45, 0.5, 24, 1, true),
        new THREE.MeshStandardMaterial({
          color: 0xeba75e,
          emissive: 0xeba75e,
          emissiveIntensity: 0.8,
          side: 2,
        }),
        -2.3,
        2.2,
        0.2
      );

      add(S, B(0.7, 0.6, 0.7), M(0x8f5146, 0.5), 1.9, 1.1, 0.5);
      add(S, B(0.72, 0.62, 0.14), gold, 1.9, 1.1, 0.5);
      add(S, B(0.14, 0.62, 0.72), gold, 1.9, 1.1, 0.5);

      add(S, B(0.9, 0.14, 0.6), M(0x252744), -1.7, 0.89, -0.6);
      add(S, B(0.8, 0.14, 0.55), M(0xc8a8ff, 0.6), -1.7, 1.03, -0.6);

      /* window with sunset */
      const wc = document.createElement("canvas");
      wc.width = 256;
      wc.height = 300;
      const xctx = wc.getContext("2d");
      if (xctx) {
        const gr = xctx.createLinearGradient(0, 0, 0, 300);
        gr.addColorStop(0, "#3a2f6b");
        gr.addColorStop(0.6, "#EBA75E");
        gr.addColorStop(1, "#F5C86A");
        xctx.fillStyle = gr;
        xctx.fillRect(0, 0, 256, 300);
        xctx.fillStyle = "#171D35";
        for (let i = 0; i < 9; i++) {
          const h = 60 + Math.random() * 100;
          xctx.fillRect(i * 30, 300 - h, 26, h);
        }
      }
      add(
        S,
        new THREE.PlaneGeometry(3, 3.5),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(wc) }),
        -3.6,
        3.4,
        -3.9
      );

      [
        [0, 1.78, 3.2, 0.12],
        [0, -1.78, 3.2, 0.12],
        [-1.56, 0, 0.12, 3.6],
        [1.56, 0, 0.12, 3.6],
      ].forEach((p) => add(S, B(p[2], p[3], 0.1), gold, -3.6 + p[0], 3.4 + p[1], -3.85));

      /* photo frames */
      const frames: any[] = [];
      [
        [1.8, 3.6],
        [3.3, 4.5],
        [-6.2, 3.3],
        [-7.4, 4.7],
        [5.2, 3],
      ].forEach((p, i) => {
        const g = new THREE.Group();
        g.position.set(p[0], p[1], -3.8);
        g.rotation.z = i % 2 ? 0.06 : -0.05;
        S.add(g);
        add(g, B(1.1, 1.4, 0.06), gold);
        const c = document.createElement("canvas");
        c.width = 110;
        c.height = 140;
        const q = c.getContext("2d");
        if (q) {
          const gg = q.createLinearGradient(0, 0, 110, 140);
          gg.addColorStop(0, "#252744");
          gg.addColorStop(1, "#8F5146");
          q.fillStyle = gg;
          q.fillRect(0, 0, 110, 140);
          q.fillStyle = "#F5C86A";
          q.font = "40px serif";
          q.textAlign = "center";
          q.fillText("♡", 55, 80);
        }
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(0.94, 1.24),
          new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c) })
        );
        m.position.z = 0.04;
        g.add(m);
        frames.push([g, p[1]]);
      });

      /* fairy lights */
      const fairy: any[] = [];
      for (let s = 0; s < 2; s++) {
        for (let i = 0; i <= 24; i++) {
          const t = i / 24;
          const m = new THREE.Mesh(
            new THREE.SphereGeometry(0.06, 8, 8),
            new THREE.MeshBasicMaterial({ color: i % 2 ? 0xf5c86a : 0xffe2a8 })
          );
          m.position.set(-9 + t * 18, 6.6 - s * 0.4 - Math.sin(t * Math.PI) * 1.1, -3.7);
          S.add(m);
          fairy.push(m);
        }
      }

      /* gift on pedestal */
      add(S, Cy(1, 1.1, 1.8), M(0x252744, 0.6), 7, -0.1, 0);
      const gift = new THREE.Group();
      gift.position.set(7, 0, 0);
      S.add(gift);
      const wrap = M(0x1a2550, 0.45, 0.1);
      add(gift, B(1.2, 1.2, 1.2), wrap, 0, 1.4, 0);
      add(gift, B(0.2, 1.22, 1.22), gold, 0, 1.4, 0);
      add(gift, B(1.22, 1.22, 0.2), gold, 0, 1.4, 0);

      const glow = new THREE.Mesh(
        B(1.3, 1.3, 1.3),
        new THREE.MeshBasicMaterial({
          color: 0xf5c86a,
          transparent: true,
          opacity: 0.16,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
        })
      );
      glow.position.y = 1.4;
      gift.add(glow);

      const lid = new THREE.Group();
      lid.position.y = 2;
      gift.add(lid);
      add(lid, B(1.36, 0.28, 1.36), wrap, 0, 0.14, 0);
      add(lid, B(0.2, 0.3, 1.38), gold, 0, 0.14, 0);
      add(lid, B(1.38, 0.3, 0.2), gold, 0, 0.14, 0);

      const bow = new THREE.Group();
      bow.position.y = 0.4;
      lid.add(bow);
      [1, -1].forEach((s) => {
        const t = add(bow, new THREE.TorusGeometry(0.2, 0.065, 10, 24), gold, s * 0.2, 0, 0);
        t.rotation.y = s * 1.2;
      });

      const shGift = new THREE.Mesh(
        new THREE.CircleGeometry(1.1, 32),
        new THREE.MeshBasicMaterial({ color: 0, transparent: true, opacity: 0.3 })
      );
      shGift.rotation.x = -Math.PI / 2;
      shGift.position.set(7, 0.82, 0);
      S.add(shGift);

      /* particles */
      const NP = MOB ? 60 : 130;
      const pp = new Float32Array(NP * 3);
      for (let i = 0; i < NP; i++)
        pp.set(
          [(Math.random() - 0.5) * 20, Math.random() * 7, Math.random() * 8 - 4],
          i * 3
        );
      const pg = new THREE.BufferGeometry();
      pg.setAttribute("position", new THREE.BufferAttribute(pp, 3));
      S.add(
        new THREE.Points(
          pg,
          new THREE.PointsMaterial({
            color: 0xf5c86a,
            size: 0.06,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })
        )
      );

      const NC = MOB ? 140 : 220;
      const cp = new Float32Array(NC * 3);
      const cv = new Float32Array(NC * 3);
      const cc = new Float32Array(NC * 3);
      const al = new Uint8Array(NC);
      const pal = [0xf5c86a, 0xfaf0e1, 0xc8a8ff, 0xeba75e].map((h) => new THREE.Color(h));
      for (let i = 0; i < NC; i++) {
        cp[i * 3 + 1] = -100;
        pal[i % 4].toArray(cc, i * 3);
      }
      const cg = new THREE.BufferGeometry();
      cg.setAttribute("position", new THREE.BufferAttribute(cp, 3));
      cg.setAttribute("color", new THREE.BufferAttribute(cc, 3));
      const cmesh = new THREE.Points(
        cg,
        new THREE.PointsMaterial({
          size: 0.13,
          vertexColors: true,
          transparent: true,
          depthWrite: false,
        })
      );
      cmesh.frustumCulled = false;
      S.add(cmesh);

      burst = (o: [number, number, number], n: number) => {
        let c = 0;
        for (let i = 0; i < NC && c < n; i++) {
          if (!al[i]) {
            al[i] = 1;
            c++;
            cp.set([o[0] + (Math.random() - 0.5) * 0.4, o[1], o[2]], i * 3);
            cv.set(
              [
                (Math.random() - 0.5) * 4,
                3 + Math.random() * 3,
                (Math.random() - 0.5) * 4,
              ],
              i * 3
            );
          }
        }
      };

      setFall = (on: boolean) => {
        st.fall = on;
        for (let i = 0; i < NC; i++) {
          if (on) {
            al[i] = 1;
            cp.set(
              [(Math.random() - 0.5) * 14, Math.random() * 9, Math.random() * 4 - 2],
              i * 3
            );
            cv.set([(Math.random() - 0.5) * 0.4, -(0.5 + Math.random() * 0.8), 0], i * 3);
          } else {
            al[i] = 0;
            cp[i * 3 + 1] = -100;
          }
        }
      };

      /* loop */
      const clock = new THREE.Clock();
      const tp = new THREE.Vector3();
      const tl = new THREE.Vector3();
      const lk = new THREE.Vector3(0, 1, 0);
      let mx = 0;
      let my = 0;

      const pointerMoveHandler = (e: PointerEvent) => {
        mx = e.clientX / window.innerWidth - 0.5;
        my = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("pointermove", pointerMoveHandler, { passive: true });

      function size() {
        if (!R || !cam) return;
        R.setSize(window.innerWidth, window.innerHeight, false);
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.updateProjectionMatrix();
      }
      window.addEventListener("resize", size);
      size();

      cam.position.set(0, 2.6, 9);
      const ease = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      function loop() {
        animId = requestAnimationFrame(loop);
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;
        const k = RM ? 1 : 1 - Math.exp(-2.4 * dt);

        const key = st.giftGo ? "giftOpen" : st.wish ? "wish" : st.cur;
        const c = cams[key] || cams.hero;
        tp.set(...c[0]);
        tl.set(...c[1]);

        if (MOB) {
          tp.z += 3.2;
          tp.y += 0.4;
          if (key === "hero") {
            tp.x = 0;
            tl.x = 0;
            tl.y = 2.3;
          }
          if (key === "wish") {
            tp.z += 0.6;
            tl.y = 1.8;
          }
        }
        if (!RM) {
          tp.x += mx * 0.4;
          tp.y -= my * 0.2;
        }

        cam.position.lerp(tp, k);
        lk.lerp(tl, k);
        cam.lookAt(lk);

        amb.intensity += ((st.wish ? 0.28 : 0.55) - amb.intensity) * k;

        let sum = 0;
        flames.forEach((f, i) => {
          st.lit[i] += (st.keep[i] - st.lit[i]) * Math.min(1, dt * 7);
          const v = st.lit[i];
          sum += v;
          f.visible = v > 0.03;
          f.scale.set(
            v * (1 + 0.12 * Math.sin(t * 13 + i)),
            v * (1 + 0.2 * Math.sin(t * 9 + i * 2)),
            v
          );
        });

        cl.intensity = 1.5 * (sum / 5) * (1 + 0.05 * Math.sin(t * 11));
        frames.forEach((f, i) => (f[0].position.y = f[1] + Math.sin(t * 0.8 + i) * 0.06));
        fairy.forEach((m, i) => m.scale.setScalar(0.8 + 0.3 * Math.sin(t * 2 + i)));

        const pa = pg.attributes.position.array as Float32Array;
        for (let i = 0; i < NP; i++) {
          pa[i * 3 + 1] += dt * 0.15;
          pa[i * 3] += Math.sin(t + i) * dt * 0.05;
          if (pa[i * 3 + 1] > 7) pa[i * 3 + 1] = 0;
        }
        pg.attributes.position.needsUpdate = true;

        for (let i = 0; i < NC; i++) {
          if (al[i]) {
            const j = i * 3;
            if (!st.fall) cv[j + 1] -= 6 * dt;
            cp[j] += cv[j] * dt;
            cp[j + 1] += cv[j + 1] * dt;
            cp[j + 2] += cv[j + 2] * dt;
            if (cp[j + 1] < -1) {
              if (st.fall) {
                cp[j + 1] = 9;
                cp[j] = (Math.random() - 0.5) * 14;
              } else {
                al[i] = 0;
                cp[j + 1] = -100;
              }
            }
          }
        }
        cg.attributes.position.needsUpdate = true;

        if (st.giftGo && st.gift < 1) {
          st.gift = Math.min(1, st.gift + dt / (RM ? 0.3 : 2.6));
          if (st.gift > 0.45 && !st.burst) {
            st.burst = 1;
            burst([7, 2.6, 0], NC);
            reveal();
            const fin = $("#final");
            if (fin) fin.classList.add("on");
          }
        }

        const e = ease(st.gift);
        lid.position.y = 2 + e * 1.5;
        lid.rotation.z = e * 0.45;
        lid.rotation.x = e * 0.2;
        bow.scale.setScalar(1 + e * 0.6);
        gl2.intensity = e * 3.2;
        (glow.material as THREE.MeshBasicMaterial).opacity =
          0.16 + 0.1 * Math.sin(t * 2) + e * 0.2;

        R.render(S, cam);
      }

      loop();
    } catch (err) {
      GL = false;
      document.body.classList.add("nogl");
      console.warn("WebGL unavailable, using CSS fallback", err);
    }

    /* ---------- Story controls ---------- */
    const hero = $("#hero");
    function enter(fast = false) {
      const wel = $("#welcome");
      if (wel) wel.classList.add("gone");
      document.body.classList.remove("lock");
      st.cur = "hero";
      sparkle();
      if (GL) burst([0, 2.8, 0], 24);
      window.scrollTo({ top: 0 });
      if (CONFIG.musicOnByDefault && !soundOn) setSound(true);
    }

    const enterBtn = $("#enter");
    if (enterBtn) enterBtn.onclick = () => enter();
    const skipIntroBtn = $("#skipIntro");
    if (skipIntroBtn) skipIntroBtn.onclick = () => enter(true);

    const wishBtn = $("#wish");
    if (wishBtn) {
      wishBtn.onclick = () => {
        st.wish = true;
        if (hero) hero.classList.add("wishing");
        const wt = $("#wt");
        if (wt) wt.textContent = "Close your eyes, make a wish, Bhaiya. ♡";
        const blow = $("#blow");
        if (blow) blow.hidden = false;
        const cont = $("#cont");
        if (cont) cont.hidden = true;
        const relight = $("#relight");
        if (relight) relight.hidden = true;
        sparkle();
        if (blow) blow.focus();
      };
    }

    const blowBtn = $("#blow");
    if (blowBtn) {
      blowBtn.onclick = () => {
        blowBtn.hidden = true;
        puff();
        if (st.keep) {
          st.keep.forEach((_: any, i: number) => {
            setTimeout(() => {
              st.keep[i] = 0;
            }, RM ? 0 : i * 350);
          });
        }
        const d = RM ? 0 : 5 * 350 + 300;
        setTimeout(() => {
          if (GL) burst([0, 2.8, 0], 60);
          sparkle();
          const wt = $("#wt");
          if (wt) wt.textContent = "May all your wishes come true.";
          const cont = $("#cont");
          if (cont) cont.hidden = false;
          const relight = $("#relight");
          if (relight) relight.hidden = false;
          if (cont) cont.focus();
        }, d);
      };
    }

    const contBtn = $("#cont");
    if (contBtn) {
      contBtn.onclick = () => {
        st.wish = false;
        if (hero) hero.classList.remove("wishing");
        const mem = $("#memories");
        if (mem) mem.scrollIntoView({ behavior: RM ? "auto" : "smooth" });
      };
    }

    const relightBtn = $("#relight");
    if (relightBtn) {
      relightBtn.onclick = () => {
        if (st.keep) st.keep.fill(1);
        const wt = $("#wt");
        if (wt) wt.textContent = "Close your eyes, make a wish, Bhaiya. ♡";
        const blow = $("#blow");
        if (blow) blow.hidden = false;
        const cont = $("#cont");
        if (cont) cont.hidden = true;
        relightBtn.hidden = true;
      };
    }

    const finalEl = $("#final");
    if (finalEl) {
      finalEl.innerHTML =
        CONFIG.final.map((l: string) => `<p>${esc(l)}</p>`).join("") +
        `<p class="hand">${esc(
          CONFIG.finalSign
        )}</p><div class="row"><button class="btn ghost" id="replay">Replay the reveal</button><button class="btn" id="tofin">Continue ✨</button></div>`;
    }

    const giftBtn = $("#gift");
    if (giftBtn) {
      giftBtn.onclick = () => {
        giftBtn.hidden = true;
        sparkle();
        st.gift = 0;
        st.burst = 0;
        st.giftGo = true;
        if (!GL) {
          st.burst = 1;
          reveal();
          if (finalEl) finalEl.classList.add("on");
        }
      };
    }

    function resetGift() {
      st.giftGo = false;
      st.gift = 0;
      st.burst = 0;
      if (finalEl) finalEl.classList.remove("on");
    }

    if (finalEl) {
      finalEl.onclick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === "replay") {
          resetGift();
          if (giftBtn) {
            giftBtn.hidden = false;
            giftBtn.focus();
          }
        }
        if (target.id === "tofin") {
          const finSec = $("#finale");
          if (finSec) finSec.scrollIntoView({ behavior: RM ? "auto" : "smooth" });
        }
      };
    }

    const againBtn = $("#again");
    if (againBtn) {
      againBtn.onclick = () => {
        resetGift();
        if (giftBtn) giftBtn.hidden = false;
        st.wish = false;
        if (hero) hero.classList.remove("wishing");
        const env = $("#env");
        if (env) env.classList.remove("open");
        const paper = $("#paper");
        if (paper) paper.hidden = true;
        if (openLBtn) openLBtn.hidden = false;
        if (skipLBtn) skipLBtn.hidden = true;
        lt.forEach(clearTimeout);
        $$("#paper p").forEach((p) => p.classList.remove("show"));
        if (st.keep) st.keep.fill(1);
        if (relightBtn) relightBtn.hidden = true;
        if (contBtn) contBtn.hidden = true;
        if (blowBtn) blowBtn.hidden = false;
        st.cur = "welcome";
        document.body.classList.add("lock");
        const wel = $("#welcome");
        if (wel) wel.classList.remove("gone");
        window.scrollTo({ top: 0 });
        setFall(false);
      };
    }

    const backBtn = $("#back");
    if (backBtn) {
      backBtn.onclick = () => {
        const mem = $("#memories");
        if (mem) mem.scrollIntoView({ behavior: RM ? "auto" : "smooth" });
      };
    }

    /* nav, progress, active section */
    const menuBtn = $("#menu");
    const navEl = $("#nav");
    if (menuBtn && navEl) {
      menuBtn.onclick = () => {
        const o = navEl.classList.toggle("on");
        menuBtn.setAttribute("aria-expanded", String(o));
      };
    }

    $$("#nav a").forEach((a) => {
      a.onclick = () => {
        if (navEl) navEl.classList.remove("on");
        if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
      };
    });

    const scrollHandler = () => {
      const prog = $("#prog");
      if (prog) {
        prog.style.width =
          (window.scrollY /
            Math.max(
              1,
              document.documentElement.scrollHeight - window.innerHeight
            )) *
            100 +
          "%";
      }
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          const wel = $("#welcome");
          if (e.isIntersecting && wel && !wel.classList.contains("gone") === false) {
            st.cur = e.target.id;
            if (GL) setFall(e.target.id === "finale");
          }
        }),
      { threshold: 0.5 }
    );
    $$("main section").forEach((s) => io.observe(s));

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(musT);
      if (AC && AC.close) AC.close();
      window.removeEventListener("keydown", keyListener);
      window.removeEventListener("scroll", scrollHandler);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <canvas id="gl" aria-hidden="true"></canvas>
      <div id="prog"></div>
      <header className="nav">
        <a className="logo" href="#hero">
          Radhee ♡ Bhaiya
        </a>
        <nav id="nav" aria-label="Sections">
          <a href="#hero">Home</a>
          <a href="#memories">Memories</a>
          <a href="#letter">My Letter</a>
          <a href="#special">Why You’re Special</a>
          <a href="#surprise">Surprise</a>
        </nav>
        <button id="snd" aria-pressed="false" aria-label="Turn music and sounds on">
          ♪ <span>Sound off</span>
        </button>
        <button id="menu" aria-expanded="false" aria-label="Open menu">
          Menu
        </button>
      </header>

      <div id="welcome" role="dialog" aria-label="Welcome">
        <div>
          <p className="eyebrow">A LITTLE SURPRISE, MADE WITH LOVE</p>
          <h1>Hey Bhaiya...</h1>
          <p>
            I made something special for you. A little corner of the internet,
            filled with lots of love, just for you. ♡
          </p>
          <button className="btn" id="enter">
            Enter Your Little World
          </button>
          <br />
          <button className="skip" id="skipIntro">
            Skip intro
          </button>
          <span className="arrow" aria-hidden="true">
            ⌄
          </span>
        </div>
      </div>

      <main>
        <section id="hero">
          <div className="csscake" aria-hidden="true"></div>
          <div className="hero-main">
            <p className="eyebrow">HAPPY BIRTHDAY</p>
            <h1>To My Favourite Bhaiya ♡</h1>
            <p>
              Duniya mein bohot saare special log hain, but mere liye aapki jagah
              sabse alag hai. This little world is all yours.
            </p>
            <div className="row main">
              <button className="btn" id="wish">
                Make a Wish ✨
              </button>
              <a
                className="btn ghost"
                href="#memories"
                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
              >
                Explore Our Memories
              </a>
            </div>
          </div>
          <div className="wishbox glass" aria-live="polite">
            <h2 id="wt">Close your eyes, make a wish, Bhaiya. ♡</h2>
            <div className="row">
              <button className="btn" id="blow">
                Blow Out the Candles
              </button>
              <button className="btn" id="cont" hidden>
                Continue ✨
              </button>
              <button className="btn ghost" id="relight" hidden>
                Light them again
              </button>
            </div>
          </div>
          <p className="hand note">Made with love, by Radhee ♡</p>
        </section>

        <section id="memories">
          <h2>Our Little Universe</h2>
          <p className="hand">Little moments, endless memories. ♡</p>
          <div className="grid" id="mgrid"></div>
        </section>

        <section id="letter">
          <div className="envwrap">
            <h2>A Letter From Radhee</h2>
            <p>Some things are easier to write than to say...</p>
            <div className="env" id="env" aria-hidden="true">
              <div className="flap"></div>
              <div className="seal">♡</div>
            </div>
            <div className="row" style={{ justifyContent: "center" }}>
              <button className="btn" id="openL">
                Open My Letter ♡
              </button>
              <button className="btn ghost" id="skipL" hidden>
                Show full letter
              </button>
            </div>
          </div>
          <article className="paper" id="paper" hidden></article>
        </section>

        <section id="special">
          <h2>Why You’re Special, Bhaiya</h2>
          <p>Tap a card to open it.</p>
          <div className="cards" id="cards"></div>
        </section>

        <section id="surprise">
          <h2>The Secret Birthday Surprise</h2>
          <p className="hand">Something just for you...</p>
          <div className="row" style={{ marginTop: "20rem" }}>
            <button className="btn" id="gift">
              Open Your Surprise ✨
            </button>
          </div>
          <div className="final glass" id="final" aria-live="polite"></div>
        </section>

        <section id="finale">
          <h1>Happy Birthday, Bhaiya! ♡</h1>
          <p>
            May this new year of your life bring you more happiness, bigger dreams,
            beautiful memories, and countless reasons to smile.
          </p>
          <p className="hand">Made with all my love, Radhee.</p>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn" id="again">
              Experience Again
            </button>
            <button className="btn ghost" id="back">
              Back to Our Memories
            </button>
          </div>
          <footer>An entire little universe, made with love by Radhee. ♡</footer>
        </section>
      </main>

      <div id="modal" role="dialog" aria-modal="true" aria-label="Photo viewer">
        <div className="mbox glass">
          <img id="mimg" alt="" />
          <h3 id="mt"></h3>
          <p id="mc"></p>
          <div className="mctl">
            <button className="btn ghost" id="mp" aria-label="Previous photo">
              ‹
            </button>
            <button className="btn" id="mx">
              Close
            </button>
            <button className="btn ghost" id="mn" aria-label="Next photo">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
