import { type FC } from "react";
import type { Editor } from "@tiptap/core";
import type { NodeData } from "./use.data";

interface DragHandleProps {
  data: NodeData;
  editor: Editor;
  handleId: string;
}

export const DragHandle: FC<DragHandleProps> = ({ data, editor, handleId }) => {
  if (data.hidden || !data.node) {
    return null;
  }

  return (
    <div
      id={handleId}
      className="drag-handle"
      style={{
        top: `${data.top}px`,
        left: `${data.left}px`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className="drag-handle-icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 2H6V4H4V2ZM4 6H6V8H4V6ZM4 10H6V12H4V10ZM10 2H12V4H10V2ZM10 6H12V8H10V6ZM10 10H12V12H10V10Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};