"use client";
import React, { useState } from "react";
import { Layout, Menu, Avatar, Badge, Space, Dropdown, Tooltip } from "antd";
import {
    DashboardOutlined,
    FolderOutlined,
    BarChartOutlined,
    HomeOutlined,
    BellOutlined,
    UserOutlined,
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AppstoreOutlined,
    LineChartOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Dashboard } from "@/view/dashborard";
import styles from "./layout.module.scss";

const { Header, Sider, Content } = Layout;

const HomePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState("dashboard");

    const userMenuItems = [
        { key: "profile", label: "My Profile" },
        { key: "settings", label: "Settings" },
        { key: "divider", type: "divider" as const },
        { key: "logout", label: "Sign Out" },
    ];

    const menuItems = [
        { key: "home", icon: <HomeOutlined />, label: "Home" },
        { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
        { key: "workspaces", icon: <AppstoreOutlined />, label: "Workspaces" },
        { key: "filelist", icon: <FolderOutlined />, label: "File List" },
        {
            key: "analytics",
            icon: <BarChartOutlined />,
            label: "Data Analytics",
        },
        { key: "looker", icon: <LineChartOutlined />, label: "Looker Studio" },
    ];

    return (
        <Layout className={styles.layout}>
            {/* ===== 顶部导航栏 - 整行撑开 ===== */}
            <Header className={styles.header}>
                {/* 左侧：HSBC 图标 */}
                <div className={styles.headerLeft}>
                    <div className={styles.brand}>
                        <div className={styles.brandIcon}>
                            {/* HSBC 六边形图标 */}
                            <svg viewBox="0 0 40 40" width="32" height="32">
                                <defs>
                                    <linearGradient id="hsbcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#EE3524" />
                                        <stop offset="100%" stopColor="#c0392b" />
                                    </linearGradient>
                                </defs>
                                <polygon 
                                    points="20,2 36,11 36,29 20,38 4,29 4,11" 
                                    fill="url(#hsbcGrad)"
                                />
                                <text x="20" y="24" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">HSBC</text>
                            </svg>
                        </div>
                        <span className={styles.brandName}>Code Jarvis</span>
                    </div>
                </div>

                {/* 右侧：功能图标区 */}
                <div className={styles.headerRight}>
                    <Space size={16}>
                        {/* 通知 */}
                        <Tooltip title="Notifications">
                            <Badge count={5} size="small">
                                <div className={styles.iconBtn}>
                                    <BellOutlined />
                                </div>
                            </Badge>
                        </Tooltip>

                        {/* 分隔 */}
                        <div className={styles.headerDivider} />

                        {/* 用户 */}
                        <Dropdown
                            menu={{ items: userMenuItems }}
                            placement="bottomRight"
                            trigger={["click"]}
                        >
                            <div className={styles.userBtn}>
                                <Avatar size={32} icon={<UserOutlined />} className={styles.avatar} />
                                <span className={styles.userName}>Admin</span>
                                <DownOutlined className={styles.userArrow} />
                            </div>
                        </Dropdown>
                    </Space>
                </div>
            </Header>

            {/* ===== 主体容器 ===== */}
            <Layout className={styles.container}>
                {/* ===== 左侧侧边栏 ===== */}
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className={styles.sider}
                    width={220}
                    collapsedWidth={56}
                >
                    {/* 导航菜单 */}
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        defaultOpenKeys={["analytics"]}
                        className={styles.menu}
                        items={menuItems}
                        onClick={({ key }) => setSelectedKey(key)}
                    />

                    {/* 分隔线 */}
                    <div className={styles.divider} />

                    {/* Collapse 按钮 */}
                    <div
                        className={styles.collapseBtn}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? (
                            <MenuUnfoldOutlined className={styles.collapseIcon} />
                        ) : (
                            <>
                                <MenuFoldOutlined className={styles.collapseIcon} />
                                <span className={styles.collapseText}>Collapse</span>
                            </>
                        )}
                    </div>
                </Sider>

                {/* ===== 右侧主内容区 ===== */}
                <Layout className={styles.mainLayout}>
                    {/* ===== 主内容区 - 白色背景充满 ===== */}
                    <Content className={styles.content}>
                        <Dashboard />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default HomePage;
