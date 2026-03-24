'use client';

import React, { useState } from 'react';
import {
    Layout, Menu, Typography, Badge, Avatar, Card, Row, Col,
    Statistic, Input, Tree, Button, Space, Divider, ConfigProvider
} from 'antd';
import {
    HomeOutlined,
    DashboardOutlined,
    AppstoreOutlined,
    FolderOpenOutlined,
    BarChartOutlined,
    LineChartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BellOutlined,
    SearchOutlined,
    ArrowRightOutlined,
    FolderFilled,
    UserOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// Mock data for the File Explorer Tree
const treeData = [
    {
        title: 'Production_Data',
        key: '0-0',
        icon: <FolderFilled style={{ color: '#ff4d4f' }} />,
        count: '+156',
        children: [
            {
                title: 'Finance_Reports',
                key: '0-0-0',
                icon: <FolderFilled style={{ color: '#ff4d4f' }} />,
                count: '+89',
                children: [
                    {
                        title: 'Quarterly_Analysis',
                        key: '0-0-0-0',
                        icon: <FolderFilled style={{ color: '#ff4d4f' }} />,
                        count: '+45',
                        children: [
                            {
                                title: 'Q1_2024',
                                key: '0-0-0-0-0',
                                icon: <FolderFilled style={{ color: '#ff4d4f' }} />,
                                count: '+23',
                                children: [
                                    {
                                        title: 'January',
                                        key: '0-0-0-0-0-0',
                                        icon: <FolderFilled style={{ color: '#ff4d4f' }} />,
                                        count: '+12',
                                        isLeaf: true,
                                    }
                                ]
                            }
                        ]
                    },
                ],
            },
        ],
    },
];

export default function DashboardPage() {
    const [collapsed, setCollapsed] = useState(false);

    // Custom render for Tree nodes to include the badge and button
    const titleRender = (nodeData: any) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: 24 }}>
                <Space>
                    <Text strong>{nodeData.title}</Text>
                    {nodeData.count && (
                        <Badge
                            count={nodeData.count}
                            style={{ backgroundColor: '#e6f4ff', color: '#1677ff', boxShadow: 'none' }}
                        />
                    )}
                </Space>
                <Button size="small" danger style={{ borderRadius: 4 }}>Check Out</Button>
            </div>
        );
    };

    return (
        // ConfigProvider allows us to inject the specific red theme globally for antd components
        <ConfigProvider theme={{ token: { colorPrimary: '#cf1322' } }}>
            <Layout style={{ minHeight: '100vh' }}>

                {/* SIDEBAR */}
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    theme="light"
                    style={{ borderRight: '1px solid #f0f0f0' }}
                >
                    <div style={{ height: 64, display: 'flex', alignItems: 'center', padding: '0 24px' }}>
                        <div style={{ width: 24, height: 24, background: '#cf1322', borderRadius: 4, marginRight: 8 }} />
                        {!collapsed && <Title level={5} style={{ margin: 0 }}>Code Jarvis</Title>}
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['2']}
                        style={{ borderRight: 0 }}
                        items={[
                            { key: '1', icon: <HomeOutlined />, label: 'Home' },
                            { key: '2', icon: <DashboardOutlined />, label: 'Dashboard' },
                            { key: '3', icon: <AppstoreOutlined />, label: 'Workspaces' },
                            { key: '4', icon: <FolderOpenOutlined />, label: 'File List' },
                            { key: '5', icon: <BarChartOutlined />, label: 'Data Analytics' },
                            { key: '6', icon: <LineChartOutlined />, label: 'Looker Studio' },
                        ]}
                    />
                    <div style={{ position: 'absolute', bottom: 0, width: '100%', borderTop: '1px solid #f0f0f0' }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ width: '100%', height: 48, textAlign: 'left', paddingLeft: 24 }}
                        >
                            {!collapsed && 'Collapse'}
                        </Button>
                    </div>
                </Sider>

                {/* MAIN LAYOUT */}
                <Layout>

                    {/* HEADER */}
                    <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
                        <Title level={4} style={{ margin: 0 }}>SAS Modernization Dashboard</Title>
                        <Space size="large">
                            <Badge count={5}>
                                <BellOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
                            </Badge>
                            <Space style={{ cursor: 'pointer' }}>
                                <Avatar style={{ backgroundColor: '#cf1322' }} icon={<UserOutlined />} />
                                <Text>Admin</Text>
                            </Space>
                        </Space>
                    </Header>

                    {/* SCROLLABLE CONTENT */}
                    <Content style={{ margin: '24px', overflowY: 'auto' }}>

                        {/* KPI CARDS */}
                        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                            <Col span={8}>
                                <Card bordered={false} style={{ borderTop: '4px solid #cf1322', boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16), 0 3px 6px 0 rgba(0,0,0,0.12)' }}>
                                    <Statistic title="No. of SAS Programs To Be Converted" value={1676852} valueStyle={{ fontSize: 32, fontWeight: 'bold' }} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} style={{ borderTop: '4px solid #cf1322', boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16), 0 3px 6px 0 rgba(0,0,0,0.12)' }}>
                                    <Statistic title="No. of SAS Programs Converted" value={9871} valueStyle={{ fontSize: 32, fontWeight: 'bold' }} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} style={{ borderTop: '4px solid #cf1322', boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16), 0 3px 6px 0 rgba(0,0,0,0.12)' }}>
                                    <Statistic title="No. of SAS Programs Migrated" value={36} valueStyle={{ fontSize: 32, fontWeight: 'bold' }} />
                                </Card>
                            </Col>
                        </Row>

                        {/* PIPELINE / PROCESS FLOW (Custom Layout to match image) */}
                        <Row style={{ marginBottom: 24 }} align="middle">
                            <Col flex="1">
                                <div style={{ background: '#fff0f0', padding: 24, borderRadius: 8, border: '1px solid #ffccc7', textAlign: 'center' }}>
                                    <Row justify="space-around">
                                        <Col><Statistic title="Analysis Completed" value={9871} /></Col>
                                        <Col><Statistic title="Conversion Completed" value={9871} /></Col>
                                        <Col><Statistic title="Code Validation Completed" value={9871} /></Col>
                                    </Row>
                                    <Divider style={{ margin: '12px 0', borderColor: '#ffccc7' }} />
                                    <Text type="danger">⚡ Fully Automatic</Text>
                                </div>
                            </Col>
                            <Col style={{ padding: '0 16px' }}>
                                <Avatar size="large" style={{ backgroundColor: '#cf1322' }} icon={<ArrowRightOutlined />} />
                            </Col>
                            <Col flex="1">
                                <div style={{ background: '#f8f9fa', padding: 24, borderRadius: 8, border: '1px solid #f0f0f0', textAlign: 'center' }}>
                                    <Row justify="space-around">
                                        <Col><Statistic title="Data Validation Completed" value={36} /></Col>
                                        <Col><Statistic title="Optimization Completed" value={36} /></Col>
                                        <Col><Statistic title="Migration Completed" value={36} /></Col>
                                    </Row>
                                    <Divider style={{ margin: '12px 0' }} />
                                    <Text type="secondary">👤 Managed by Human SME & Powered by Code Jarvis</Text>
                                </div>
                            </Col>
                        </Row>

                        {/* FILE EXPLORER */}
                        <Card bordered={false} style={{ boxShadow: '0 1px 2px -2px rgba(0,0,0,0.16), 0 3px 6px 0 rgba(0,0,0,0.12)' }}>
                            <Space style={{ marginBottom: 24 }}>
                                <FolderFilled style={{ color: '#cf1322', fontSize: 20 }} />
                                <Title level={5} style={{ margin: 0 }}>SAS Server Migration Latest Update</Title>
                            </Space>

                            <Input
                                size="large"
                                placeholder="Search files or folders..."
                                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                                style={{ marginBottom: 24, backgroundColor: '#f5f5f5', border: 'none' }}
                            />

                            <Tree
                                showIcon
                                defaultExpandAll
                                treeData={treeData}
                                titleRender={titleRender}
                                style={{ fontSize: 16 }}
                                switcherIcon={<ArrowRightOutlined style={{ fontSize: 12 }} />}
                            />
                        </Card>

                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}