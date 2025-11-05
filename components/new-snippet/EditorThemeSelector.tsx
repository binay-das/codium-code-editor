"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useCodeEditorStore } from "@/hooks/useCodeEditor";
import { Moon, Sun, Github, Laptop, Cloud } from "lucide-react";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="w-4 h-4" />,
  "vs-light": <Sun className="w-4 h-4" />,
  "github-dark": <Github className="w-4 h-4" />,
  monokai: <Laptop className="w-4 h-4" />,
  "solarized-dark": <Cloud className="w-4 h-4" />,
};

const THEME_LABELS: Record<string, string> = {
  "vs-dark": "Dark",
  "vs-light": "Light",
  "github-dark": "GitHub",
  monokai: "Monokai",
  "solarized-dark": "Solarized",
};

export default function EditorThemeSelector() {
  const theme = useCodeEditorStore((s) => s.theme);
  const setTheme = useCodeEditorStore((s) => s.setTheme);

  const themes = React.useMemo(() => Object.keys(THEME_ICONS), []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md"
          aria-label="Select editor theme"
        >
          <span className="flex items-center">
            {THEME_ICONS[theme] ?? <Moon className="w-4 h-4" />}
          </span>
          <span className="text-sm font-medium">
            {THEME_LABELS[theme] ?? theme}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44 p-1">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t}
            onClick={() => setTheme(t)}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/60"
          >
            <span className="flex items-center">{THEME_ICONS[t]}</span>
            <span className="text-sm">{THEME_LABELS[t] ?? t}</span>
            <div className="ml-auto">
              {t === theme && (
                <span className="text-xs text-muted-foreground">Selected</span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
