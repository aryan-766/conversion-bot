import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Position {
  left: number;
  width: number;
  opacity: number;
}

interface SlideTabsProps {
  tabs?: string[];
  activeTab?: number;
  onTabChange?: (index: number, tabName: string) => void;
  className?: string;
}

export const SlideTabs: React.FC<SlideTabsProps> = ({
  tabs = ["Home", "Pricing", "Features", "Docs", "Blog"],
  activeTab = 0,
  onTabChange,
  className = ""
}) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [selected, setSelected] = useState<number>(activeTab);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    setSelected(activeTab);
  }, [activeTab]);

  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [selected]);

  const handleSelect = (index: number, tab: string) => {
    setSelected(index);
    if (onTabChange) {
      onTabChange(index, tab);
    }
  };

  return (
    <ul
      onMouseLeave={() => {
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
          const { width } = selectedTab.getBoundingClientRect();
          setPosition({
            left: selectedTab.offsetLeft,
            width,
            opacity: 1,
          });
        }
      }}
      className={`relative mx-auto flex w-fit rounded-full border-2 border-zinc-800 bg-[#12141C] p-1 shadow-inner ${className}`}
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          setPosition={setPosition}
          onClick={() => handleSelect(i, tab)}
        >
          {tab}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  onClick: () => void;
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, setPosition, onClick }, ref) => {
    return (
      <li
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => {
          if (!ref || typeof ref === "function" || !ref.current) return;

          const { width } = ref.current.getBoundingClientRect();

          setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
        }}
        className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white mix-blend-difference md:px-5 md:py-2.5 md:text-sm transition-colors select-none"
      >
        {children}
      </li>
    );
  }
);

Tab.displayName = "Tab";

const Cursor: React.FC<{ position: Position }> = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      className="absolute z-0 h-7 md:h-9 rounded-full bg-zinc-300 dark:bg-white"
    />
  );
};
