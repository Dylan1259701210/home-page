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
      children: [
        { key: "looker", icon: <LineChartOutlined />, label: "Looker Studio" },
      ],
    },
    { key: "settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  return (
    <Layout className={styles.layout}>
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
          {/* Logo */}
          <div className={styles.logo}>
            {!collapsed && <span className={styles.logoText}>Code Jarvis</span>}
          </div>

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
          {/* ===== 顶部导航栏 ===== */}
          <Header className={styles.header}>
            {/* 左侧：产品标识区 */}
            <div className={styles.headerLeft}>
              <div className={styles.brand}>
                <div className={styles.brandIcon}>
                  <svg viewBox="0 0 32 32" fill="none" width="26" height="26">
                    <rect width="32" height="32" rx="8" fill="#EE3524" />
                    <path
                      d="M8 16L14 10L20 16L26 10"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 22L14 16L20 22L26 16"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.6"
                    />
                  </svg>
                </div>
                <span className={styles.brandName}>Code Jarvis</span>
              </div>
            </div>

            {/* 右侧：功能图标区 */}
            <div className={styles.headerRight}>
              <Space size={12}>
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
                    <Avatar size={30} icon={<UserOutlined />} className={styles.avatar} />
                    <span className={styles.userName}>Admin</span>
                    <DownOutlined className={styles.userArrow} />
                  </div>
                </Dropdown>
              </Space>
            </div>
          </Header>

          {/* ===== 主内容区 ===== */}
          <Content className={styles.content}>
            <Dashboard />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomePage;
