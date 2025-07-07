import { HTMLMotionProps } from 'framer-motion';

declare module 'framer-motion' {
  interface HTMLMotionProps<T> {
    className?: string;
  }
}