"use client";

import {
  parseColor,
  convertColor,
  ColorSpace,
} from "@/app/resources/tools/color-converter/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useCallback } from "react";
import { HexColorPicker } from "react-colorful";

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
