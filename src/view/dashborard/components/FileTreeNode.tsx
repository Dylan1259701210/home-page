import React from 'react';
import { DownOutlined, RightOutlined, FolderOutlined, LinkOutlined } from '@ant-design/icons';
import styles from './FileTreeNode.module.scss';

export interface TreeNode {
    id: string;
    server_name: string;
    folder_path: string;
    count: number;
    children?: TreeNode[];
    link?: string;
}

interface FileTreeNodeProps {
    node: TreeNode;
    expandedIds: Set<string>;
    onToggle: (id: string) => void;
    depth: number;
    checkedOutItems?: Set<string>;
    onCheckout?: (id: string) => void;
    onCheckin?: (id: string) => void;
}

export const FileTreeNode: React.FC<FileTreeNodeProps> = ({
    node,
    expandedIds,
    onToggle,
    depth,
    checkedOutItems = new Set(),
    onCheckout,
    onCheckin
}) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedIds?.has(node.id);

    const handleToggle = () => {
        if (hasChildren) {
            onToggle(node.id);
        }
    };

    const handleLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (node.link) {
            window.open(node.link, '_blank');
        }
    };

    return (
        <div className={styles.nodeWrapper}>
            {/* 左对齐 */}
            <div style={{ paddingLeft: `${depth * 16 + 8}px` }}>
                {/* hover整体 */}
                <div className={styles.hoverBox}>
                    {/* 展开/收起图标 */}
                    {hasChildren && (
                        <span className={styles.toggle} onClick={handleToggle}>
                            {isExpanded ? <DownOutlined /> : <RightOutlined />}
                        </span>
                    )}

                    {/* 文件夹图标 */}
                    <span
                        className={styles.icon}
                        onClick={handleToggle}
                        style={{ cursor: hasChildren ? 'pointer' : 'default' }}
                    >
                        <FolderOutlined />
                    </span>

                    {/* 名称和链接 - 有link时整体 */}
                    {node.link ? (
                        <span className={styles.linkWrapper} onClick={handleLinkClick}>
                            <span className={styles.nameLink}>{node.server_name}</span>
                            <span className={styles.linkIcon}><LinkOutlined /></span>
                        </span>
                    ) : (
                        <span
                            className={styles.name}
                            onClick={handleToggle}
                            style={{ cursor: hasChildren ? 'pointer' : 'default' }}
                        >
                            {node.server_name}
                        </span>
                    )}

                    {/* 数量 */}
                    <span className={styles.count}>+{node.count}</span>

                    {/* 操作按钮 */}
                    {checkedOutItems.has(node.id) ? (
                        <button className={styles.btnCheckin} onClick={() => onCheckin?.(node.id)}>
                            Check In
                        </button>
                    ) : (
                        <button className={styles.btnCheckout} onClick={() => onCheckout?.(node.id)}>
                            Check Out
                        </button>
                    )}
                </div>
            </div>

            {/* 子节点 */}
            {hasChildren && isExpanded && node.children && (
                <div className={styles.children}>
                    {node.children.map((child) => (
                        <FileTreeNode
                            key={child.id}
                            node={child}
                            expandedIds={expandedIds}
                            onToggle={onToggle}
                            depth={depth + 1}
                            checkedOutItems={checkedOutItems}
                            onCheckout={onCheckout}
                            onCheckin={onCheckin}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileTreeNode;
