import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        },
        { threshold }
      );
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return [ref, visible];
}
