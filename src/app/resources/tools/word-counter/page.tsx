"use client";

import { useState, useCallback, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const analyzeText = useCallback((input: string) => {
    const trimmedText = input.trim();
    const words = trimmedText === "" ? [] : trimmedText.split(/\s+/);
    const wordCount = words.length;
    const characterCount = input.length;
    const characterNoSpaces = input.replace(/\s/g, "").length;
    const paragraphCount = input
      .split(/\n\s*\n/)
      .filter(para => para.trim().length > 0).length;
    const sentenceCount = input
      .split(/[.!?]+/)
      .filter(sentence => sentence.trim().length > 0).length;
    const averageWordLength =
      wordCount === 0 ? 0 : characterNoSpaces / wordCount;
    const readingTimeMinutes = (wordCount / 200).toFixed(1); // Average reading speed
    const speakingTimeMinutes = (wordCount / 120).toFixed(1); // Average speaking speed

    return {
      wordCount,
      characterCount,
      characterNoSpaces,
      paragraphCount,
      sentenceCount,
      averageWordLength: averageWordLength.toFixed(1),
      readingTimeMinutes,
      speakingTimeMinutes,
    };
  }, []);

  const stats = analyzeText(text);

  const textDensity = useMemo(() => {
    const density = (stats.characterNoSpaces / stats.characterCount) * 100;
    if (isNaN(density)) return 0;
    return density.toFixed(1);
  }, [stats]);

  const StatCard = ({
    title,
    value,
    tooltip,
  }: {
    title: string;
    value: string | number;
    tooltip: string;
  }) => (
    <div className="rounded-lg bg-card p-4 border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="w-4 h-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="bg-card-foreground/90 backdrop-blur-sm">
              <p className="max-w-[200px] text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Analyze your text with detailed statistics
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <Textarea
            placeholder="Enter or paste your text here..."
            value={text}
            onChange={e => setText(e.target.value)}
            className="min-h-[300px] resize-y text-lg"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Words"
              value={stats.wordCount}
              tooltip="Total number of words in your text"
            />
            <StatCard
              title="Characters"
              value={`${stats.characterCount}`}
              tooltip="Total number of characters, including spaces and without spaces"
            />
            <StatCard
              title="Paragraphs"
              value={stats.paragraphCount}
              tooltip="Number of paragraphs (separated by blank lines)"
            />
            <StatCard
              title="Sentences"
              value={stats.sentenceCount}
              tooltip="Number of sentences (separated by periods, exclamation marks, or question marks)"
            />
            <StatCard
              title="Average Word Length"
              value={`${stats.averageWordLength} chars`}
              tooltip="Average number of characters per word"
            />
            <StatCard
              title="Reading Time"
              value={`${stats.readingTimeMinutes} min`}
              tooltip="Estimated reading time (based on 200 words per minute)"
            />
            <StatCard
              title="Speaking Time"
              value={`${stats.speakingTimeMinutes} min`}
              tooltip="Estimated speaking time (based on 130 words per minute)"
            />
            <StatCard
              title="Text Density"
              value={`${textDensity}%`}
              tooltip="Percentage of characters that aren't spaces"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
