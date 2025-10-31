"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

interface SnippetCardProps {
  title: string;
  language: string;
  code: string;
  createdAt?: string;
}

export default function SnippetCard({ title, language, code, createdAt }: SnippetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="border border-gray-700 rounded-xl p-4 bg-[#111] hover:bg-[#1b1b1b] transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-xs text-gray-400">
            {/* {language.toUpperCase()} • {new Date(createdAt).toLocaleDateString()} */}
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="text-gray-300 hover:text-white border border-gray-700 px-2 py-1 rounded-md text-xs flex items-center gap-1"
        >
          <Copy className="w-3.5 h-3.5" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="text-gray-300 text-sm bg-black/40 p-3 rounded-md overflow-x-auto max-h-48 whitespace-pre-wrap">
        <code>{code.slice(0, 300)}{code.length > 300 ? "..." : ""}</code>
      </pre>
    </div>
  );
}
