import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface ReviewIconProps {
  onClick: () => void;
}

export function ReviewIcon({ onClick }: ReviewIconProps) {
  return (
    <motion.div
      className="fixed bottom-10 right-4 md:bottom-1/2 md:right-8 bg-primary text-primary-foreground p-0 rounded-full shadow-lg hover:cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <Button
        variant="outline"
        className="w-full h-full bg-transparent border-none shadow-none !p-6 hover:bg-inherit !rounded-full "
      >
        <MessageSquare className="w-6 h-6 md:w-9 md:h-9" />
      </Button>
    </motion.div>
  );
}
