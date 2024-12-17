import { cn } from "@/lib/utils";

export const LampDesk = ({
  className,
  isDark,
}: {
  className?: string;
  isDark?: boolean;
}) => (
  // to flip the button, use: transform: scaleX(-1);
  <div
    className={cn("relative")}
    style={{
      transform: "scaleX(-1)",
    }}
  >
    <span className="sr-only">Use setting</span>
    <svg
      className={cn("absolute h-3 w-3 fill-yellow-500", {
        hidden: isDark,
      })}
      viewBox="0 0 780 652"
      style={{ top: "4.5px", right: "19px", rotate: "-136deg" }}
    >
      <path d="M134.6 153.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64zM288 192c0 17.7 14.3 32 32 32s32-14.3 32-32V96c0-17.7-14.3-32-32-32s-32 14.3-32 32v96zm153.4 25.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64zM0 384c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zm512 0c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H544c-17.7 0-32 14.3-32 32z"></path>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="2em"
      height="2em"
      className={cn(
        "icon-lg fill-foreground-demo inline relative z-1 h-6 w-6 transform -scale-x-100",
        className,
      )}
    >
      <path
        d="M192 65.9C192 29.5 221.5 0 257.9 0c17.5 0 34.3 6.9 46.6 19.3L349.3 64H480c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-192 192c-9.2 9.2-22.9 11.9-34.9 6.9S256 301 256 288V157.3l-44.7-44.7C198.9 100.2 192 83.4 192 65.9zM32 448h320c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
        className="lamp-desk_svg__fa-primary"
      ></path>
      <path
        d="M105.4 233.4 218.7 120l37.3 37.3v16l-92.6 92.6L209 448h-66L97 263.8c-2.7-10.9.5-22.4 8.4-30.4zM183.3 512h1.4-1.4zm262.9-336.9c11 10.2 17.8 24.8 17.8 40.9 0 30.9-25.1 56-56 56-16.2 0-30.7-6.8-40.9-17.8l79.1-79.1z"
        style={{ opacity: 0.4 }}
      ></path>
    </svg>
  </div>
);
