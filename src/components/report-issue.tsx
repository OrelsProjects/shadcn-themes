import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useReport } from "@/hooks/useReport";
import { cn } from "@/lib/utils";
import { Check, Flag, Loader } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/hooks/redux";
import { Textarea } from "@/components/ui/textarea";

interface ReportIssueProps {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ReportIssue({
  className,
  open,
  onOpenChange,
}: ReportIssueProps) {
  const { selectedPalette, selectedThemeType } = useAppSelector(
    state => state.palette,
  );

  const { submitReport, isLoading, isLoadingUpdate } = useReport();
  const [comments, setComments] = useState("");
  const [didReport, setDidReport] = useState(false);

  const handleDialogOpenChange = (open: boolean) => {
    onOpenChange?.(open);
  };

  const handleSubmitReport = (comments: string) => {
    setDidReport(true);
    submitReport({ comments, themeId: selectedPalette.id }).then(() => {
      setComments("");
      setTimeout(() => {
        setDidReport(false);
      }, 2000);
    });
  };

  const IssueButtonContainer = ({
    comments,
    disabled,
  }: {
    comments: string;
    disabled?: boolean;
  }) => (
    <DialogTrigger>
      <Button
        disabled={disabled}
        onClick={() => handleSubmitReport(comments)}
        variant="outline"
        className={cn(
          "w-full rounded-lg active:translate-y-1 transition-all inline-flex items-center justify-start border-foreground/30 text-foreground",
          {
            "shadow-md": selectedThemeType === "light",
            "justify-center": isLoading,
          },
        )}
      >
        {comments}
      </Button>
    </DialogTrigger>
  );

  return (
    <Dialog onOpenChange={handleDialogOpenChange} open={open}>
      <DialogTrigger asChild>
        {/* <Button
          variant={"outline"}
          className={cn(
            {
              "shadow-md": selectedThemeType === "light",
            },
            className,
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
              <Check className="!w-4 !h-4" />
            </motion.div>
          ) : (
            <>
              <Flag className="!w-4 !h-4" />
            </>
          )}
          <span className="hidden sm:inline">Report Issue</span>
        </Button> */}
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
          <IssueButtonContainer
            disabled={isLoading}
            comments="The contrast is not good"
          />
          <IssueButtonContainer
            disabled={isLoading}
            comments="The theme is ugly"
          />
          <IssueButtonContainer
            disabled={isLoading}
            comments="The theme is fine, I'm just looking around"
          />
          <form
            className="flex flex-col gap-2 mt-4"
            onSubmit={e => {
              e.preventDefault();
              if (e.currentTarget.checkValidity()) {
                handleSubmitReport(comments.trim());
              }
            }}
          >
            <Textarea
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="What's wrong with this theme?"
              className="w-full"
              required
            />
            <DialogTrigger asChild>
              <Button
                type="submit"
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? <Loader className="animate-spin" /> : "Submit"}
              </Button>
            </DialogTrigger>
          </form>
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
