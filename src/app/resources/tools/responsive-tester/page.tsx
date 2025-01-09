"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Tablet, Monitor, RefreshCw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const deviceSizes = [
  {
    name: "iPhone SE",
    width: 375,
    height: 667,
    icon: Smartphone,
    tooltip: "iPhone SE size",
    category: "Mobile",
  },
  {
    name: "iPhone 12/13/14",
    width: 390,
    height: 844,
    icon: Smartphone,
    tooltip: "iPhone 12/13/14 size",
    category: "Mobile",
  },
  {
    name: "iPhone 12/13/14 Pro Max",
    width: 428,
    height: 926,
    icon: Smartphone,
    tooltip: "iPhone 12/13/14 Pro Max size",
    category: "Mobile",
  },
  {
    name: "Samsung Galaxy S20",
    width: 360,
    height: 800,
    icon: Smartphone,
    tooltip: "Samsung Galaxy S20 size",
    category: "Mobile",
  },
  {
    name: "iPad Mini",
    width: 768,
    height: 1024,
    icon: Tablet,
    tooltip: "iPad Mini size",
    category: "Tablet",
  },
  {
    name: "iPad Pro 11\"",
    width: 834,
    height: 1194,
    icon: Tablet,
    tooltip: "iPad Pro 11-inch size",
    category: "Tablet",
  },
  {
    name: "iPad Pro 12.9\"",
    width: 1024,
    height: 1366,
    icon: Tablet,
    tooltip: "iPad Pro 12.9-inch size",
    category: "Tablet",
  },
  {
    name: "Laptop",
    width: 1366,
    height: 768,
    icon: Monitor,
    tooltip: "Standard laptop size",
    category: "Desktop",
  },
  {
    name: "Desktop",
    width: 1920,
    height: 1080,
    icon: Monitor,
    tooltip: "Full HD desktop size",
    category: "Desktop",
  },
  {
    name: "4K Display",
    width: 3840,
    height: 2160,
    icon: Monitor,
    tooltip: "4K display size",
    category: "Desktop",
  },
] as const;

type DeviceCategory = "Mobile" | "Tablet" | "Desktop" | "Responsive";

export default function ResponsiveDesignTester() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState<string>("iPhone SE");
  const [customSize, setCustomSize] = useState({ width: 375, height: 667 });
  const [isResizing, setIsResizing] = useState(false);

  // Group devices by category
  const devicesByCategory = deviceSizes.reduce((acc, device) => {
    if (!acc[device.category]) {
      acc[device.category] = [];
    }
    acc[device.category].push(device);
    return acc;
  }, {} as Record<DeviceCategory, typeof deviceSizes[number][]>);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let finalUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      finalUrl = `https://${url}`;
      setUrl(finalUrl);
    }
    setTimeout(() => setIsLoading(false), 800);
  };

  const refreshFrame = () => {
    setIsLoading(true);
    setKey(prev => prev + 1);
    setTimeout(() => setIsLoading(false), 800);
  };

  const selectedDeviceData = deviceSizes.find(d => d.name === selectedDevice) || deviceSizes[0];

  const handleResize = (e: React.MouseEvent<HTMLDivElement>, direction: 'width' | 'height') => {
    if (!isResizing) return;
    const container = e.currentTarget.getBoundingClientRect();
    const newSize = {
      width: direction === 'width' ? Math.max(320, Math.min(e.clientX - container.left, window.innerWidth - 100)) : customSize.width,
      height: direction === 'height' ? Math.max(480, Math.min(e.clientY - container.top, window.innerHeight - 100)) : customSize.height,
    };
    setCustomSize(newSize);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Responsive Design Tester</h1>
          <p className="text-muted-foreground">
            Test how your website looks across different device sizes
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter website URL (e.g., google.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="flex-grow"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                "Test"
              )}
            </Button>
            {url && (
              <Button
                type="button"
                variant="outline"
                onClick={refreshFrame}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
            )}
          </form>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-4">
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
              >
                {Object.entries(devicesByCategory).map(([category, devices]) => (
                  <optgroup key={category} label={category}>
                    {devices.map((device) => (
                      <option key={device.name} value={device.name}>
                        {device.name} ({device.width}x{device.height})
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value="responsive">Responsive (Custom Size)</option>
              </select>
              {selectedDevice === "responsive" && (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={customSize.width}
                    onChange={(e) => setCustomSize(prev => ({ ...prev, width: parseInt(e.target.value) || prev.width }))}
                    className="w-24"
                    min="320"
                  />
                  <span>×</span>
                  <Input
                    type="number"
                    value={customSize.height}
                    onChange={(e) => setCustomSize(prev => ({ ...prev, height: parseInt(e.target.value) || prev.height }))}
                    className="w-24"
                    min="480"
                  />
                </div>
              )}
            </div>

            <div className="rounded-lg border bg-muted/50 p-4 overflow-hidden">
              <div
                className={`bg-background mx-auto rounded border shadow-sm overflow-hidden ${selectedDevice === "responsive" ? "cursor-se-resize" : ""}`}
                style={{
                  width: selectedDevice === "responsive" ? customSize.width : selectedDeviceData.width,
                  height: selectedDevice === "responsive" ? customSize.height : selectedDeviceData.height,
                  maxWidth: "100%",
                  maxHeight: "70vh",
                  transform: (selectedDevice === "responsive" ? customSize.width : selectedDeviceData.width) > 800 ? "scale(0.75)" : "none",
                  transformOrigin: "top center",
                }}
                onMouseDown={() => selectedDevice === "responsive" && setIsResizing(true)}
                onMouseUp={() => setIsResizing(false)}
                onMouseLeave={() => setIsResizing(false)}
                onMouseMove={(e) => {
                  if (selectedDevice === "responsive") {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const isRightEdge = e.clientX > rect.right - 20;
                    const isBottomEdge = e.clientY > rect.bottom - 20;
                    if (isRightEdge && isBottomEdge) {
                      handleResize(e, 'width');
                      handleResize(e, 'height');
                    } else if (isRightEdge) {
                      handleResize(e, 'width');
                    } else if (isBottomEdge) {
                      handleResize(e, 'height');
                    }
                  }
                }}
              >
                {url && !isLoading ? (
                  <iframe
                    key={key}
                    src={url}
                    title={`${selectedDevice} preview`}
                    className="w-full h-full border-0"
                    sandbox="allow-same-origin allow-scripts"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    {isLoading ? (
                      <RefreshCw className="w-6 h-6 animate-spin" />
                    ) : (
                      "Enter a URL to preview"
                    )}
                  </div>
                )}
                {selectedDevice === "responsive" && (
                  <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md">
                    {customSize.width} × {customSize.height}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 