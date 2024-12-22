"use client";

import { HslColor, HslColorPicker } from "react-colorful";
import { useMemo } from "react";
import { HSL } from "@/models/palette";

interface ColorPickerProps {
  onColorChange: (color: HSL) => void;
  value?: HSL;
}

export function ColorPicker({ onColorChange, value }: ColorPickerProps) {
  const color = useMemo((): HslColor => {
    return {
      h: value?.[0] || 0,
      s: value?.[1] || 0,
      l: value?.[2] || 0,
    };
  }, [value]);

  const handleColorChange = (newColor: HslColor) => {
    onColorChange([newColor.h, newColor.s, newColor.l]);
  };

  return (
    <HslColorPicker
      className="!w-full"
      color={color}
      onChange={handleColorChange}
    />
  );
}
