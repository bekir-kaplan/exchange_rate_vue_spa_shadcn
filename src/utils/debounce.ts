export function debounce<T extends (...args: any[]) => void>(
  callback: T, // Function to be debounced
  delay: number // Time in milliseconds before executing
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    // If a previous timeout exists, clear it
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to execute the callback after the delay
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
