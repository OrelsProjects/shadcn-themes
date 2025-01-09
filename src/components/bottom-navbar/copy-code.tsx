"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EventTracker } from "@/eventTracker";
import { useAppSelector } from "@/hooks/redux";
import { usePalette } from "@/hooks/usePalette";
import { HSL, ParsedPalette, ThemePalette, ThemeType } from "@/models/palette";
import { Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function generateCSS(parsedPalette: ParsedPalette): string {
  const { colors } = parsedPalette;

  const colorToHSL = (color: HSL): string => {
    if (!color) {
      return "";
    }
    return `${color[0]} ${color[1]}% ${color[2]}%`;
  };

  const themeToCSS = (theme: ThemePalette, themeType: ThemeType): string => {
    return `--background: ${colorToHSL(theme.background)};
    --foreground: ${colorToHSL(theme.foreground)};
    --card: ${colorToHSL(theme.card)};
    --card-foreground: ${colorToHSL(theme["card-foreground"])};
    --popover: ${colorToHSL(theme.popover)};
    --popover-foreground: ${colorToHSL(theme["popover-foreground"])};
    --primary: ${colorToHSL(theme.primary)};
    --primary-foreground: ${colorToHSL(theme["primary-foreground"])};
    --secondary: ${colorToHSL(theme.secondary)};
    --secondary-foreground: ${colorToHSL(theme["secondary-foreground"])};
    --muted: ${colorToHSL(theme.muted)};
    --muted-foreground: ${colorToHSL(theme["muted-foreground"])};
    --accent: ${colorToHSL(theme.accent)};
    --accent-foreground: ${colorToHSL(theme["accent-foreground"])};
    --destructive: ${colorToHSL(theme.destructive)};
    --destructive-foreground: ${colorToHSL(theme["destructive-foreground"])};
    --border: ${colorToHSL(theme.border)};
    --input: ${colorToHSL(theme.input)};
    --ring: ${colorToHSL(theme.ring)};
    --radius: ${theme.radius || "0.5rem"};
    --chart-1: ${colorToHSL(theme["chart-1"])};
    --chart-2: ${colorToHSL(theme["chart-2"])};
    --chart-3: ${colorToHSL(theme["chart-3"])};
    --chart-4: ${colorToHSL(theme["chart-4"])};
    --chart-5: ${colorToHSL(theme["chart-5"])};
    
    --sidebar-background: ${colorToHSL(theme["sidebar-background"])};
    --sidebar-foreground: ${colorToHSL(theme["sidebar-foreground"])};
    --sidebar-primary: ${colorToHSL(theme["sidebar-primary"])};
    --sidebar-primary-foreground: ${colorToHSL(theme["sidebar-primary-foreground"])};
    --sidebar-accent: ${colorToHSL(theme["sidebar-accent"])};
    --sidebar-accent-foreground: ${colorToHSL(theme["sidebar-accent-foreground"])};
    --sidebar-border: ${colorToHSL(theme["sidebar-border"])};
    --sidebar-ring: ${colorToHSL(theme["sidebar-ring"])};`;
  };

  const hasDarkTheme = Object.keys(colors.dark).length > 0;
  const hasLightTheme = Object.keys(colors.light).length > 0;

  const lightThemeCSS = hasLightTheme
    ? themeToCSS(colors.light, "light")
    : themeToCSS(colors.dark, "light");
  const darkThemeCSS = hasDarkTheme
    ? themeToCSS(colors.dark, "dark")
    : themeToCSS(colors.light, "dark");

  return `
@layer base {
  :root {
    ${lightThemeCSS}
  }

  .dark {
    ${darkThemeCSS}
  }
}
  `.trim();
}

export default function CopyCode() {
  const { selectedPalette } = useAppSelector(state => state.palette);
  const { addCopyCode } = usePalette();
  const [showTooltip, setShowTooltip] = useState(false);

  const codeString = useMemo(() => {
    if (!selectedPalette) return "";

    return generateCSS(selectedPalette);
  }, [selectedPalette]);

  const handleCopy = (e: any) => {
    e.preventDefault();
    EventTracker.track("Copied CSS code", { palette: selectedPalette?.name });
    navigator.clipboard.writeText(codeString);
    setShowTooltip(true);
    addCopyCode(selectedPalette);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        onClick={() => EventTracker.track("Open copy button clicked")}
      >
        <Button variant="outline">
          <Copy className="h-5 w-5" />
          <span className="hidden md:inline-block">Copy code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] overflow-clip">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-foreground">
            Theme {selectedPalette.name}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-foreground/50 mt-2">
          Copy and paste the following code into your CSS file.
        </DialogDescription>
        <div className="rounded-md bg-card relative overflow-auto">
          <SyntaxHighlighter
            role="copy-code-syntax-highlighter"
            language="css"
            style={oneDark}
            customStyle={{
              maxHeight: "60vh",
              overflow: "auto",
              padding: "1rem",
              borderRadius: "0.375rem",
              fontSmooth: "antialiased",
            }}
            showLineNumbers={true}
            wrapLines={true}
          >
            {codeString}
          </SyntaxHighlighter>
          <TooltipProvider>
            <Tooltip open={showTooltip}>
              <TooltipTrigger asChild className="w-full h-full relative">
                <Button
                  role="copy-code-button"
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 h-6 w-fit rounded-md bg-background/50 p-2.5 py-3.5 border border-background/40 text-foreground/70 hover:bg-card"
                  onClick={handleCopy}
                >
                  <Copy className="h-3 w-3" />
                  Copy
                </Button>
              </TooltipTrigger>
              <TooltipContent role="tooltip-code-copied">
                <p>Copied!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
