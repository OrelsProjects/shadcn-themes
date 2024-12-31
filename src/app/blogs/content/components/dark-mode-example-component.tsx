import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function ExampleComponent() {
  return (
    <Card className="w-full mx-auto my-8">
      <CardHeader>
        <CardTitle>Theme-Aware Component</CardTitle>
        <CardDescription>
          This component adapts to the current theme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 rounded-md bg-background text-foreground border">
            I adapt to the current theme
          </div>
          <Button>Theme-Aware Button</Button>
        </div>
        <SyntaxHighlighter
          role="copy-code-syntax-highlighter"
          language="jsx"
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
          {`<div className="p-4 rounded-md bg-background text-foreground border">
  I adapt to the current theme
</div>
<Button>Theme-Aware Button</Button>`}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  );
}
