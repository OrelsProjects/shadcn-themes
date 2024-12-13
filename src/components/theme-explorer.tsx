"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ColorPalette = {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
};

type Theme = {
  name: string;
  downloads: number;
  category: string;
  palette: ColorPalette;
};

const themes: Theme[] = [
  {
    name: "Ocean Blue",
    downloads: 5678,
    category: "Nature",
    palette: {
      primary: "#0077be",
      secondary: "#00a86b",
      background: "#f0f8ff",
      foreground: "#333333",
    },
  },
  {
    name: "Sunset Orange",
    downloads: 4567,
    category: "Vibrant",
    palette: {
      primary: "#ff7f50",
      secondary: "#ff4500",
      background: "#fff5e6",
      foreground: "#333333",
    },
  },
  {
    name: "Monochrome",
    downloads: 3456,
    category: "Minimalist",
    palette: {
      primary: "#000000",
      secondary: "#666666",
      background: "#ffffff",
      foreground: "#333333",
    },
  },
];

export function ThemeExplorer() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [customPalette, setCustomPalette] = useState<ColorPalette>(
    themes[0].palette,
  );

  const handleColorChange = (colorType: keyof ColorPalette, value: string) => {
    setCustomPalette(prev => ({ ...prev, [colorType]: value }));
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="themes" className="w-full">
        <TabsList>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        <TabsContent value="themes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map(theme => (
              <Card key={theme.name} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{theme.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex space-x-2 mb-4">
                    {Object.entries(theme.palette).map(([key, color]) => (
                      <div
                        key={key}
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: color }}
                        title={`${key}: ${color}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm mb-2">
                    {theme.category}
                  </p>
                  <p className="text-sm font-semibold mb-4">
                    {theme.downloads} downloads
                  </p>
                  <div className="flex justify-between mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTheme(theme)}
                    >
                      Preview
                    </Button>
                    <Button size="sm">Copy Code</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(customPalette).map(([key, color]) => (
                  <div key={key}>
                    <Label htmlFor={key}>{key}</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id={key}
                        type="color"
                        value={color}
                        onChange={e =>
                          handleColorChange(
                            key as keyof ColorPalette,
                            e.target.value,
                          )
                        }
                        className="w-12 h-12 p-1 rounded-md"
                      />
                      <Input
                        type="text"
                        value={color}
                        onChange={e =>
                          handleColorChange(
                            key as keyof ColorPalette,
                            e.target.value,
                          )
                        }
                        className="flex-grow"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Component Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Buttons</h3>
              <div className="flex space-x-2">
                <Button
                  style={{
                    backgroundColor: selectedTheme.palette.primary,
                    color: selectedTheme.palette.background,
                  }}
                >
                  Primary
                </Button>
                <Button
                  style={{
                    backgroundColor: selectedTheme.palette.secondary,
                    color: selectedTheme.palette.background,
                  }}
                >
                  Secondary
                </Button>
                <Button
                  variant="outline"
                  style={{
                    borderColor: selectedTheme.palette.primary,
                    color: selectedTheme.palette.primary,
                  }}
                >
                  Outline
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Input</h3>
              <Input
                placeholder="Sample input"
                style={{ borderColor: selectedTheme.palette.primary }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Card</h3>
              <Card
                style={{
                  backgroundColor: selectedTheme.palette.background,
                  color: selectedTheme.palette.foreground,
                }}
              >
                <CardHeader>
                  <CardTitle style={{ color: selectedTheme.palette.primary }}>
                    Sample Card
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  This is a sample card using the selected theme colors.
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
