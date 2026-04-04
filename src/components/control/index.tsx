import { type FC, useRef, useState } from "react";
import type { Editor } from "@tiptap/core";

import { DragHandle } from "./drag-handle";
import { CharacterCount } from "./character-count";
import type { NodeData } from "./drag-handle/use.data";

interface EditorControllerProps {
  appendTo: React.RefObject<HTMLDivElement>;
  data: NodeData;
  editor: Editor;
  handleId: string;
  limit?: number;
}

export const EditorController: FC<EditorControllerProps> = ({ appendTo, data, editor, handleId, limit }) => {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseDown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(true);
  };

  const handleMouseUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  return (
    <div
      className="editor-controller"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {visible && (
        <>
          <DragHandle data={data} editor={editor} handleId={handleId} />
          {limit && <CharacterCount editor={editor} limit={limit} />}
        </>
      )}
    </div>
  );
};