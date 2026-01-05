"use client";

import { motion } from "framer-motion";

const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Netflix",
    "YouTube",
    "Spotify"
];

export default function TrustedBy() {
    return (
        <section className="py-20 border-b border-gray-200 dark:border-zinc-900 bg-white dark:bg-black">
            <div className="w-full max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-xl font-medium text-gray-600 dark:text-zinc-500 mb-10">Trusted by developers at innovative companies</h2>

                <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-50">
                    {companies.map((company, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex items-center"
                        >
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-zinc-400 dark:to-zinc-600 select-none">
                                {company}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
