"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import { Dashboard } from "@/view/dashborard";
import styles from "./dashboard.module.scss";

const { Header, Sider, Content } = Layout;

const DashboardPage = () => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout className={styles.layout}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				className={styles.sider}
			>
				<div className={styles.logo}>
					<h2 className={styles.logoText}>SAS Dashboard</h2>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["dashboard"]}
					className={styles.menu}
				>
					<Menu.Item key="dashboard" icon={<DashboardOutlined />}>
						Dashboard
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className={styles.mainLayout}>
				<Header className={styles.header}>
					<div className={styles.headerContent}>
						<h1 className={styles.headerTitle}>SAS Modernization Platform</h1>
					</div>
				</Header>
				<Content className={styles.content}>
					<Dashboard />
				</Content>
			</Layout>
		</Layout>
	);
};

export default DashboardPage;
