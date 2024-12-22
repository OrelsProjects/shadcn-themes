"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EventTracker } from "@/eventTracker";
import { MoreVertical, Flag } from "lucide-react";
import ReportIssue from "@/components/report-issue";

export default function AdditionalBottomNavbarOptions() {
  const [showReportIssue, setShowReportIssue] = React.useState(false);

  return (
    <>
      <ReportIssue onOpenChange={setShowReportIssue} open={showReportIssue} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="aspect-square">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top">
          <DropdownMenuItem
            onSelect={e => {
              e.stopPropagation();
              EventTracker.track("report_issue_clicked");
              setShowReportIssue(true);
            }}
          >
            <Flag className="!w-4 !h-4" />
            <span>Report Issue</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
