import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    // If it's a decimal number, keep 1 decimal place, otherwise format with commas
    if (value % 1 !== 0) {
      return (Math.round(latest * 10) / 10).toLocaleString() + suffix;
    }
    return Math.round(latest).toLocaleString() + suffix;
  });

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.8,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

export default AnimatedNumber;
