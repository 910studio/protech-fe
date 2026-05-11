import { V2Hero } from './_components/V2Hero'
import { EditorialTile } from './_components/EditorialTile'
import { CompactTile } from './_components/CompactTile'
import { CuratorNote } from './_components/CuratorNote'
import { Rail, RailItem } from './_components/Rail'
import { CategoryChipRail } from './_components/CategoryChipRail'

export default function V2Landing() {
  return (
    <>
      <V2Hero />
      <CategoryChipRail />

      <section className="bg-[var(--c-bg)] px-5 py-5 lg:px-6 lg:py-6">
        <div className="mx-auto flex max-w-[var(--max-w)] flex-col gap-5 lg:gap-6">
          {/* MAGAZINE ROW A — tall feature + 2 compacts (rail on mobile) */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <EditorialTile
                kicker="Studio pick · 02"
                index="02"
                brand="APPLE · MACBOOK PRO M4"
                title={<>For the team that ships on Friday.</>}
                body="M4 Pro silicon, 22-hour battery, Liquid Retina XDR. The premium pick when your engineers, designers, and execs need a Mac."
                primaryHref="/v2/shop/macbook-pro-m4"
                secondaryHref="/v2/shop/macbook-pro-m4?buy=1"
                image="/v2/products/protech/macbook-pro-m4.png"
                imageAlt="MacBook Pro M4"
                imageW={800}
                imageH={800}
                imageSide="right"
                theme="lilac"
                imageScale={1.35}
                size="tall"
                delay={0}
              />
            </div>
            <div className="lg:col-span-5">
              <Rail cols={2} className="lg:!flex lg:flex-col">
                <RailItem>
                  <CompactTile
                    brand="DELL · PRO 14"
                    title={<>Light enough for the road.</>}
                    body="Intel Core Ultra 7-255U. 1.4 kg. 19-hour battery."
                    href="/v2/shop/dell-pro-14"
                    image="/v2/products/protech/dell-pro-14.png"
                    imageAlt="Dell Pro 14"
                    imageW={800}
                    imageH={800}
                    theme="mint"
                    imageScale={1.4}
                    imageAnchor="bottom-right"
                    delay={0.08}
                  />
                </RailItem>
                <RailItem>
                  <CompactTile
                    brand="LENOVO · ULTRA 9-185H"
                    title={<>Workstation power, ThinkPad heritage.</>}
                    body="Core Ultra 9. 32 GB DDR5. 2.8K OLED. Built for engineers and design crews."
                    href="/v2/shop/lenovo-ultra-9"
                    image="/v2/products/protech/lenovo-ultra-9.png"
                    imageAlt="Lenovo Ultra 9-185H"
                    imageW={800}
                    imageH={800}
                    theme="cream"
                    imageScale={1.3}
                    imageAnchor="bottom-right"
                    delay={0.16}
                  />
                </RailItem>
              </Rail>
            </div>
          </div>

          {/* CURATOR'S NOTE */}
          <CuratorNote
            kicker="A note from the studio"
            title={<>Ten devices.<br />Three brands.<br />One opinion.</>}
            body={
              <p>
                Mongolia&apos;s biggest companies don&apos;t need a catalog of
                10,000 SKUs. They need a list. Protech stocks the devices
                we&apos;d actually recommend to a friend running the country&apos;s
                payroll — across Apple, Lenovo, and Dell. No upsell, no
                shelf-fillers. Just hardware your team will quietly thank you for.
              </p>
            }
            delay={0.0}
          />

          {/* IMAGE-LEFT EDITORIAL — Dell Pro 16, sage pastel */}
          <EditorialTile
            kicker="Studio pick · 03"
            index="03"
            brand="DELL · PRO 16"
            title={<>Big screen, business build.</>}
            body="Sixteen inches of FHD+ for the team that lives in spreadsheets, Figma, and Excel pivot tables. Intel Core Ultra 7-255U with all-day battery."
            primaryHref="/v2/shop/dell-pro-16"
            secondaryHref="/v2/shop/dell-pro-16?buy=1"
            image="/v2/products/protech/dell-pro-16.png"
            imageAlt="Dell Pro 16"
            imageW={800}
            imageH={800}
            imageSide="left"
            theme="sage"
            imageScale={1.3}
            size="standard"
            delay={0}
          />

          {/* 3-UP MIXED PASTEL — horizontal rail on mobile, 3-col grid on lg */}
          <div>
            <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 lg:hidden">
              <span aria-hidden className="h-px w-6 bg-zinc-300" />
              Studio picks
            </p>
            <Rail cols={3}>
              <RailItem>
                <CompactTile
                  brand="APPLE · IPAD AIR M4"
                  title={<>The lightest Pro.</>}
                  body="Field teams, design crews, execs who present for a living."
                  href="/v2/shop/ipad-air-m4-11"
                  image="/v2/products/protech/ipad-air-m4.png"
                  imageAlt="iPad Air M4"
                  imageW={800}
                  imageH={800}
                  theme="butter"
                  imageScale={1.5}
                  imageAnchor="bottom-right"
                  delay={0.0}
                />
              </RailItem>
              <RailItem>
                <CompactTile
                  brand="APPLE · MACBOOK AIR M4"
                  title={<>Quiet power, all-day battery.</>}
                  body="M4 chip in the thinnest Mac. Fanless, 18 hours, the writer&apos;s laptop."
                  href="/v2/shop/macbook-air-m4-13"
                  image="/v2/products/protech/macbook-air-m4.png"
                  imageAlt="MacBook Air M4"
                  imageW={800}
                  imageH={800}
                  theme="lilac"
                  imageScale={1.35}
                  imageAnchor="bottom-right"
                  delay={0.08}
                />
              </RailItem>
              <RailItem>
                <CompactTile
                  brand="APPLE · AIRPODS PRO 2"
                  title={<>Calls that cut through.</>}
                  body="Active noise cancellation tuned for open offices."
                  href="/v2/shop/airpods-pro-2"
                  image="/v2/products/protech/airpods-pro-2.png"
                  imageAlt="AirPods Pro 2"
                  imageW={800}
                  imageH={800}
                  theme="coral"
                  imageScale={1.4}
                  imageAnchor="bottom-right"
                  delay={0.16}
                />
              </RailItem>
            </Rail>
          </div>

          {/* FLEET — dark, full editorial */}
          <EditorialTile
            kicker="Fleet program"
            brand="FOR ENTERPRISES"
            title={<>Order in fleet.<br />Onboarded in a week.</>}
            body="Mixed-brand procurement, configured, paid for, delivered. Two-year warranty. Setup, MDM enrollment, and Mongolian-language onboarding on every device."
            primaryHref="/v2/fleet"
            primaryLabel="Talk to fleet"
            secondaryHref="/v2/fleet#pricing"
            secondaryLabel="See pricing"
            image="/v2/products/iphone-17-pro-cutout.png"
            imageAlt="iPhone 17 Pro fleet"
            imageW={400}
            imageH={512}
            imageSide="right"
            theme="dark"
            imageScale={1.1}
            imageBleedX={-22}
            size="standard"
            delay={0}
          />

          {/* TRADE-IN — accent bar */}
          <article className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[28px] bg-[var(--c-accent)] p-8 text-white sm:flex-row sm:items-center sm:rounded-[32px] sm:p-12">
            <div className="max-w-[34ch]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Trade-in
              </p>
              <h2
                className="mt-2 text-[clamp(26px,2.6vw,36px)] font-semibold leading-[1.1]"
                style={{ letterSpacing: '-0.014em' }}
              >
                Trade in any brand. Get up to ₮3.5M back.
              </h2>
            </div>
            <a
              href="/v2/fleet/trade-in"
              className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[14px] font-semibold text-[var(--c-accent)] transition-colors duration-[320ms] hover:bg-zinc-100"
            >
              Get an estimate
              <span aria-hidden className="ml-2">→</span>
            </a>
          </article>
        </div>
      </section>
    </>
  )
}
