"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { TWITTER_URL, LINKEDIN_URL, SUBSTACK_URL } from "@/lib/consts";

const appName = process.env.NEXT_PUBLIC_APP_NAME;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-muted py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-foreground mb-4">
              Subscribe to our newsletter for the latest theme updates and tips.
            </p>
            <form className="flex gap-2">
              <Button asChild>
                <Link
                  href={SUBSTACK_URL}
                  target="_blank"
                  className="flex gap-2"
                >
                  <Image
                    src="/substack.svg"
                    alt="Substack"
                    width={20}
                    height={20}
                  />
                  Read more
                </Link>
              </Button>
            </form>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  about="privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href={TWITTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About me
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4">
              Explore Shadcn Themes
            </h3>
            <p className="text-foreground mb-4">
              Browse shadcn/ui components to quickly build your next project.
            </p>
            <Link
              href="https://ui.shadcn.com/docs"
              className="text-primary font-semibold hover:underline"
              aria-label="Explore Shadcn components"
            >
              View Components →
            </Link>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="col-span-1 md:col-span-4"
          >
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex items-center gap-4 w-full">
              <div className="relative flex items-center justify-center rounded-full border-2 border-foreground/60 bg-primary w-12 h-12 overflow-clip">
                <Link
                  href={TWITTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={process.env.NEXT_PUBLIC_IMAGE_OF_SELF as string}
                    alt="Orel Zilberman"
                    fill
                    quality={100}
                    className="absolute inset-0 object-fill !w-12 !h-8 mt-1"
                  />
                </Link>
              </div>
              <span>
                {" "}
                Hey, Orel here! Let&apos;s{" "}
                <Link
                  href={TWITTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  connect
                </Link>{" "}
                and chat :)
              </span>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="mt-8 pt-8 border-t border-muted-foreground/20 text-center text-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>
            &copy; {currentYear} {appName}. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            Designed for developers who want elegant, customizable Shadcn themes
            for React and Next.js projects.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
