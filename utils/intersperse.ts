export function intersperse<T>(arr: T[], separator: (n: number) => T): T[] {
  return arr.reduce<T[]>((acc, currentElement, currentIndex) => {
    const isLast = currentIndex === arr.length - 1;
    return [...acc, currentElement, ...(isLast ? [] : [separator(currentIndex)])];
  }, []);
}
