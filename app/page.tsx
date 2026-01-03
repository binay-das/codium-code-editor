import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Github } from "lucide-react";
import TrustedBy from "@/components/landing/TrustedBy";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CallToAction from "@/components/landing/CallToAction";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black font-sans text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black opacity-40 pointer-events-none fixed" />

      <div className="absolute inset-x-0 top-0 h-[500px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <main className="relative z-10 flex w-full flex-col items-center">
        <section className="flex w-full max-w-5xl flex-col items-center px-6 pt-32 pb-20 text-center sm:pt-40">
          <div className="mb-6 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-400 backdrop-blur-sm">
            <span>The editor for modern developers</span>
          </div>

          <h1 className="mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
            Code at the speed<br />of thought.
          </h1>

          <p className="mb-10 max-w-xl text-lg text-zinc-400 sm:text-xl">
            Capture snippets, manage projects and streamline your workflow in a beautifully designed environment.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <SignedIn>
              <Link
                href="/snippets"
                className="group relative inline-flex h-11 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 px-8 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 hover:border-zinc-700"
              >
                My Snippets
              </Link>
              <Link
                href="/snippets/new"
                className="inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black transition-transform active:scale-95 hover:bg-zinc-200"
              >
                Create Snippet
              </Link>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="inline-flex h-11 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black transition-transform active:scale-95 hover:bg-zinc-200">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </section>

        <section className="relative w-full max-w-4xl px-4 pb-24">
          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/20"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500/20"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/20"></div>
              <div className="ml-2 text-xs text-zinc-500">example.java</div>
            </div>
            <div className="p-4 font-mono text-sm text-zinc-300">

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">1</span>
                <span>
                  <span className="text-purple-400">import</span>{" "}
                  <span className="text-yellow-200">java.util.Scanner</span>;
                </span>
              </div>


              <div className="flex">
                <span className="w-8 select-none text-zinc-700">2</span>
                <span>&nbsp;</span>
              </div>

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">3</span>
                <span>
                  <span className="text-purple-400">public</span>{" "}
                  <span className="text-purple-400">class</span>{" "}
                  <span className="text-yellow-200">Welcome</span>{" "}
                  {"{"}
                </span>
              </div>

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">4</span>
                <span>&nbsp;</span>
              </div>

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">5</span>
                <span>
                  &nbsp;&nbsp;
                  <span className="text-purple-400">public</span>{" "}
                  <span className="text-purple-400">static</span>{" "}
                  <span className="text-purple-400">void</span>{" "}
                  <span className="text-blue-400">main</span>(
                  <span className="text-yellow-200">String</span>[]{" "}
                  <span className="text-blue-300">args</span>){" "}
                  {"{"}
                </span>
              </div>

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">6</span>
                <span>&nbsp;</span>
              </div>

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">7</span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-yellow-200">Scanner</span>{" "}
                  <span className="text-blue-300">scanner</span>{" "}
                  = <span className="text-purple-400">new</span>{" "}
                  <span className="text-yellow-200">Scanner</span>(
                  <span className="text-blue-300">System</span>.in);
                </span>
              </div>

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">8</span>
                <span>&nbsp;</span>
              </div>
              <div className="flex">
                <span className="w-8 select-none text-zinc-700">9</span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-blue-300">System</span>.out.println(
                  <span className="text-green-300">"Enter your name:"</span>);
                </span>
              </div>

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">10</span>
                <span>&nbsp;</span>
              </div>
              <div className="flex">
                <span className="w-8 select-none text-zinc-700">11</span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-yellow-200">String</span>{" "}
                  <span className="text-blue-300">name</span>{" "}
                  = <span className="text-blue-300">scanner</span>.nextLine();
                </span>
              </div>

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">12</span>
                <span>&nbsp;</span>
              </div>
              <div className="flex">
                <span className="w-8 select-none text-zinc-700">13</span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-blue-300">System</span>.out.println(
                  <span className="text-green-300">
                    "Welcome "
                  </span>
                  + <span className="text-blue-300">name</span> +{" "}
                  <span className="text-green-300">
                    " to Codium, the most powerful online code editor"
                  </span>);
                </span>
              </div>

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">14</span>
                <span>&nbsp;</span>
              </div>
              <div className="flex">
                <span className="w-8 select-none text-zinc-700">15</span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-blue-300">scanner</span>.close();
                </span>
              </div>

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">16</span>
                <span>&nbsp;</span>
              </div>

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">17</span>
                <span>&nbsp;&nbsp;{"}"}</span>
              </div>

              <div className="flex">
                <span className="w-8 select-none text-zinc-700">18</span>
                <span>{"}"}</span>
              </div>
            </div>

          </div>
          <div className="absolute -inset-4 -z-10 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50 blur-2xl"></div>
        </section>

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
              <p className="text-xs text-zinc-600">
                Built with love by{" "}
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
