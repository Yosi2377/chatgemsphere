import { animate, AnimatePresence, motion } from 'framer-motion';

/**
 * Basic fade-in animation.
 * @param element - The element to animate.
 * @param duration - The duration of the animation in milliseconds (default: 300).
 */
export const fadeIn = async (element: HTMLElement, duration: number = 300) => {
  await animate(element, { opacity: 1 }, { duration });
};

/**
 * Basic fade-out animation.
 * @param element - The element to animate.
 * @param duration - The duration of the animation in milliseconds (default: 300).
 */
export const fadeOut = async (element: HTMLElement, duration: number = 300) => {
  await animate(element, { opacity: 0 }, { duration });
};


/**
 * Example of a more complex animation using Framer Motion's motion component.
 * This animates the scale of an element.
 */
export const scaleAnimation = {
  initial: { scale: 0 },
  animate: { scale: 1, transition: { duration: 0.5 } },
  exit: { scale: 0 },
};

/**
 *  A simple wrapper for AnimatePresence to handle animations on mount and unmount.
 *  This is useful for components that appear and disappear dynamically.
 */
export const AnimatedPresence = ({ children }: { children: React.ReactNode }) => (
  <AnimatePresence>{children}</AnimatePresence>
);

