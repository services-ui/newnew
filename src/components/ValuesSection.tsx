/**
 * About → "What We Believe In" / "What We Avoid".
 *
 * One dark band, two columns divided by a hairline spine.
 *  - Believe: each principle is a node on a connected blue rail; the tick draws itself in.
 *  - Avoid:   each item is struck through by a line that draws across it, on a rail that is dashed and faint.
 *  - A faint dot grid and two static blooms sit behind everything. Nothing follows the mouse.
 * Both columns stretch to the same height, so the shorter list never leaves a hole.
 */
export default function ValuesSection({ believe, avoid }: { believe: string[]; avoid: string[] }) {
  return (
    <section aria-label="Values" className="sec on-dark grain relative isolate overflow-hidden bg-night">
      {/* ambient: two soft blooms and a faint dot grid (static) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -right-[10%] -top-[18%] h-[70%] w-[60%]"
          style={{ background: "radial-gradient(closest-side, rgb(0 102 255 / 0.26), transparent)" }}
        />
        <div
          className="absolute -bottom-[22%] -left-[8%] h-[70%] w-[55%]"
          style={{ background: "radial-gradient(closest-side, rgb(0 178 255 / 0.13), transparent)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgb(150 195 255 / 0.1) 1px, transparent 1.6px)",
            backgroundSize: "28px 28px",
            WebkitMaskImage: "linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent)",
            maskImage: "linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent)",
          }}
        />
      </div>

      <div className="wrap relative">
        <div className="relative grid gap-x-24 gap-y-16 lg:grid-cols-2">
          {/* the spine */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-[linear-gradient(180deg,transparent,rgb(255_255_255/0.22)_20%,rgb(255_255_255/0.22)_80%,transparent)] lg:block"
          />

          {/* ── what we believe in ── */}
          <div className="flex flex-col">
            <h2
              data-rv="up"
              className="flex items-center gap-4 text-[clamp(1.7rem,2.6vw,2.3rem)] font-semibold tracking-[-0.03em] text-white"
            >
              <span
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[image:var(--fin-grad)] text-white shadow-[0_0_0_6px_rgb(0_102_255/0.16),0_14px_30px_-10px_rgb(0_102_255/0.9)]"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.6 4.6L19 7.6" />
                </svg>
              </span>
              <span>
                What We <span className="grad">Believe In</span>
              </span>
            </h2>

            <ul className="mt-10 flex flex-1 flex-col">
              {believe.map((item, i) => (
                <li
                  key={item}
                  data-rv="up"
                  style={{ ["--d" as string]: `${i * 80}ms` } as React.CSSProperties}
                  className="group relative -mx-3 grid flex-1 grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-5 px-3 py-[0.95rem]"
                >
                  <span aria-hidden className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* the rail that joins one principle to the next */}
                  {believe.length > 1 && (
                    <span
                      aria-hidden
                      data-rv="vline"
                      style={{ ["--d" as string]: `${300 + i * 110}ms`, transitionDuration: "700ms" } as React.CSSProperties}
                      className={`absolute left-[calc(0.75rem+1.25rem-0.5px)] w-px bg-[linear-gradient(180deg,rgb(60_150_255/0.75),rgb(60_150_255/0.35))] ${
                        i === 0 ? "top-1/2 bottom-0" : i === believe.length - 1 ? "top-0 bottom-1/2" : "inset-y-0"
                      }`}
                    />
                  )}
                  <span
                    aria-hidden
                    className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-night text-[#7fb8ff] shadow-[inset_0_0_0_1.5px_rgb(80_160_255/0.6)] transition-[background-color,color,box-shadow] duration-300 group-hover:bg-[image:var(--fin-grad)] group-hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path
                        d="M5 12.5l4.6 4.6L19 7.6"
                        pathLength={1}
                        data-rv="path"
                        style={{ ["--d" as string]: `${350 + i * 110}ms`, transitionDuration: "900ms" } as React.CSSProperties}
                      />
                    </svg>
                  </span>
                  <span className="text-[clamp(1.1rem,1.5vw,1.3rem)] font-medium leading-snug tracking-[-0.018em] text-white transition-[translate] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:translate-x-1.5">
                    {item}
                  </span>
                  <span aria-hidden className="tnum font-mono text-[0.8rem] text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── what we avoid ── */}
          <div className="flex flex-col">
            <h2
              data-rv="up"
              style={{ ["--d" as string]: "120ms" } as React.CSSProperties}
              className="flex items-center gap-4 text-[clamp(1.7rem,2.6vw,2.3rem)] font-semibold tracking-[-0.03em] text-white"
            >
              <span
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/6 text-[#ff9a9a] shadow-[inset_0_0_0_1.5px_rgb(255_154_154/0.5)]"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
                </svg>
              </span>
              <span>
                What We <span className="text-white/45">Avoid</span>
              </span>
            </h2>

            <ul className="mt-10 flex flex-1 flex-col">
              {avoid.map((item, i) => (
                <li
                  key={item}
                  data-rv="up"
                  style={{ ["--d" as string]: `${160 + i * 80}ms` } as React.CSSProperties}
                  className="group relative -mx-3 grid flex-1 grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-5 px-3 py-[0.95rem]"
                >
                  <span aria-hidden className="absolute inset-0 rounded-2xl bg-white/4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* a dashed, faint rail: these don't lead anywhere */}
                  {avoid.length > 1 && (
                    <span
                      aria-hidden
                      data-rv="vline"
                      style={{ ["--d" as string]: `${400 + i * 110}ms`, transitionDuration: "700ms" } as React.CSSProperties}
                      className={`absolute left-[calc(0.75rem+1.25rem-0.5px)] w-0 border-l border-dashed border-white/20 ${
                        i === 0 ? "top-1/2 bottom-0" : i === avoid.length - 1 ? "top-0 bottom-1/2" : "inset-y-0"
                      }`}
                    />
                  )}
                  <span
                    aria-hidden
                    className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-night text-white/45 shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.2)] transition-[color,box-shadow] duration-300 group-hover:text-[#ff9a9a] group-hover:shadow-[inset_0_0_0_1.5px_rgb(255_154_154/0.65)]"
                  >
                    <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path
                        d="M6.5 6.5l11 11M17.5 6.5l-11 11"
                        pathLength={1}
                        data-rv="path"
                        style={{ ["--d" as string]: `${450 + i * 110}ms`, transitionDuration: "900ms" } as React.CSSProperties}
                      />
                    </svg>
                  </span>
                  <span className="text-[clamp(1.1rem,1.5vw,1.3rem)] font-medium leading-snug tracking-[-0.018em] text-white/60">
                    {/* the item, struck through by a line that draws itself across as it scrolls into view */}
                    <span data-rv="strike" style={{ ["--d" as string]: `${550 + i * 140}ms` } as React.CSSProperties}>
                      {item}
                    </span>
                  </span>
                  <span aria-hidden className="tnum font-mono text-[0.8rem] text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
