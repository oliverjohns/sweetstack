import {
  useEffect,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";

type Props = PropsWithChildren<{
  selector: string;
}>;

export const ClientPortal: FC<Props> = ({ children, selector }) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);
  const [rerender, reRender] = useState(0);

  useEffect(() => {
    const el = document.querySelector(selector);

    // If the portal portals to an element with a transition
    // It wont find the element on first render
    // So we trigger a rerender with this random useState function
    if (!el) {
      setTimeout(() => reRender(Math.random()), 100);
      return;
    }
    ref.current = el;
    setMounted(true);
  }, [selector, rerender]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
};
