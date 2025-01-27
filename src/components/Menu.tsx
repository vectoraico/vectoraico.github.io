import { cn } from "@/utils/cn";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems?: {
    name: string;
    link: string;
  }[];
  className?: string;
}) => {
  if (!navItems) {
    navItems = [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Team",
        link: "/team",
      },
      {
        name: "vFit",
        link: "/products/vfit",
      },
    ];
  }

  // Add a special "Work with Us" button at the top
  const workWithUsButton = {
    name: "Work with Us",
    link: "https://www.upwork.com/agencies/vectoraico/", // Replace with your actual Upwork profile link
  };

  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.005) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center rounded-full border border-transparent bg-white px-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2] dark:bg-black",
          className,
        )}
      >

        {/* Map through the navItems */}
        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            href={`${navItem.link}`}
            className={cn(
              "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
            )}
          >
            <Button variant="link">
              <span className="text-sm">{navItem.name}</span>
            </Button>
          </a>
        ))}

        {/* Work with Us Button */}
        <a
          key="work-with-us"
          href={workWithUsButton.link}
          className={cn(
            "relative left-4",
            "bg-black text-white px-4 py-2 rounded-full shadow-md hover:bg-[#6FDA44] hover:text-black transition-all"
          )}
        >
          <Button variant="link">
            <span className="text-sm text-white hover:text-black">{workWithUsButton.name}</span>
          </Button>
        </a>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNav;
