import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export const DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
}: {
  imageUrl: string;
  children: React.ReactNode | string;
  childrenClassName?: string;
  imageClassName?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [direction, setDirection] = useState<
    "top" | "bottom" | "left" | "right" | string
  >("left");

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!ref.current) return;

    const direction = getDirection(event, ref.current);
    switch (direction) {
      case 0:
        setDirection("top");
        break;
      case 1:
        setDirection("right");
        break;
      case 2:
        setDirection("bottom");
        break;
      case 3:
        setDirection("left");
        break;
      default:
        setDirection("left");
        break;
    }
  };

  const getDirection = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    obj: HTMLElement,
  ) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={cn(
        "group/card relative overflow-hidden rounded-lg bg-transparent",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="relative h-full w-full"
          initial="initial"
          whileHover={direction}
          exit="exit"
        >
          <motion.div className="absolute inset-0 z-10 h-full w-full bg-transparent transition-all group-hover/card:block group-hover/card:bg-black/40" />

          <motion.div
            variants={variants}
            className="relative h-full w-full"
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            <img
              alt="image"
              className={cn(
                "h-full w-full scale-[1.15] aspect-[3/4] rounded-lg object-cover",
                imageClassName,
              )}
              width="1000"
              height="1000"
              src={imageUrl}
            />
          </motion.div>

          <motion.div
            variants={textVariants}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className={cn(
              "absolute bottom-4 left-4 z-40 text-white",
              childrenClassName,
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const moveAmount = 10;

const variants = {
  initial: {
    x: 0,
  },
  exit: {
    x: 0,
    y: 0,
  },
  top: {
    y: moveAmount,
  },
  bottom: {
    y: -moveAmount,
  },
  left: {
    x: moveAmount,
  },
  right: {
    x: -moveAmount,
  },
};

const textVariants = {
  initial: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  exit: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  top: {
    y: -10,
    opacity: 1,
  },
  bottom: {
    y: -10,
    opacity: 1,
  },
  left: {
    x: 10,
    opacity: 1,
  },
  right: {
    x: 10,
    opacity: 1,
  },
};
