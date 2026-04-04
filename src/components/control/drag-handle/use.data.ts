import { useState } from "react";

export type NodeData = {
  hidden: boolean;
  node: HTMLElement | null;
  top: number;
  left: number;
  handleNodeChange: (node: HTMLElement | null, top: number, left: number) => void;
  setHidden: (hidden: boolean) => void;
};

export const useData = (): NodeData => {
  const [hidden, setHidden] = useState(true);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const handleNodeChange = (newNode: HTMLElement | null, newTop: number, newLeft: number) => {
    setNode(newNode);
    setTop(newTop);
    setLeft(newLeft);
  };

  return {
    hidden,
    node,
    top,
    left,
    handleNodeChange,
    setHidden,
  };
};