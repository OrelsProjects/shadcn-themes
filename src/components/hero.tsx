"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const themeSources = [
  {
    name: "DaisyUI",
    src: "/theme-sources/daisy-ui.png",
    width: 200,
    height: 40,
  },
  { name: "Shadcn", src: "/theme-sources/shadcn.png", width: 230, height: 100 },
  //   {
  //     name: "Marc Lou",
  //     src: "/theme-sources/marclou.png",
  //     width: 200,
  //     height: 100,
  //   },
];

export default function Hero() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      <motion.div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          The most beautiful themes{" "}
          <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            The Shadcn way
          </span>
        </h1>

      </motion.div>

      <motion.div className="flex flex-col items-center gap-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-foreground/60">
          Trusted Theme Sources
        </h2>
        <div className="w-full justify-center items-center px-auto flex flex-wrap  gap-4 sm:gap-8">
          {themeSources.map((source, index) => (
            <motion.div
              key={source.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative w-fit"
            >
              <Image
                src={source.src}
                alt={`${source.name} themes`}
                fill
                className="!relative !w-fit !h-8 sm:!h-16 object-contain"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* <section className="mt-8 text-center" aria-label="Theme Features">
        <h2 className="sr-only">Shadcn Theme Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Easy Integration</h3>
            <p className="text-muted-foreground">
              One-click theme implementation for Shadcn UI components
            </p>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Fully Customizable</h3>
            <p className="text-muted-foreground">
              Modify colors and styles to match your brand
            </p>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">Dark Mode Ready</h3>
            <p className="text-muted-foreground">
              All themes support light and dark modes
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
}
