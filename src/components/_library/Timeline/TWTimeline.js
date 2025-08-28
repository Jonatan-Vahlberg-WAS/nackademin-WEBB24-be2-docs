import { useRef, useState, useEffect } from "react";
import { cn } from "../../../utils/cn";

export default function Timeline({
  points = [],
  renderPoint = (point, index, moveToNext) => null,
}) {
  const [currentPoint, setCurrentPoint] = useState(1);
  const bubbleRef = useRef(null);

  const updateBubblePosition = (pointNumber) => {
    const pointEl = document.getElementById(`point${pointNumber}`);
    const containerEl = document.querySelector(".timeline-container");

    if (pointEl && containerEl && bubbleRef.current) {
      const pointRect = pointEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      const top = pointRect.top - containerRect.top + pointRect.height / 2;
      bubbleRef.current.style.top = `${top}px`;
    }
  };

  const moveToNext = (pointNumber) => {
    let next = pointNumber + 1;
    if (next > points.length) next = 1;
    setCurrentPoint(next);
    const nextEl = document.getElementById(`point${next}`);
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
      updateBubblePosition(next);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const mid = window.innerHeight / 2;
      document.querySelectorAll(".timeline-item").forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          setCurrentPoint(i + 1);
          updateBubblePosition(i + 1);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    updateBubblePosition(currentPoint);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const wrapperClasses = cn(
    "relative timeline-container px-8 py-12 max-w-3xl mx-auto"
  );

  const bubbleClasses = cn(
    "absolute -left-10 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 text-white text-lg"
  );

  return (
    <div className={wrapperClasses}>
      {/* Timeline Bubble */}
      <div ref={bubbleRef} className={bubbleClasses}>
        {points[currentPoint - 1]?.icon}
      </div>

      {/* Timeline Items */}
      {points.map((point, index) => (
        <div id={`point${index + 1}`} className="timeline-item" key={index}>
          {renderPoint(point, index, moveToNext)}
        </div>
      ))}
    </div>
  );
}
