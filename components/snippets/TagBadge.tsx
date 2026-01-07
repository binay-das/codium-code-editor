"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Tag {
    id: string;
    name: string;
    color: string;
}

interface TagBadgeProps {
    tag: Tag;
    size?: 'sm' | 'md';
    removable?: boolean;
    onRemove?: () => void;
    onClick?: () => void;
}

export default function TagBadge({
    tag,
    size = 'sm',
    removable = false,
    onRemove,
    onClick
}: TagBadgeProps) {
    const sizeClasses = size === 'sm'
        ? 'text-xs px-2 py-0.5'
        : 'text-sm px-3 py-1';

    return (
        <span
            onClick={onClick}
            className={`inline-flex items-center gap-1 rounded-full font-medium transition-all ${sizeClasses} ${onClick ? 'cursor-pointer hover:opacity-80' : ''
                }`}
            style={{
                backgroundColor: `${tag.color}20`,
                color: tag.color,
                border: `1px solid ${tag.color}40`
            }}
        >
            {tag.name}
            {removable && onRemove && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="h-3 w-3 p-0 hover:bg-transparent"
                >
                    <X className="h-3 w-3" />
                </Button>
            )}
        </span>
    );
}
