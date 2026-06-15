import { useCallback, useEffect, useState } from 'react';

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handleChange = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setIsOpen(false);
    };
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, isMobile, toggle, close, setIsOpen };
}
