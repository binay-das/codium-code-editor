"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="py-24 relative overflow-hidden bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-50 pointer-events-none" />

            {/* Updated to max-w-5xl for consistency */}
            <div className="w-full max-w-5xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 mb-6">
                    Ready to elevate your coding experience?
                </h2>
                <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                    Join thousands of developers offering their code snippets a home. Start using Codium today.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/snippets/new"
                        className="group relative inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-medium text-black transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95"
                    >
                        Start Coding Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/about"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 px-8 text-base font-medium text-zinc-300 transition-all hover:bg-zinc-900 hover:text-white"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
}
