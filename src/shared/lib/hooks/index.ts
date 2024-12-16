import { MouseEvent, useEffect } from "react"

function useClickOutside<T extends HTMLElement>(ref: React.MutableRefObject<T> | null, callback: () => void) {
  const handleClick = (e: globalThis.MouseEvent) => {
    if (ref?.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);
}

export const SharedHooks = {
  useClickOutside,
}