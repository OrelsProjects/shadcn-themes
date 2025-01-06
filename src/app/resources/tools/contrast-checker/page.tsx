"use client";

import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowLeft,
  Home,
  Menu,
  PaintBucket,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Color from "color";
import Link from "next/link";
import Logo from "@/components/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// Function to calculate relative luminance
const getLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// Function to calculate contrast ratio
const getContrastRatio = (lum1: number, lum2: number) => {
  const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  return Math.round(ratio * 100) / 100;
};

const ContrastIndicator = ({
  ratio,
  className,
}: {
  ratio: number;
  className?: string;
}) => {
  if (ratio >= 7) {
    return (
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger className={className}>
            <CheckCircle className="w-5 h-5 md:w-10 md:h-10 text-green-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-background font-bold text-sm">
              Excellent contrast
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else if (ratio >= 4.5) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={className}>
            <AlertCircle className="w-5 h-5 md:w-10 md:h-10 text-yellow-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-background font-bold text-sm">Good contrast</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } else {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={className}>
            <XCircle className="w-5 h-5 md:w-10 md:h-10 text-red-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-background font-bold text-sm">Poor contrast</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
};

// Convert color string to different formats
const convertColor = (hexValue: string, format: "hex" | "rgb" | "hsl") => {
  try {
    const c = Color(hexValue);
    switch (format) {
      case "hex":
        return c.hex().toLowerCase();
      case "rgb":
        return c.rgb().string();
      case "hsl":
        return c.hsl().string();
      default:
        return c.hex().toLowerCase();
    }
  } catch (e) {
    return hexValue;
  }
};

// Try to parse user input in any format back to hex
const parseToHex = (value: string) => {
  try {
    return Color(value).hex().toLowerCase();
  } catch (e) {
    return "#000000";
  }
};

const ContrastChecker = () => {
  const [bgHex, setBgHex] = useState("#b9b9b9");
  const [fgHex, setFgHex] = useState("#000000");

  const [bgFormat, setBgFormat] = useState<"hex" | "rgb" | "hsl">("hex");
  const [fgFormat, setFgFormat] = useState<"hex" | "rgb" | "hsl">("hex");

  const [contrastRatio, setContrastRatio] = useState(21);

  useEffect(() => {
    const bgRgb = Color(bgHex).rgb().array();
    const fgRgb = Color(fgHex).rgb().array();
    const bgLum = getLuminance(bgRgb[0], bgRgb[1], bgRgb[2]);
    const fgLum = getLuminance(fgRgb[0], fgRgb[1], fgRgb[2]);
    setContrastRatio(getContrastRatio(bgLum, fgLum));
  }, [bgHex, fgHex]);

  const handleSelectFormat =
    (
      setterFormat: React.Dispatch<React.SetStateAction<"hex" | "rgb" | "hsl">>,
      currentValueGetter: () => string,
      setterHex: React.Dispatch<React.SetStateAction<string>>,
    ) =>
    (format: "hex" | "rgb" | "hsl") => {
      const newHex = parseToHex(currentValueGetter());
      setterHex(newHex);
      setterFormat(format);
    };

  return (
    <div className="h-full max-h-screen flex flex-col items-center justify-start md:justify-center gap-2 bg-background p-4">
      <div className="flex flex-col md:flex-row gap-2 md:gap-8 w-full max-w-4xl mt-12">
        {/* BACKGROUND COLOR PICKER */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="mx-auto">
            <Label htmlFor="bgColor">Background Color</Label>
            <HexColorPicker
              color={bgHex}
              onChange={newHex => setBgHex(newHex)}
              className="w-full mb-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" id="bgFormatBtn">
                  {bgFormat.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() =>
                    handleSelectFormat(
                      setBgFormat,
                      () => convertColor(bgHex, bgFormat),
                      setBgHex,
                    )("hex")
                  }
                >
                  HEX
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleSelectFormat(
                      setBgFormat,
                      () => convertColor(bgHex, bgFormat),
                      setBgHex,
                    )("rgb")
                  }
                >
                  RGB
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleSelectFormat(
                      setBgFormat,
                      () => convertColor(bgHex, bgFormat),
                      setBgHex,
                    )("hsl")
                  }
                >
                  HSL
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <input
              id="bgColor"
              className="border rounded px-2 py-1 w-full"
              value={convertColor(bgHex, bgFormat)}
              onChange={e => {
                setBgHex(parseToHex(e.target.value));
              }}
            />
          </div>
        </div>

        {/* FOREGROUND COLOR PICKER */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="mx-auto">
            <Label htmlFor="fgColor">Foreground Color</Label>
            <HexColorPicker
              color={fgHex}
              onChange={newHex => setFgHex(newHex)}
              className="w-full mb-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" id="fgFormatBtn">
                  {fgFormat.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() =>
                    handleSelectFormat(
                      setFgFormat,
                      () => convertColor(fgHex, fgFormat),
                      setFgHex,
                    )("hex")
                  }
                >
                  HEX
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleSelectFormat(
                      setFgFormat,
                      () => convertColor(fgHex, fgFormat),
                      setFgHex,
                    )("rgb")
                  }
                >
                  RGB
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleSelectFormat(
                      setFgFormat,
                      () => convertColor(fgHex, fgFormat),
                      setFgHex,
                    )("hsl")
                  }
                >
                  HSL
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <input
              id="fgColor"
              className="border rounded px-2 py-1 w-full"
              value={convertColor(fgHex, fgFormat)}
              onChange={e => {
                setFgHex(parseToHex(e.target.value));
              }}
            />
          </div>
        </div>
      </div>

      {/* Contrast Ratio Display */}
      <div className="mt-12 text-center hidden md:block">
        <h2 className="text-2xl font-semibold mb-2">Contrast Ratio</h2>
        <div
          className="text-6xl font-bold p-8 rounded-lg shadow-lg flex items-center justify-center gap-4"
          style={{ backgroundColor: bgHex, color: fgHex }}
        >
          <span>{contrastRatio.toFixed(2)}:1</span>
        </div>
      </div>
      <div
        className="sticky bottom-2 w-fit h-8 p-4 rounded-lg flex md:hidden justify-center items-center gap-4"
        style={{ backgroundColor: bgHex, color: fgHex }}
      >
        <div className="text-lg font-bold">{contrastRatio.toFixed(2)}:1</div>
        <ContrastIndicator ratio={contrastRatio} />
      </div>
      <ContrastIndicator ratio={contrastRatio} className="max-md:hidden" />
    </div>
  );
};

export default ContrastChecker;
