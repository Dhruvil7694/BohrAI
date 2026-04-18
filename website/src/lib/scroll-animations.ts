import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function killAllTriggers() {
  ScrollTrigger.getAll().forEach((st) => st.kill())
}

export function revealUp(
  targets: string | Element | Element[],
  opts: { start?: string; scrub?: number | boolean; duration?: number; y?: number } = {},
) {
  const { start = "top 88%", scrub, duration = 0.7, y = 36 } = opts
  const trigger = typeof targets === "string" ? targets : (Array.isArray(targets) ? targets[0] : targets)
  return gsap.from(targets, {
    autoAlpha: 0,
    y,
    duration,
    ease: "power2.out",
    scrollTrigger: {
      trigger,
      start,
      ...(scrub !== undefined ? { scrub, end: "bottom 50%" } : { toggleActions: "play none none none" }),
    },
  })
}

export function staggerRevealUp(
  targets: string,
  opts: { stagger?: number; start?: string; y?: number; duration?: number } = {},
) {
  const { stagger = 0.1, start = "top 85%", y = 28, duration = 0.6 } = opts
  return gsap.from(targets, {
    autoAlpha: 0,
    y,
    duration,
    stagger,
    ease: "power2.out",
    scrollTrigger: {
      trigger: targets,
      start,
      toggleActions: "play none none none",
    },
  })
}

export function revealFromSide(
  targets: string,
  direction: "left" | "right" = "left",
  opts: { start?: string; x?: number; scrub?: number | boolean; duration?: number } = {},
) {
  const { start = "top 88%", x = 40, scrub, duration = 0.7 } = opts
  return gsap.from(targets, {
    autoAlpha: 0,
    x: direction === "left" ? -x : x,
    duration,
    ease: "power3.out",
    scrollTrigger: {
      trigger: targets,
      start,
      ...(scrub !== undefined ? { scrub, end: "bottom 55%" } : { toggleActions: "play none none none" }),
    },
  })
}

export function parallaxY(targets: string, yAmount = 60, opts: { start?: string; end?: string; scrub?: number } = {}) {
  const { start = "top bottom", end = "bottom top", scrub = 0.8 } = opts
  return gsap.to(targets, {
    y: yAmount,
    ease: "none",
    scrollTrigger: { trigger: targets, start, end, scrub },
  })
}

export function batchReveal(
  targets: string,
  opts: { stagger?: number; y?: number; scale?: number; start?: string } = {},
) {
  const { stagger = 0.1, y = 28, scale = 0.96, start = "top 88%" } = opts
  ScrollTrigger.batch(targets, {
    onEnter: (els) => {
      gsap.fromTo(
        els,
        { autoAlpha: 0, y, scale },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger, ease: "power2.out" },
      )
    },
    once: true,
    start,
  })
}

export function scrubTimeline(
  trigger: string,
  build: (tl: gsap.core.Timeline) => void,
  opts: { start?: string; end?: string; scrub?: number; pin?: boolean } = {},
) {
  const { start = "top top", end = "+=800", scrub = 1, pin = false } = opts
  const tl = gsap.timeline({
    scrollTrigger: { trigger, start, end, scrub, pin, pinSpacing: pin },
  })
  build(tl)
  return tl
}
