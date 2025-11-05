"use client";

import { useCodeEditorStore } from "@/hooks/useCodeEditor";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
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
    <Card className="flex items-center gap-3 px-3 py-2 bg-background border border-border/40 shadow-sm rounded-lg w-[160px]">
      <TextCursor className="size-4 text-muted-foreground" />
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>Font Size</span>
          <span className="text-[11px] font-medium text-foreground">{value}px</span>
        </div>
        <Slider
          value={[value]}
          min={12}
          max={28}
          step={1}
          onValueChange={handleChange}
          className="cursor-pointer"
        />
      </div>
    </Card>
  );
}
