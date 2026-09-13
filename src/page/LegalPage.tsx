import LegalShell from "@/components/legal/LegalShell"
import type { LegalDocument } from "@/content/legal"

/** Public page for the Privacy Policy and Terms of Service. The copy lives in content/legal.ts. */
export default function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <LegalShell>
      <article className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-navy">{document.title}</h1>
          <p className="text-sm text-muted-foreground">Effective {document.effectiveDate}</p>
          <p className="text-foreground">{document.intro}</p>
        </header>

        {document.sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </article>
    </LegalShell>
  )
}
