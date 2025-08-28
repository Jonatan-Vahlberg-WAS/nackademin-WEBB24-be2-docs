import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

const ScrollOverlay = ({
  containerRef,
  theme = "light",
  size = "md",
  className,
  ...props
}) => {
  const [showTopOverlay, setShowTopOverlay] = useState(false);
  const [showBottomOverlay, setShowBottomOverlay] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

  const checkScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    setShowTopOverlay(scrollTop > 0);
    setShowBottomOverlay(scrollTop + clientHeight < scrollHeight);
    setContainerHeight(clientHeight);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // Initial check
      checkScroll();

      // Add resize observer to update on container size changes
      const resizeObserver = new ResizeObserver(checkScroll);
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener("scroll", checkScroll);
        resizeObserver.disconnect();
      };
    }
  }, [containerRef]);

  const overlayContainerClasses = cn(
    "absolute top-0 left-0 right-2 bottom-0 w-auto pointer-events-none z-[1]",
    className
  );

  const topOverlayClasses = cn(
    "absolute top-0 left-0 right-0 transition-opacity duration-200 ease-in-out",
    {
      "bg-gradient-to-b from-gray-50 to-transparent": theme === "gray",
      "bg-gradient-to-b from-white to-transparent": theme === "light",
      "bg-gradient-to-b from-black to-transparent": theme === "dark",
      "opacity-100": showTopOverlay,
      "opacity-0": !showTopOverlay,
      "h-25": showTopOverlay && size === "lg",
      "h-12": showTopOverlay && size === "md",
      "h-8": showTopOverlay && size === "sm",
    }
  );

  const bottomOverlayClasses = cn(
    "absolute bottom-0 left-0 right-0 transition-opacity duration-200 ease-in-out",
    {
      "bg-gradient-to-t from-gray-50 to-transparent": theme === "gray",
      "bg-gradient-to-t from-white to-transparent": theme === "light",
      "bg-gradient-to-t from-black to-transparent": theme === "dark",
      "opacity-100 h-12": showBottomOverlay,
      "opacity-0": !showBottomOverlay,
      "h-25": showBottomOverlay && size === "lg",
      "h-12": showBottomOverlay && size === "md",
      "h-8": showBottomOverlay && size === "sm",
    }
  );

  return (
    <div
      className={overlayContainerClasses}
      style={{ height: containerHeight }}
      {...props}
    >
      <div className={cn(topOverlayClasses)} />
      <div className={cn(bottomOverlayClasses)} />
    </div>
  );
};

export default ScrollOverlay;
