import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { RESUME } from "@/content/site";

export const metadata: Metadata = {
  title: "Snigdha_Nagpal_Resume",
  description: "Resume of Snigdha Nagpal.",
};

export default function ResumePage() {
  return (
    <>
      <main className="flex-1">
        <section aria-labelledby="resume-title" className="mx-auto max-w-5xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <h1 id="resume-title" className="font-display text-[28px] font-bold leading-tight tracking-tight md:text-[36px]">
              Resume
            </h1>
            <a
              href={RESUME.file}
              download={RESUME.filename}
              className="shrink-0 rounded-pill bg-purple-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-purple-700"
            >
              Download
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-card border border-black/10 bg-surface-50">
            {/* Phone browsers won't reliably show a PDF inside a page, so they get a picture of it */}
            <iframe
              src={`${RESUME.file}#toolbar=0&navpanes=0&view=FitH`}
              title="Snigdha Nagpal's resume"
              className="hidden h-[85vh] w-full md:block"
            />
            <Image
              src="/images/resume-preview.png"
              alt="Snigdha Nagpal's resume. Use the Download button for the PDF."
              width={1274}
              height={1800}
              sizes="100vw"
              loading="eager"
              className="h-auto w-full md:hidden"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
