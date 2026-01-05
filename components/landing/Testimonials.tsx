"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        content: "Codium has completely transformed how our team shares code snippets. It's concise, beautiful, and the syntax highlighting is flawless.",
        author: "Sarah Chen",
        role: "Senior Engineer @ConfidentialStartup",
        avatar: "S",
        color: "bg-blue-500",
    },
    {
        content: "The best developer tool I've used this year. The user interface is stunning and the performance is incredible. Highly recommended!",
        author: "Alex Morgan",
        role: "CTO @ConfidentialStartup",
        avatar: "A",
        color: "bg-purple-500",
    },
    {
        content: "Finally, a snippet manager that actually looks good and works well. The collaboration features are a game changer for pair programming.",
        author: "Jordan Lee",
        role: "Frontend Lead @ConfidentialStartup",
        avatar: "J",
        color: "bg-green-500",
    },
];

export default function Testimonials() {
    return (
        <section className="py-32 bg-white dark:bg-black border-t border-gray-200 dark:border-zinc-900">
            <div className="w-full max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">Loved by developers worldwide</h2>
                    <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Don&apos;t just take our word for it. Here&apos;s what the community has to say about Codium.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex flex-col h-full p-8 rounded-2xl bg-gray-50 dark:bg-zinc-900/30 border border-gray-200 dark:border-zinc-800"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>

                            <blockquote className="flex-1 text-gray-700 dark:text-zinc-300 text-lg leading-relaxed mb-8">
                                &quot;{testimonial.content}&quot;
                            </blockquote>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${testimonial.color}`}>
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                                    <div className="text-sm text-gray-500 dark:text-zinc-500">{testimonial.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
