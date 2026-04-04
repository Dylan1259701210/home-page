import { type FC } from "react";
import type { Editor } from "@tiptap/core";

interface CharacterCountProps {
  editor: Editor;
  limit: number;
}

export const CharacterCount: FC<CharacterCountProps> = ({ editor, limit }) => {
  const characters = editor.storage.characterCount?.characters() || 0;

  return (
    <div className="character-count">
      {characters} / {limit} 字符
    </div>
  );
};