"use client";

import Image from "next/image";
import { LANGUAGE_CONFIG } from "@/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onChange: (language: string) => void;
}

export function LanguageSelector({ selectedLanguage, onChange }: LanguageSelectorProps) {
  const languages = Object.values(LANGUAGE_CONFIG);

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedLanguage} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue>
            <div className="flex items-center gap-2">
              <Image
                src={LANGUAGE_CONFIG[selectedLanguage]?.logoPath}
                alt={LANGUAGE_CONFIG[selectedLanguage]?.label}
                width={20}
                height={20}
              />
              <span className="text-sm font-medium">
                {LANGUAGE_CONFIG[selectedLanguage]?.label}
              </span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.id} value={lang.id}>
              <div className="flex items-center gap-2">
                <Image src={lang.logoPath} alt={lang.label} width={20} height={20} />
                <span className="text-sm font-medium">{lang.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
