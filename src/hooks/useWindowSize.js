import { useEffect, useMemo, useState } from "react";

const debounce = (fn, wait) => {
  let timeoutId;
  const debounced = (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), wait);
  };
  debounced.clear = () => clearTimeout(timeoutId);
  return debounced;
};

const useWindowSize = () => {
  // IMPORTANT (SSR/hydration):
  // Do not read `window.innerWidth` during the initial render. If the client
  // renders "mobile" while the server rendered "desktop" (or vice versa),
  // React will throw a hydration mismatch error.
  const [width, setWidth] = useState(1200);
  const windowListener = useMemo(
    () =>
      debounce(() => {
        setWidth(window.innerWidth);
      }, 250),
    []
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    setWidth(window.innerWidth);
    window.addEventListener("resize", windowListener);
    return () => {
      windowListener.clear();
      window.removeEventListener("resize", windowListener);
    };
  }, [windowListener]);
  return width;
};
export default useWindowSize;
