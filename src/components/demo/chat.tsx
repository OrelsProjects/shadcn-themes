"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemePalette } from "@/models/palette";
import { getThemeColor } from "@/lib/utils";
import { Send } from "lucide-react";

interface ChatProps {
  theme: ThemePalette;
}

export function Chat({ theme }: ChatProps) {
  return (
    <Card
      style={{
        backgroundColor: getThemeColor("card", theme),
        color: getThemeColor("card-foreground", theme),
      }}
    >
      <CardHeader>
        <CardTitle className="text-sm font-medium">Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Sofia Davis"
              />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium">Sofia Davis</p>
              <p
                className="text-sm"
                style={{ color: getThemeColor("muted-foreground", theme) }}
              >
                Hi, how can I help you today?
              </p>
            </div>
          </div>
          <div className="flex items-start justify-end">
            <div className="mr-4 space-y-1">
              <p className="text-sm font-medium">You</p>
              <p
                className="text-sm"
                style={{ color: getThemeColor("muted-foreground", theme) }}
              >
                I&apos;m having trouble with my account.
              </p>
            </div>
            <Avatar className="h-9 w-9">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="You"
              />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <Input
            placeholder="Type your message..."
            className="flex-grow"
            style={{
              backgroundColor: getThemeColor("background", theme),
              color: getThemeColor("foreground", theme),
              borderColor: getThemeColor("border", theme),
            }}
          />
          <Button
            size="icon"
            className="ml-2"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
