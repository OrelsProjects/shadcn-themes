"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

const PLATFORM_GROUPS = {
  "SEO Elements": {
    "Meta Title": { min: 50, max: 60, tooltip: "Optimal length for search results" },
    "Meta Description": { min: 140, max: 160, tooltip: "Best for SEO and click-through rates" },
    "H1 Heading": { min: 20, max: 70, tooltip: "Ideal length for main headings" },
    "URL Slug": { min: 3, max: 60, tooltip: "Best for SEO and readability" },
  },
  "Social Media": {
    "X/Twitter Post": { min: 0, max: 280, tooltip: "Maximum tweet length" },
    "Instagram Caption": { min: 0, max: 2200, tooltip: "Maximum caption length" },
    "LinkedIn Post": { min: 0, max: 3000, tooltip: "Maximum post length" },
    "Facebook Post": { min: 0, max: 63206, tooltip: "Maximum post length" },
  },
  "Content Writing": {
    "Blog Post Title": { min: 40, max: 60, tooltip: "Ideal for readability and SEO" },
    "Email Subject": { min: 30, max: 50, tooltip: "Optimal for open rates" },
  },
} as const;

type GroupKey = keyof typeof PLATFORM_GROUPS;
type PlatformKey = {
  [K in GroupKey]: keyof typeof PLATFORM_GROUPS[K];
}[GroupKey];

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<{
    group: GroupKey;
    platform: PlatformKey;
  }>({
    group: "SEO Elements",
    platform: "Meta Title",
  });

  const characterCount = text.length;
  const { min, max, tooltip } = PLATFORM_GROUPS[selectedPlatform.group][
    selectedPlatform.platform as keyof typeof PLATFORM_GROUPS[typeof selectedPlatform.group]
  ];

  const getProgressColor = () => {
    if (characterCount < min) return "bg-yellow-500";
    if (characterCount > max) return "bg-red-500";
    return "bg-green-500";
  };

  const getProgressWidth = () => {
    const percentage = (characterCount / max) * 100;
    return `${Math.min(percentage, 100)}%`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Count characters and optimize your content for different platforms
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-6">
            {Object.entries(PLATFORM_GROUPS).map(([groupName, platforms]) => (
              <div key={groupName} className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">{groupName}</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(platforms).map((platform) => (
                    <button
                      key={platform}
                      onClick={() =>
                        setSelectedPlatform({
                          group: groupName as GroupKey,
                          platform: platform as PlatformKey,
                        })
                      }
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selectedPlatform.platform === platform
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{selectedPlatform.platform}</h2>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-card-foreground/90 backdrop-blur-sm">
                      <p>{tooltip}</p>
                      <p className="text-sm text-muted">
                        Recommended: {min}-{max} characters
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className={characterCount > max ? "text-red-500" : "text-muted-foreground"}>
                {characterCount} / {max}
              </span>
            </div>

            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Type your ${selectedPlatform.platform.toLowerCase()} here...`}
              className="min-h-[200px] resize-y"
            />

            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${getProgressColor()}`}
                style={{ width: getProgressWidth() }}
              />
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Min: {min}</span>
              <span>Max: {max}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
