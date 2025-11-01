"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function StarButton({
  snippetId,
  initialStarred,
  onToggle,
}: {
  snippetId: string;
  initialStarred: boolean;
  onToggle?: (newState: boolean) => void;
}) {
  const [isStarred, setIsStarred] = useState(initialStarred);
  const [loading, setLoading] = useState(false);

  const toggleStar = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/snippets/${snippetId}/star`);
      setIsStarred(res.data.isStarred);
      onToggle?.(res.data.isStarred);

      toast.success(
        res.data.isStarred ? "Snippet starred ⭐" : "Snippet unstarred"
      );
    } catch (err) {
      console.error("Failed to toggle star", err);
      toast.error("Failed to toggle star");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={loading}
      onClick={toggleStar}
      className={`transition-colors ${
        isStarred ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
      }`}
    >
      <Star
        className={`w-5 h-5 ${isStarred ? "fill-yellow-400" : "fill-none"}`}
      />
    </Button>
  );
}
