"use client";

import React, { useState } from "react";
import { Editor, ContentViewer } from "../../components";

export default function HomeView() {
	const [content, setContent] = useState<string>("");
	const [viewContent, setViewContent] = useState<string>("");

	const handleUploadImage = async (file: File) => {
		// Mock image upload function
		return new Promise<{ url: string; alt: string }>((resolve) => {
			setTimeout(() => {
				resolve({
					url: `https://neeko-copilot.bytedance.net/api/text2image?prompt=${file.name}&size=512x512`,
					alt: file.name,
				});
			}, 1000);
		});
	};

	const handleEditorChange = (value: string) => {
		setContent(value);
	};

	const handleSave = () => {
		setViewContent(content);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">富文本编辑器示例</h1>

			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-2">编辑器</h2>
				<div className="border rounded-lg p-4 bg-white">
					<Editor
						value={content}
						onChange={handleEditorChange}
						uploadImage={handleUploadImage}
					/>
					<div className="mt-4 flex justify-end">
						<button
							onClick={handleSave}
							className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
						>
							保存内容
						</button>
					</div>
				</div>
			</div>

			<div>
				<h2 className="text-xl font-semibold mb-2">内容查看器</h2>
				<div className="border rounded-lg p-4 bg-gray-50">
					{viewContent ? (
						<ContentViewer value={viewContent} />
					) : (
						<p className="text-gray-500">点击保存内容后，这里将显示编辑结果</p>
					)}
				</div>
			</div>
		</div>
	);
}
