import React, { useState, useEffect } from 'react';

export function useSticky(ref: React.MutableRefObject<any>) {
  const [isStuck, setStuck] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        setStuck((ref.current as HTMLElement).getBoundingClientRect().top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return [isStuck];
}
