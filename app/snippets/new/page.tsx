"use client";

import Header from "@/components/new-snippet/Header";
import EditorPanel from "@/components/new-snippet/EditorPanel";
import OutputPanel from "@/components/new-snippet/OutputPanel";

export default function NewSnippetPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0b0f] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] shadow-sm p-4 transition-colors">
            <EditorPanel />
          </div>
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] shadow-sm p-4 transition-colors">
            <OutputPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
