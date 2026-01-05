"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100 dark:from-blue-900/20 via-white dark:via-black to-white dark:to-black opacity-50 pointer-events-none" />

            {/* Updated to max-w-5xl for consistency */}
            <div className="w-full max-w-5xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:to-zinc-500 mb-6">
                    Ready to elevate your coding experience?
                </h2>
                <p className="text-xl text-gray-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
                    Join thousands of developers offering their code snippets a home. Start using Codium today.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/snippets/new"
                        className="group relative inline-flex h-12 items-center justify-center rounded-full bg-gray-900 dark:bg-white px-8 text-base font-medium text-white dark:text-black transition-all hover:bg-gray-800 dark:hover:bg-zinc-200 hover:scale-105 active:scale-95"
                    >
                        Start Coding Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/about"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-gray-300 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-950 px-8 text-base font-medium text-gray-700 dark:text-zinc-300 transition-all hover:bg-gray-200 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
}
