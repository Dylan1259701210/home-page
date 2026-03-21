import React from 'react';
import { DownOutlined, RightOutlined, FolderOutlined, FileOutlined, LinkOutlined } from '@ant-design/icons';
import styles from './FileTreeNode.module.scss';

interface FileTreeNodeProps {
  node: {
    id: string;
    name: string;
    type: 'folder' | 'file';
    count?: number;
    workflow?: 'Manual' | 'Automatic';
    children?: Array<{
      id: string;
      name: string;
      type: 'folder' | 'file';
      count?: number;
      workflow?: 'Manual' | 'Automatic';
      link?: string;
    }>;
    link?: string;
  };
  isExpanded: boolean;
  onToggle: (id: string) => void;
  depth?: number;
  checkedOutItems?: Set<string>;
  onCheckout?: (id: string) => void;
  onCheckin?: (id: string) => void;
}

export const FileTreeNode: React.FC<FileTreeNodeProps> = ({ 
  node, 
  isExpanded, 
  onToggle, 
  depth = 0,
  checkedOutItems = new Set(),
  onCheckout,
  onCheckin
}) => {
  const handleLinkClick = (e: React.MouseEvent) => {
    if (node.link) {
      e.stopPropagation();
      window.open(`http://${node.link}`, '_blank');
    }
  };

  return (
    <div className={styles.selectNone}>
      <div
        onClick={() => node.type === 'folder' && onToggle(node.id)}
        className={`${styles.fileTreeItem} ${node.type === 'folder' ? styles.cursorPointer : styles.cursorDefault}`}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        <div className={styles.fileTreeToggle}>
          {node.type === 'folder' &&
            (isExpanded ? (
              <DownOutlined className={styles.chevronDown} />
            ) : (
              <RightOutlined className={styles.chevronRight} />
            ))}
        </div>

        <div
          className={`${styles.fileTreeIcon} ${
            node.type === 'folder' ? styles.folderIcon : styles.fileIcon
          }`}
        >
          {node.type === 'folder' ? (
            <FolderOutlined className={styles.folderIcon} />
          ) : (
            <FileOutlined className={styles.fileIcon} />
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span
            className={`${styles.fileName} ${
              node.type === 'folder' ? styles.folderName : styles.fileText
            } ${node.link ? styles.linkText : ''}`}
            onClick={handleLinkClick}
            style={{ cursor: node.link ? 'pointer' : 'default' }}
          >
            {node.name}
          </span>
          
          {node.link && (
            <LinkOutlined 
              style={{ fontSize: '12px', cursor: 'pointer' }}
              className={styles.externalLink} 
              onClick={handleLinkClick}
            />
          )}
        </div>

        {node.count !== undefined && (
          <span className={styles.fileCount}>+{node.count}</span>
        )}
        {checkedOutItems.has(node.id) ? (
          <button
            className={styles.checkinButton}
            onClick={(e) => {
              e.stopPropagation();
              onCheckin?.(node.id);
            }}
          >
            Check In
          </button>
        ) : (
          <button
            className={styles.checkoutButton}
            onClick={(e) => {
              e.stopPropagation();
              onCheckout?.(node.id);
            }}
          >
            Check Out
          </button>
        )}
      </div>

      {node.type === 'folder' &&
        isExpanded &&
        node.children &&
        node.children.map((child) => (
          <FileTreeNode
            key={child.id}
            node={child}
            isExpanded={false}
            onToggle={onToggle}
            depth={depth + 1}
            checkedOutItems={checkedOutItems}
            onCheckout={onCheckout}
            onCheckin={onCheckin}
          />
        ))}
    </div>
  );
};

export default FileTreeNode;