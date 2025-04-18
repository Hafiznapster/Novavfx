import { useEffect, useRef } from 'react';
import anime from 'animejs';
type AnimeParams = Parameters<typeof anime>[0];

type UseAnimeJSProps = {
  targets?: string;
  animation: AnimeParams;
  dependencies?: any[];
};

export const useAnimeJS = ({ targets, animation, dependencies = [] }: UseAnimeJSProps) => {
  const animeRef = useRef<any>(null);

  useEffect(() => {
    if (targets) {
      animeRef.current = anime({
        targets,
        ...animation
      });
    }

    return () => {
      if (animeRef.current) {
        animeRef.current.pause();
      }
    };
  }, dependencies);

  return animeRef.current;
};

export const useScrollAnimation = (elementRef: React.RefObject<HTMLElement>, animation: AnimeParams) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && elementRef.current) {
            anime({
              targets: elementRef.current,
              ...animation
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, animation]);
};