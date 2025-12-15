"use client";

import { useCodeEditorStore } from "@/hooks/useCodeEditor";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { TextCursor } from "lucide-react";

export function FontSizeSelector() {
  const { fontSize, setFontSize } = useCodeEditorStore();
  const [value, setValue] = useState<number>(fontSize || 16);

  useEffect(() => {
    setValue(fontSize);
  }, [fontSize]);

  const handleChange = (val: number[]) => {
    const newSize = val[0];
    setValue(newSize);
    setFontSize(newSize);
  };

  return (
    <div className="flex items-center justify-between gap-3 py-2 px-2">
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-zinc-400">
            <TextCursor className="size-3.5" />
            Font Size
          </div>
          <span className="text-xs font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-gray-600 dark:text-zinc-300">
            {value}px
          </span>
        </div>

        <Slider
          value={[value]}
          min={12}
          max={24}
          step={1}
          onValueChange={handleChange}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
