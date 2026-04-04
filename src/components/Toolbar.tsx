import React from 'react';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  CodeOutlined,
  LinkOutlined,
  BlockOutlined,
  UndoOutlined,
  RedoOutlined,
  ClearOutlined,
  PictureOutlined,
  TableOutlined,
  CheckSquareOutlined,
  BorderBottomOutlined,
  FileCodeOutlined,
  DownOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';

interface ToolbarProps {
  editor: any;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const toolbarButtons = [
    {
      group: 'history',
      buttons: [
        {
          icon: <UndoOutlined />,
          title: '撤销',
          action: () => editor.chain().focus().undo().run(),
          isActive: () => false,
          isDisabled: () => !editor.can().chain().focus().undo().run(),
        },
        {
          icon: <RedoOutlined />,
          title: '重做',
          action: () => editor.chain().focus().redo().run(),
          isActive: () => false,
          isDisabled: () => !editor.can().chain().focus().redo().run(),
        },
      ],
    },
    {
      group: 'format',
      buttons: [
        {
          icon: <BoldOutlined />,
          title: '粗体',
          action: () => editor.chain().focus().toggleBold().run(),
          isActive: () => editor.isActive('bold'),
          isDisabled: () => false,
        },
        {
          icon: <ItalicOutlined />,
          title: '斜体',
          action: () => editor.chain().focus().toggleItalic().run(),
          isActive: () => editor.isActive('italic'),
          isDisabled: () => false,
        },
        {
          icon: <UnderlineOutlined />,
          title: '下划线',
          action: () => editor.chain().focus().toggleUnderline().run(),
          isActive: () => editor.isActive('underline'),
          isDisabled: () => false,
        },
        {
          icon: <StrikethroughOutlined />,
          title: '删除线',
          action: () => editor.chain().focus().toggleStrike().run(),
          isActive: () => editor.isActive('strike'),
          isDisabled: () => false,
        },
      ],
    },
    {
      group: 'heading',
      buttons: [
        {
          icon: <DownOutlined />,
          title: '标题',
          action: () => {
            const level = window.prompt('请输入标题级别 (1-6):');
            if (level && parseInt(level) >= 1 && parseInt(level) <= 6) {
              editor.chain().focus().toggleHeading({ level: parseInt(level) }).run();
            }
          },
          isActive: () => editor.isActive('heading'),
          isDisabled: () => false,
        },
      ],
    },
    {
      group: 'list',
      buttons: [
        {
          icon: <UnorderedListOutlined />,
          title: '无序列表',
          action: () => editor.chain().focus().toggleBulletList().run(),
          isActive: () => editor.isActive('bulletList'),
          isDisabled: () => false,
        },
        {
          icon: <OrderedListOutlined />,
          title: '有序列表',
          action: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: () => editor.isActive('orderedList'),
          isDisabled: () => false,
        },
        {
          icon: <CheckSquareOutlined />,
          title: '任务列表',
          action: () => editor.chain().focus().toggleTaskList().run(),
          isActive: () => editor.isActive('taskList'),
          isDisabled: () => false,
        },
      ],
    },
    {
      group: 'insert',
      buttons: [
        {
          icon: <CodeOutlined />,
          title: '行内代码',
          action: () => editor.chain().focus().toggleCode().run(),
          isActive: () => editor.isActive('code'),
          isDisabled: () => false,
        },
        {
          icon: <FileCodeOutlined />,
          title: '代码块',
          action: () => editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => editor.isActive('codeBlock'),
          isDisabled: () => false,
        },
        {
          icon: <BlockOutlined />,
          title: '引用',
          action: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: () => editor.isActive('blockquote'),
          isDisabled: () => false,
        },
        {
          icon: <LinkOutlined />,
          title: '链接',
          action: () => {
            const url = window.prompt('请输入链接地址');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          },
          isActive: () => editor.isActive('link'),
          isDisabled: () => false,
        },
        {
          icon: <PictureOutlined />,
          title: '图片',
          action: () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  const base64 = event.target?.result as string;
                  editor.chain().focus().setImage({ src: base64 }).run();
                };
                reader.readAsDataURL(file);
              }
            };
            input.click();
          },
          isActive: () => false,
          isDisabled: () => false,
        },
        {
          icon: <TableOutlined />,
          title: '表格',
          action: () => {
            editor.chain().focus().insertTable({ rows: 2, cols: 2 }).run();
          },
          isActive: () => editor.isActive('table'),
          isDisabled: () => false,
        },
        {
          icon: <BorderBottomOutlined />,
          title: '分隔线',
          action: () => editor.chain().focus().setHorizontalRule().run(),
          isActive: () => false,
          isDisabled: () => false,
        },
      ],
    },
    {
      group: 'clear',
      buttons: [
        {
          icon: <ClearOutlined />,
          title: '清除格式',
          action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
          isActive: () => false,
          isDisabled: () => false,
        },
      ],
    },
  ];

  return (
    <div className={styles.editorToolbar}>
      {toolbarButtons.map((group, groupIndex) => (
        <div key={group.group} className={styles.toolbarGroup}>
          {group.buttons.map((button, buttonIndex) => (
            <button
              key={`${group.group}-${buttonIndex}`}
              className={`${styles.toolbarButton} ${button.isActive() ? styles.active : ''}`}
              onClick={button.action}
              disabled={button.isDisabled()}
              title={button.title}
            >
              {button.icon}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
