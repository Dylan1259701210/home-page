import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { EditorContent } from '@tiptap/react';
import { useEditor } from './hooks';
import { EditorController } from './control';
import Toolbar from './Toolbar';
import styles from './index.module.scss';

interface EditorProps {
  limit?: number;
  value?: string;
  onChange?: (value: string) => void;
  onCreate?: (props: any) => void;
  extensions?: any[];
  slashCommandProps?: any;
  uploadImage?: (file: File) => Promise<{ url: string; alt: string }>;
}

export type EditorRef = {
  editor: any | null;
};

export const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const { limit, value, onChange, onCreate, extensions, slashCommandProps, uploadImage } = props;
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const [editor, data, handleId] = useEditor({
    limit,
    value,
    onChange,
    onCreate,
    extensions,
    slashCommandProps,
    uploadImage,
  });

  useImperativeHandle(
    ref,
    () => ({
      editor,
    }),
    [editor],
  );

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.editorContainer} ref={menuContainerRef}>
      <Toolbar editor={editor} />
      <div className={styles.editorContent}>
        <EditorContent className={styles.editor} editor={editor} />
      </div>
      <EditorController appendTo={menuContainerRef} data={data} editor={editor} handleId={handleId} limit={limit} />
    </div>
  );
});

export const ContentViewer: React.FC<{
  value: string;
  className?: string;
}> = ({ value, className }) => {
  const [editor] = useEditor({ value, editable: false });

  if (!editor) {
    return null;
  }

  return (
    <div className={`${styles.contentViewer} ${className || ''}`}>
      <EditorContent editor={editor} />
    </div>
  );
};
