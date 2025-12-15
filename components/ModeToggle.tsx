"use client"

import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between px-3 py-1.5 bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 font-normal hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <span className="flex items-center gap-2">
            {theme === "dark" && <Moon className="size-3.5" />}
            {theme === "light" && <Sun className="size-3.5" />}
            {theme === "system" && <Laptop className="size-3.5" />}
            {!theme && <Sun className="size-3.5" />}
            <span className="text-xs capitalize">{theme === "system" ? "System" : theme}</span>
          </span>
          <div className="opacity-50 text-[10px]">▼</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px] bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 p-1">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/60 cursor-pointer">
          <Sun className="size-4" />
          <span className="text-sm">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/60 cursor-pointer">
          <Moon className="size-4" />
          <span className="text-sm">Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/60 cursor-pointer">
          <Laptop className="size-4" />
          <span className="text-sm">System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
