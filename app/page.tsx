
import Hero from "@/components/landing/Hero";
import CodeBlock from "@/components/landing/CodeBlock";
import Link from "next/link";
import { Github, Heart } from "lucide-react";
import TrustedBy from "@/components/landing/TrustedBy";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CallToAction from "@/components/landing/CallToAction";
import Header from "@/components/new-snippet/Header";


export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black font-sans text-white">
      <Header
        showLanguageSelector={false}
        showSnippetsLink={false}
        showEditorControls={false}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black opacity-40 pointer-events-none fixed" />

      <div className="absolute inset-x-0 top-0 h-[500px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <main className="relative z-10 flex w-full flex-col items-center">
        <Hero />
        <CodeBlock />

        <section className="grid w-full max-w-5xl gap-8 px-6 py-24 sm:grid-cols-3">
          <div className="group rounded-lg border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700 hover:bg-zinc-900/50">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Instant Snippets</h3>
            <p className="text-sm text-zinc-400">Save your code thoughts instantly. No friction, just focus.</p>
          </div>
          <div className="group rounded-lg border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700 hover:bg-zinc-900/50">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Syntax Highlighting</h3>
            <p className="text-sm text-zinc-400">Beautiful syntax highlighting for over many languages.</p>
          </div>
          <div className="group rounded-lg border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700 hover:bg-zinc-900/50">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Secure Cloud</h3>
            <p className="text-sm text-zinc-400">Your snippets are safe in the cloud, accessible from any device.</p>
          </div>
        </section>

        <TrustedBy />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CallToAction />

        <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-12 text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            <h2 className="bg-gradient-to-r from-zinc-200 to-zinc-500 bg-clip-text text-2xl font-bold text-transparent">
              Codium
            </h2>

            {/* Prominent link to GitHub profile */}
            <Link
              href="https://github.com/binay-das"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-6 py-2.5 text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white hover:border-zinc-700 hover:scale-105"
            >
              <Github className="h-5 w-5" />
              <span className="font-medium">My GitHub</span>
            </Link>

            <div className="flex gap-6 items-center">
              <Link href="/snippets" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Snippets
              </Link>
              <Link
                href="https://github.com/binay-das/codium-code-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Give the repository a star
              </Link>
            </div>

            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-xs text-zinc-600 flex items-center gap-1">
                Built with <Heart className="h-4 w-4" /> by{" "}
                <Link
                  href="https://github.com/binay-das"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-2 hover:text-zinc-400 transition-colors"
                >
                  binay-das
                </Link>
              </p>
              <p className="text-xs text-zinc-600">
                &copy; {new Date().getFullYear()} Codium. Crafted for builders.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );

}
