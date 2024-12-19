import { Button } from "@/components/ui/button";
import { Button as ButtonDemo } from "@/components/ui-demo/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useReport } from "@/hooks/useReport";
import { cn } from "@/lib/utils";
import { ParsedPalette, ThemeType } from "@/models/palette";
import { Check, Flag, Loader } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ReportIssue({
  themeType,
  selectedPalette,
}: {
  themeType: ThemeType;
  selectedPalette: ParsedPalette;
}) {
  const { submitReport, updateReport, isLoading, isLoadingUpdate } = useReport();
  const [reportId, setReportId] = useState<string | undefined>();
  const [didReport, setDidReport] = useState(false);

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      return;
    }
    submitReport({ themeId: selectedPalette.id }).then(id => {
      setReportId(id);
    });
  };

  const handleUpdateReport = (comments: string) => {
    if (!reportId || isLoading) {
      return;
    }
    setDidReport(true);
    updateReport({ id: reportId, comments }).then(() => {
      setTimeout(() => {
        setDidReport(false);
      }, 2000);
    });
  };

  const IssueButtonContainer = ({ comments }: { comments: string }) => (
    <DialogTrigger>
      <Button
        onClick={() => handleUpdateReport(comments)}
        variant="outline"
        className={cn(
          "w-full rounded-lg active:translate-y-1 transition-all inline-flex items-center justify-start border-foreground/30 text-foreground",
          {
            "shadow-md": themeType === "light",
            "justify-center": isLoading,
          },
        )}
      >
        {isLoading ? <Loader className="animate-spin" /> : comments}
      </Button>
    </DialogTrigger>
  );

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <ButtonDemo
          variant={"outline"}
          className={cn(
            "rounded-lg active:translate-y-1 transition-all w-fit inline-flex items-center border-foreground/30 text-foreground-demo",
            {
              "shadow-md": themeType === "light",
            },
          )}
        >
          {isLoadingUpdate ? (
            <Loader className="animate-spin" />
          ) : didReport ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Check className="!w-5 !h-5" />
            </motion.div>
          ) : (
            <Flag className="!w-5 !h-5" />
          )}
        </ButtonDemo>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Report an Issue with{" "}
            <span className="text-primary">{selectedPalette.name}</span> theme
          </DialogTitle>
          <DialogDescription className="text-foreground/50 mt-2">
            What&apos;s wrong with this theme?
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col gap-3 mt-4">
          <IssueButtonContainer comments="The contrast is not good" />
          <IssueButtonContainer comments="The palette is ugly" />
          <IssueButtonContainer comments="The palette is fine, I'm just looking around" />
        </div>
        <div className="mt-6 flex justify-end">
          <DialogTrigger>
            <Button variant="ghost">Cancel</Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
