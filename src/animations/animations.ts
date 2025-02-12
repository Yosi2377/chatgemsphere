import { animate, AnimatePresence, motion, useAnimation } from 'framer-motion';

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
 * Keyframes animation.  This allows for more complex animations with multiple steps.
 * @param element - The element to animate.
 * @param keyframes - An array of keyframes.  Each keyframe is an object with properties to animate.
 * @param duration - The duration of the animation in milliseconds (default: 1000).
 * @param easing - The easing function to use (default: 'easeInOut').
 */
export const keyframesAnimation = async (
  element: HTMLElement,
  keyframes: { [key: string]: any }[],
  duration: number = 1000,
  easing: string = 'easeInOut'
) => {
  await animate(element, keyframes, { duration, ease: easing });
};


/**
 * Path animation.  This animates an element along a path defined by SVG path data.
 * @param element - The element to animate.
 * @param path - The SVG path data.
 * @param duration - The duration of the animation in milliseconds (default: 1000).
 */
export const pathAnimation = async (
  element: HTMLElement,
  path: string,
  duration: number = 1000
) => {
  await animate(element, { path }, { duration });
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


// Example of a reusable animation variant for Framer Motion
export const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

// Example of a reusable animation variant for Framer Motion
export const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

