import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Hero() {
    return (
        <section className="flex w-full max-w-5xl flex-col items-center px-6 pt-32 pb-20 text-center sm:pt-40">
            <div className="mb-6 inline-flex items-center rounded-full border border-gray-300 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900/50 px-3 py-1 text-xs font-medium text-gray-700 dark:text-zinc-400 backdrop-blur-sm">
                <span>The editor for modern developers</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl text-gray-900 dark:text-transparent dark:bg-gradient-to-b dark:from-white dark:to-zinc-500 dark:bg-clip-text">
                Code at the speed<br />of thought.
            </h1>

            <p className="mb-10 max-w-xl text-lg text-gray-600 dark:text-zinc-400 sm:text-xl">
                Capture snippets, manage projects and streamline your workflow in a beautifully designed environment.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
                <SignedIn>
                    <Link
                        href="/snippets"
                        className="group relative inline-flex h-11 items-center justify-center rounded-md border border-gray-300 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-950 px-8 text-sm font-medium text-gray-700 dark:text-zinc-300 transition-colors hover:bg-gray-200 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-zinc-700 hover:border-gray-400 dark:hover:border-zinc-700"
                    >
                        My Snippets
                    </Link>
                    <Link
                        href="/snippets/new"
                        className="inline-flex h-11 items-center justify-center rounded-md bg-gray-900 dark:bg-white px-8 text-sm font-medium text-white dark:text-black transition-transform active:scale-95 hover:bg-gray-800 dark:hover:bg-zinc-200"
                    >
                        Create Snippet
                    </Link>
                </SignedIn>

                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="inline-flex h-11 items-center justify-center rounded-md bg-gray-900 dark:bg-white px-8 text-sm font-medium text-white dark:text-black transition-transform active:scale-95 hover:bg-gray-800 dark:hover:bg-zinc-200">
                            Get Started
                        </button>
                    </SignInButton>
                </SignedOut>
            </div>
        </section>
    );
}
