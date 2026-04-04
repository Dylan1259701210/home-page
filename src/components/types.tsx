export interface EditorNode {
  type: string;
  attrs?: Record<string, any>;
  content?: EditorNode[];
  marks?: any[];
  text?: string;
  id?: string;
}

export interface EditorContent {
  type: string;
  content: EditorNode[];
}

export interface SlashCommandItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  command: (editor: any) => void;
}

export interface SlashCommandProps {
  items: SlashCommandItem[];
}

export interface ImageUploadResult {
  url: string;
  alt: string;
}

export type UploadImageFunction = (file: File) => Promise<ImageUploadResult>;