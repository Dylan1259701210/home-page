import React, { useState, useMemo, useEffect } from "react";
import {
	SearchOutlined,
	FolderOutlined,
	FileOutlined,
	UpOutlined,
	DownOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import FileTreeNode from "./FileTreeNode";
import styles from "./FileTreeSection.module.scss";

interface FileTreeNodeType {
	id: string;
	name: string;
	type: "folder" | "file";
	count?: number;
	link?: string;
	children?: FileTreeNodeType[];
}

interface FileTreeSectionProps {
	fileTreeData: FileTreeNodeType[];
}

export const FileTreeSection: React.FC<FileTreeSectionProps> = ({
	fileTreeData,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isFileTreeExpanded, setIsFileTreeExpanded] = useState(true);
	const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
		new Set(),
	);
	const [checkedOutItems, setCheckedOutItems] = useState<Set<string>>(
		new Set(),
	);
	const [showCheckoutModal, setShowCheckoutModal] = useState(false);
	const [currentItemId, setCurrentItemId] = useState<string>("");

	// 默认展开更多层级
	useEffect(() => {
		const expandAll = (nodes: FileTreeNodeType[], depth: number = 0) => {
			if (depth > 2) return; // 展开到第3层
			nodes.forEach((node) => {
				if (node.type === "folder") {
					expandedFolders.add(node.id);
					if (node.children) {
						expandAll(node.children, depth + 1);
					}
				}
			});
		};
		expandAll(fileTreeData);
		setExpandedFolders(new Set(expandedFolders));
	}, []);

	const toggleFolder = (id: string) => {
		const newExpanded = new Set(expandedFolders);
		if (newExpanded.has(id)) {
			newExpanded.delete(id);
		} else {
			newExpanded.add(id);
		}
		setExpandedFolders(newExpanded);
	};

	const filteredFileTree = useMemo(() => {
		if (!searchTerm) return fileTreeData;

		const filterNodes = (nodes: FileTreeNodeType[]): FileTreeNodeType[] => {
			return nodes.reduce((acc: FileTreeNodeType[], node) => {
				const matchesSearch = node.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase());

				if (node.children) {
					const filteredChildren = filterNodes(node.children);
					if (filteredChildren.length > 0 || matchesSearch) {
						acc.push({
							...node,
							children:
								filteredChildren.length > 0 ? filteredChildren : node.children,
						});
					}
				} else if (matchesSearch) {
					acc.push(node);
				}

				return acc;
			}, []);
		};

		return filterNodes(fileTreeData);
	}, [searchTerm, fileTreeData]);

	const handleCheckout = (id: string) => {
		setCurrentItemId(id);
		setShowCheckoutModal(true);
	};

	const confirmCheckout = () => {
		const newCheckedOut = new Set(checkedOutItems);
		newCheckedOut.add(currentItemId);
		setCheckedOutItems(newCheckedOut);
		setShowCheckoutModal(false);
		setCurrentItemId("");
	};

	const handleCheckin = (id: string) => {
		const newCheckedOut = new Set(checkedOutItems);
		newCheckedOut.delete(id);
		setCheckedOutItems(newCheckedOut);
	};

	return (
		<>
			<section className={styles.fileTreeSection}>
				<button
					onClick={() => setIsFileTreeExpanded(!isFileTreeExpanded)}
					className={styles.fileTreeSectionHeader}
				>
					<div className={styles.fileTreeSectionHeaderLeft}>
						<div className={styles.fileTreeSectionHeaderIcon}>
							<FolderOutlined className={styles.fileTreeSectionHeaderIconSvg} />
						</div>
						<div className={styles.fileTreeSectionHeaderText}>
							<h2 className={styles.fileTreeSectionHeaderTitle}>
								SAS Server Migration Latest Update
							</h2>
						</div>
					</div>
					<div className={styles.fileTreeSectionHeaderRight}>
						<div className={styles.fileTreeSectionHeaderStatus}></div>
						{isFileTreeExpanded ? (
							<UpOutlined className={styles.fileTreeSectionHeaderToggle} />
						) : (
							<DownOutlined className={styles.fileTreeSectionHeaderToggle} />
						)}
					</div>
				</button>

				{isFileTreeExpanded && (
					<div className={styles.fileTreeSectionContent}>
						<div className={styles.fileTreeSectionContentInner}>
							<div className={styles.fileTreeSectionContentSearch}>
								<SearchOutlined className={styles.searchIcon} />
								<input
									type="text"
									placeholder="Search files or folders..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className={styles.searchInput}
								/>
								{searchTerm && (
									<button
										onClick={() => setSearchTerm("")}
										className={styles.searchClear}
									>
										<svg
											className={styles.searchClearIcon}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								)}
							</div>

							<div className={styles.fileTreeSectionContentGrid}>
								{filteredFileTree.map((rootNode) => (
									<div key={rootNode.id} className={styles.fileTreeNode}>
										<FileTreeNode
											node={rootNode}
											isExpanded={expandedFolders.has(rootNode.id)}
											onToggle={toggleFolder}
											depth={0}
											checkedOutItems={checkedOutItems}
											onCheckout={handleCheckout}
											onCheckin={handleCheckin}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</section>
			<Modal
				open={showCheckoutModal}
				title="Confirm Checkout"
				onCancel={() => setShowCheckoutModal(false)}
				onOk={confirmCheckout}
			>
				<p>Are you sure you want to checkout this item?</p>
			</Modal>
		</>
	);
};

export default FileTreeSection;
