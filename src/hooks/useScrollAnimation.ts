import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = ref.current;
    if (el) {
      const children = el.querySelectorAll('.scroll-fade-in');
      children.forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
