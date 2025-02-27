import { useEffect, useRef } from 'react';

// Custom hook for scrolling to top or bottom
function useScroll(scrollTo = 'top', dependencies = [],smooth = true) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (scrollTo === 'top') {
        containerRef.current.scrollTo({
          top: 0,
          behavior: smooth ? 'smooth' : 'auto',
        });
      } else if (scrollTo === 'bottom') {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
      console.count();
  }, dependencies); // Dependencies trigger scroll on change

  return containerRef;
}

export default useScroll;