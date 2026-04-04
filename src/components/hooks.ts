import { useCallback, useEffect, useRef } from "react";
import type { EditorEvents, Editor as EditorInstance, Extensions, JSONContent } from "@tiptap/core";
import { useEditor as useBaseEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

export type UseEditorProps = {
  limit?: number;
  value?: string;
  onChange?: (value: string) => void;
  onReadOnlyChange?: (value: string) => void;
  editable?: boolean;
  onCreate?: (props: EditorEvents["create"]) => void;
  extensions?: Extensions;
  slashCommandProps?: any;
  uploadImage?: (file: File) => Promise<{ url: string; alt: string }>;
};

// biome-ignore lint/suspicious/noExplicitAny: <updateAttrById>
const updateAttrById = (json: JSONContent, id: string, attr: string, value: any) => {
  if (!json.content) return;
  for (const node of json.content) {
    if (node.attrs?.id === id) {
      node.attrs[attr] = value;
    }
    if (node.content) {
      updateAttrById(node, id, attr, value);
    }
  }
};

const JSON_EXCLUDE = ["imageUpload"];

export const getJSONString = (editor: EditorInstance): string => {
  const json = editor.getJSON();
  // biome-ignore lint/suspicious/noExplicitAny: <node>
  json.content = json.content?.filter((node: any) => !JSON_EXCLUDE.includes(node.type));
  return JSON.stringify(json);
};

export const useEditor = (props: UseEditorProps): [EditorInstance, any, string] => {
  const {
    onReadOnlyChange,
    value,
    onCreate,
    onChange,
    limit,
    editable = true,
    extensions = [],
    slashCommandProps,
    uploadImage,
  } = props;
  const handleId = "drag-handle";
  const data = {
    hidden: true,
    node: null,
    top: 0,
    left: 0,
    handleNodeChange: () => {},
    setHidden: () => {},
  };

  const onReadOnlyChecked = useCallback(
    (node: any, checked: boolean) => {
      const jsonValue = editor?.getJSON();
      updateAttrById(jsonValue!, node.attrs.id, "checked", checked);
      editor?.commands.setContent(jsonValue!, false);
      onReadOnlyChange?.(JSON.stringify(jsonValue));
      return true;
    },
    [onReadOnlyChange],
  );

  const editor = useBaseEditor(
    {
      editable,
      extensions: [
        StarterKit.configure({
          document: true,
          dropcursor: true,
          heading: true,
          horizontalRule: true,
          blockquote: true,
          history: true,
          codeBlock: true,
        }),
        Image.configure({
          inline: true,
          allowBase64: true,
        }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableCell,
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
        ...extensions,
      ],
      immediatelyRender: false,
      content: value ? JSON.parse(value) : value,
      onUpdate: ({ editor }) => {
        if (editor.isInitialized) {
          onChange?.(getJSONString(editor));
        }
      },
      onCreate,
    },
    [onChange, onReadOnlyChecked, onCreate],
  );

  const isUpdate = useRef(false);

  // 监听 value 变化，必要时 setContent
  useEffect(() => {
    if (!(editor && value)) return;
    const current = JSON.stringify(editor.getJSON());
    if (current !== value && !isUpdate.current) {
      editor.commands.setContent(JSON.parse(value), false);
    }
  }, [value, editor]);

  // onUpdate 里判断是否是外部 setContent
  useEffect(() => {
    if (!editor) return;
    const handler = () => {
      isUpdate.current = true;
      onChange?.(getJSONString(editor));
    };
    editor.on("update", handler);
    return () => {
      editor.off("update", handler);
    };
  }, [editor, onChange]);

  return [editor!, data, handleId];
};