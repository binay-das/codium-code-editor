"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Is Codium free to use?",
        answer: "Yes! We have a generous free plan that includes unlimited public snippets and basic features. You can upgrade to Pro for more advanced features.",
    },
    {
        question: "Which programming languages do you support?",
        answer: "We support syntax highlighting and formatting for many programming languages including JavaScript, Python, Rust, Go, C++, and many others.",
    },
    {
        question: "Can I share my snippets with others?",
        answer: "Absolutely. Every snippet you create gets a unique URL that you can share with anyone. You can also embed snippets directly into your own website or documentation.",
    },
    {
        question: "How secure is my code?",
        answer: "Security is our top priority. We use industry-standard encryption for all data in transit and at rest. Private snippets are only accessible to you.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-zinc-950">
            <div className="lg:w-5xl w-full mx-auto px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-zinc-400">Everything you need to know about Codium</p>
                </div>

                <div className="w-full max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-zinc-800 rounded-lg bg-zinc-900/30 overflow-hidden w-full"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-900/50 transition-colors focus:outline-none"
                            >
                                <span className="text-lg font-medium text-white">{faq.question}</span>
                                <ChevronDown
                                    className={`h-5 w-5 text-zinc-500 transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-zinc-400 leading-relaxed border-t border-zinc-800/50">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
