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
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        All the themes you love
        <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          The Shadcn way
        </span>
      </motion.h1>
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-center text-foreground/60">
          Featuring Themes From
        </h2>
        <div className="w-full justify-center items-center px-auto flex flex-wrap gap-4">
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
                className="!relative !w-fit !h-12 sm:!h-16 object-contain"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
