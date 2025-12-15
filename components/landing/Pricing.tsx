"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "Perfect for hobbyists and students.",
        features: [
            "Unlimited public snippets",
            "5 private snippets",
            "Basic syntax highlighting",
            "Community support",
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        price: "$12",
        period: "/month",
        description: "For professional developers who need more.",
        features: [
            "Unlimited private snippets",
            "Advanced syntax highlighting",
            "Custom themes",
            "Priority support",
            "Snippet analytics",
        ],
        cta: "Upgrade to Pro",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large teams and organizations.",
        features: [
            "SSO & Advanced Security",
            "Dedicated account manager",
            "Custom SLA",
            "On-premise deployment",
            "Audit logs",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

export default function Pricing() {
    return (
        <section className="py-32 bg-zinc-950 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Simple, transparent pricing</h2>
                    <p className="text-lg text-zinc-400">Choose the plan that's right for you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`relative rounded-2xl border p-8 flex flex-col ${plan.popular
                                    ? "border-blue-500/50 bg-zinc-900/80 shadow-2xl shadow-blue-500/10"
                                    : "border-zinc-800 bg-zinc-900/30"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-8 text-center">
                                <h3 className="text-lg font-medium text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline justify-center gap-1 mb-4">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    {plan.period && <span className="text-zinc-500">{plan.period}</span>}
                                </div>
                                <p className="text-zinc-400 text-sm">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-zinc-300 text-sm">
                                        <Check className="h-4 w-4 text-blue-400 mr-3 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/snippets/new"
                                className={`w-full py-3 rounded-lg text-sm font-medium transition-colors text-center ${plan.popular
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-zinc-800 hover:bg-zinc-700 text-white"
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
