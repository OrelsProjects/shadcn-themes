#!/usr/bin/env bash

for f in card.tsx dropdown-menu.tsx input.tsx label.tsx loading.tsx select.tsx skeleton.tsx switch.tsx table.tsx tabs.tsx button.tsx calendar.tsx avatar.tsx; do
  echo "Processing $f ..."
  sed -i '' '
    s/bg-background/bg-background-demo/g;
    s/text-foreground/text-foreground-demo/g;
    s/bg-card/bg-card-demo/g;
    s/text-card-foreground/text-card-demo-foreground/g;
    s/bg-popover/bg-popover-demo/g;
    s/text-popover-foreground/text-popover-foreground-demo/g;
    s/bg-primary/bg-primary-demo/g;
    s/text-primary-foreground/text-primary-demo-foreground/g;
    s/bg-secondary/bg-secondary-demo/g;
    s/text-secondary-foreground/text-secondary-demo-foreground/g;
    s/bg-muted/bg-muted-demo/g;
    s/text-muted-foreground/text-muted-demo-foreground/g;
    s/bg-accent/bg-accent-demo/g;
    s/text-accent-foreground/text-accent-demo-foreground/g;
    s/bg-destructive/bg-destructive-demo/g;
    s/text-destructive-foreground/text-destructive-demo-foreground/g;
    s/border/border-demo/g;
    s/bg-input/bg-input-demo/g;
    s/focus-visible:ring-ring/focus-visible:ring-ring-demo/g;
    s/ring-offset-background/ring-offset-background-demo/g
  ' "$f"
  echo "Finished processing $f."
done
