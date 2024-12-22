import { Button } from "@/components/ui/button";
import { EventTracker } from "@/eventTracker";
import { LINKEDIN_URL, SUBSTACK_URL, TWITTER_URL } from "@/lib/consts";
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Socials() {
  return (
    <div
      role="list"
      aria-label="Social links"
      className="flex items-center gap-4"
    >
      <Button variant="outline" asChild>
        <Link
          href={TWITTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => EventTracker.track("twitter_clicked")}
          aria-label="Follow us on Twitter for Shadcn theme updates"
        >
          <Twitter aria-hidden="true" />
        </Link>
      </Button>
      <Button variant="outline" asChild className="hidden md:block">
        <Link
          href={LINKEDIN_URL}
          passHref
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => EventTracker.track("linkedin_clicked")}
          aria-label="Follow us on LinkedIn for Shadcn theme updates"
        >
          <Linkedin aria-hidden="true" />
        </Link>
      </Button>
      <Button variant="outline" asChild>
        <Link
          href={SUBSTACK_URL}
          passHref
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => EventTracker.track("substack_clicked")}
          aria-label="Follow us on Substack for Shadcn theme updates"
          className="hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            className="text-white"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z" />
          </svg>
        </Link>
      </Button>
    </div>
  );
}
