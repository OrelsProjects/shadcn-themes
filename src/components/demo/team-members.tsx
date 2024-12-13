"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemePalette } from "@/models/palette";
import { getThemeColor } from "@/lib/utils";

interface TeamMember {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Sofia Davis",
    email: "m@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Owner",
  },
  {
    name: "Jackson Lee",
    email: "p@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Member",
  },
  {
    name: "Isabella Nguyen",
    email: "i@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Member",
  },
];

interface TeamMembersProps {
  theme: ThemePalette;
}

export function TeamMembers({ theme }: TeamMembersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {member.name}
                </p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
              <div className="ml-auto font-medium">
                <Button variant="ghost" size="sm">
                  {member.role}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
