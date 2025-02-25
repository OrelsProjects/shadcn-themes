"use client";

import {
  parseColor,
  convertColor,
  ColorSpace,
  colorToText,
} from "@/app/resources/tools/color-converter/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import HexColorPicker
const HexColorPicker = dynamic(
  () => import("react-colorful").then(mod => mod.HexColorPicker),
  {
    ssr: false,
  },
);
export default function ColorConverter() {
  const [color, setColor] = useState({
    rgb: "rgb(255, 0, 0)",
    hsl: "hsl(0, 100%, 50%)",
    hex: "#ff0000",
    oklch: "oklch(54.24% 0.2 27.23)",
  });

  const handleColorChange = useCallback(
    (newColor: string, format: ColorSpace) => {
      const parsedColor = parseColor(newColor, format);
      if (parsedColor) {
        setColor(convertColor(parsedColor));
      } else {
        switch (format) {
          case "hex":
            setColor({
              ...color,
              hex: colorToText({ space: "hex", values: newColor }),
            });
            break;
          case "rgb":
            setColor({
              ...color,
              rgb: colorToText({ space: "rgb", values: newColor }),
            });
            break;
          case "hsl":
            setColor({
              ...color,
              hsl: colorToText({ space: "hsl", values: newColor }),
            });
            break;
          case "oklch":
            setColor({
              ...color,
              oklch: colorToText({ space: "oklch", values: newColor }),
            });
            break;
          default:
            break;
        }
      }
    },
    [],
  );

  const handleHexChange = useCallback(
    (hex: string) => {
      handleColorChange(hex, "hex");
    },
    [handleColorChange],
  );

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader></CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 max-md:flex max-md:justify-center">
            <HexColorPicker color={color.hex} onChange={handleHexChange} />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            {Object.entries(color).map(([format, value]) => (
              <div key={format}>
                <Label
                  htmlFor={format}
                  className="text-lg font-semibold uppercase"
                >
                  {format}:
                </Label>
                <Input
                  id={format}
                  value={value}
                  onChange={e =>
                    handleColorChange(e.target.value, format as ColorSpace)
                  }
                  className="mt-1"
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className="w-full h-24 rounded-md shadow-inner"
          style={{ backgroundColor: color.hex }}
          aria-label="Color preview"
        ></div>
      </CardContent>
    </Card>
  );
}
