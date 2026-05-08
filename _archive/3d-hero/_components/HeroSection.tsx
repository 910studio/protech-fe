'use client'

import dynamic from 'next/dynamic'
import { useScroll, useMotionValueEvent } from 'motion/react'
import { useRef } from 'react'
import {
  openProgress,
  shiftProgress,
  portFocusProgress,
} from './scroll-state'

// 3D scene only mounts on the client. Skips SSR entirely (no hydration mismatch).
const Scene = dynamic(() => import('./Scene').then((m) => m.Scene), {
  ssr: false,
  loading: () => null,
})

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v))

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Section is 500vh. Sticky canvas pins for the first 400vh of scroll.
  // scrollYProgress 0 → 1 spans 0vh → 400vh of scrolling within the section.
  //
  // 0.00 → 0.20 : lid opens
  // 0.18 → 0.40 : laptop slides left
  // 0.45 → 0.65 : laptop rotates to reveal side ports
  // 0.65 → 1.00 : hold pose for bulk-order + trust copy
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    openProgress.set(clamp(v / 0.2))
    shiftProgress.set(clamp((v - 0.18) / 0.22))
    portFocusProgress.set(clamp((v - 0.45) / 0.2))
  })

  return (
    <section
      ref={containerRef}
      className="relative bg-zinc-50"
      style={{ height: '500vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Scene />
      </div>

      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 pointer-events-none">
        <div className="hidden lg:block" />

        <div className="flex flex-col">
          {/* 1. Hero — closed lid, opening on scroll */}
          <article className="snap-start min-h-screen flex items-center px-6 lg:px-16 pointer-events-auto">
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                MacBook Pro · 16-inch · M3
              </p>
              <h1 className="mt-3 text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-zinc-950">
                Built for the work that runs Mongolia.
              </h1>
              <p className="mt-6 text-zinc-600 text-lg leading-relaxed">
                Quietly powerful. Beautifully made. Engineered for the fleets
                running the country&apos;s leading enterprises.
              </p>
            </div>
          </article>

          {/* 2. Specs — laptop pans left, content holds right */}
          <article className="snap-start min-h-screen flex items-center px-6 lg:px-16 pointer-events-auto">
            <div className="max-w-md w-full">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Specs
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
                Specs that earn their keep.
              </h2>
              <ul className="mt-10 space-y-5 text-zinc-700">
                <li className="flex justify-between items-baseline border-b border-zinc-200 pb-4">
                  <span className="text-sm uppercase tracking-wider text-zinc-500">
                    Memory
                  </span>
                  <span className="font-mono text-xl text-zinc-950">16GB</span>
                </li>
                <li className="flex justify-between items-baseline border-b border-zinc-200 pb-4">
                  <span className="text-sm uppercase tracking-wider text-zinc-500">
                    Storage
                  </span>
                  <span className="font-mono text-xl text-zinc-950">1TB SSD</span>
                </li>
                <li className="flex justify-between items-baseline border-b border-zinc-200 pb-4">
                  <span className="text-sm uppercase tracking-wider text-zinc-500">
                    Display
                  </span>
                  <span className="font-mono text-xl text-zinc-950">
                    16&quot; XDR
                  </span>
                </li>
                <li className="flex justify-between items-baseline border-b border-zinc-200 pb-4">
                  <span className="text-sm uppercase tracking-wider text-zinc-500">
                    Battery
                  </span>
                  <span className="font-mono text-xl text-zinc-950">22 hr</span>
                </li>
              </ul>
            </div>
          </article>

          {/* 3. Ports — laptop rotates to reveal side I/O */}
          <article className="snap-start min-h-screen flex items-center px-6 lg:px-16 pointer-events-auto">
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                I/O
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
                Every port you need.
              </h2>
              <ul className="mt-8 space-y-3 text-zinc-700">
                <li className="flex items-baseline gap-3">
                  <span className="font-mono text-zinc-950 w-20">3 ×</span>
                  <span>Thunderbolt 4 / USB-C</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="font-mono text-zinc-950 w-20">1 ×</span>
                  <span>HDMI</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="font-mono text-zinc-950 w-20">1 ×</span>
                  <span>SDXC card slot</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="font-mono text-zinc-950 w-20">1 ×</span>
                  <span>MagSafe 3 power</span>
                </li>
                <li className="flex items-baseline gap-3">
                  <span className="font-mono text-zinc-950 w-20">1 ×</span>
                  <span>3.5mm headphone jack</span>
                </li>
              </ul>
            </div>
          </article>

          {/* 4. Bulk — fleet order CTA */}
          <article className="snap-start min-h-screen flex items-center px-6 lg:px-16 pointer-events-auto">
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Bulk
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
                Order in fleet.
              </h2>
              <p className="mt-5 text-zinc-600 leading-relaxed">
                Volume pricing for orders of 10+. Direct delivery anywhere in
                Mongolia, two-year warranty, full setup and onboarding included.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-3.5 bg-zinc-950 text-white text-sm tracking-wide hover:bg-zinc-800 transition-colors">
                  Request a quote
                </button>
                <button className="px-6 py-3.5 border border-zinc-900 text-zinc-950 text-sm tracking-wide hover:bg-zinc-900 hover:text-white transition-colors">
                  Full spec sheet
                </button>
              </div>
            </div>
          </article>

          {/* 5. Trust — supplier logos */}
          <article className="snap-start min-h-screen flex items-center px-6 lg:px-16 pointer-events-auto">
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Trusted by
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
                The fleets that keep Mongolia running.
              </h2>
              <p className="mt-5 text-zinc-600 leading-relaxed">
                Pharmacies, hospitals, banks, agencies. Logos drop in here once
                Protech sends the partner list.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-4 opacity-60">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 border border-zinc-300 flex items-center justify-center text-xs text-zinc-400"
                  >
                    LOGO
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
