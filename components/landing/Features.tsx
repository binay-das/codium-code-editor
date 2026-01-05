"use client";

import { motion } from "framer-motion";
import { Code2, Share, Zap } from "lucide-react";

const features = [
    {
        icon: <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
        title: "Multi-Language Support",
        description: "Syntax highlighting and formatting for over 100+ programming languages. From Python to Rust, we've got you covered.",
        gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
        icon: <Share className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
        title: "Instant Sharing",
        description: "Generate unique links for your code snippets instantly. Share with teammates or embed in your documentation.",
        gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
        icon: <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
        title: "Lightning Fast",
        description: "Built on the edge for minimal latency. Your code loads instantly, everywhere in the world.",
        gradient: "from-yellow-500/20 to-orange-500/20",
    },
];

export default function Features() {
    return (
        <section className="py-32 relative overflow-hidden bg-white dark:bg-black">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

            <div className="w-full max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">Everything you need to <span className="text-blue-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400">code better</span></h2>
                    <p className="text-lg text-gray-600 dark:text-zinc-400">
                        Powerful features designed to help you write, share, and manage code snippets with ease.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:bg-gray-50 dark:hover:bg-zinc-900/80 transition-all duration-300 hover:border-gray-300 dark:hover:border-zinc-700"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                            <div className="relative z-10">
                                <div className="mb-6 inline-flex p-3 rounded-lg bg-gray-100 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 shadow-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
