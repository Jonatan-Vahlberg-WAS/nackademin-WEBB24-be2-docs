import classNames from 'classnames';
import { twMerge } from './twMergeUtil';

// Export the `cn` function that merges classes
export function cn(...classes) {
  return twMerge(classNames(...classes));
}
