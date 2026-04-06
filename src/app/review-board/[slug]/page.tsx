import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { reviewBoardProfiles } from "../components/data.reviewboards";

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = reviewBoardProfiles.find((p) => p.slug === slug);
  if (!profile) return {};
  return buildMetadata({
    title: `${profile.name} — Imperialpedia Financial Review Board`,
    description: `${profile.name} is ${profile.currently}. Expertise: ${profile.expertise}.`,
  });
}

// ─── LinkedIn SVG icon ────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-white"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── Fact row — "CURRENTLY / Senior Editor, ..." ─────────────────────────────

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
        {label}
      </dt>
      <dd className="text-[0.9375rem] text-foreground leading-snug">{value}</dd>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ReviewBoardProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = reviewBoardProfiles.find((p) => p.slug === slug);
  if (!profile) notFound();

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">

        {/* ── Two-column layout ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">

          {/* ── LEFT COLUMN: photo + name + LinkedIn ─────────────────── */}
          <div className="flex-shrink-0 md:w-44">
            {/* Photo — square, grayscale */}
            <div className="relative w-44 h-44 overflow-hidden">
              <Image
                src={profile.imageUrl}
                alt={profile.name}
                fill
                className="object-cover object-top grayscale"
                sizes="176px"
              />
            </div>

            {/* Name caption below photo */}
            <p className="mt-2 text-sm text-foreground">
              {profile.name}
            </p>

            {/* LinkedIn button */}
            {profile.linkedInUrl && (
              <Link
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${profile.name} on LinkedIn`}
                className="inline-flex items-center justify-center w-8 h-8 mt-3 bg-[#0A66C2] hover:bg-[#004182] rounded transition-colors"
              >
                <LinkedInIcon />
              </Link>
            )}
          </div>

          {/* ── RIGHT COLUMN: H1 + facts + sections ──────────────────── */}
          <div className="flex-1 min-w-0">

            {/* H1 name */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
              {profile.name}
            </h1>

            {/* Labeled facts */}
            <dl className="mb-7 space-y-0">
              <FactRow label="Currently" value={profile.currently} />
              <FactRow label="Resides In" value={profile.residesIn} />
              <FactRow label="Education" value={profile.education} />
              <FactRow label="Expertise" value={profile.expertise} />
            </dl>

            {/* ── Summary section ─────────────────────────────────────── */}
            <section className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-2">
                Summary
              </h2>
              <ul className="space-y-1">
                {profile.summary.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[0.9375rem] text-foreground leading-relaxed"
                  >
                    {/* Plain bullet — matches screenshot (no icon, just a filled disc) */}
                    <span className="mt-[0.5rem] flex-shrink-0 w-[5px] h-[5px] rounded-full bg-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* ── Experience section ───────────────────────────────────── */}
            <section className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-2">
                Experience
              </h2>
              <div className="space-y-4">
                {profile.experience.map((para, i) => (
                  <p
                    key={i}
                    className="text-[0.9375rem] leading-relaxed text-foreground"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {/* ── Education section ────────────────────────────────────── */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Education
              </h2>
              <p className="text-[0.9375rem] leading-relaxed text-foreground">
                {profile.educationDetail}
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}