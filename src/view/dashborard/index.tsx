"use client";
import React from "react";
import { fileTreeData } from "./mock";
import styles from "./index.module.scss";
import DashboardHeader from "./components/DashboardHeader";
import MetricCard from "./components/MetricCard";
import MigrationFlow from "./components/MigrationFlow";
import FileTreeSection from "./components/FileTreeSection";

export const Dashboard = () => {
  const migrationSteps = [
    { number: "9871", title: "Analysis Completed" },
    { number: "9871", title: "Conversion Completed" },
    { number: "9871", title: "Code Validation Completed" },
    { number: "36", title: "Data Validation Completed", stage: 2 },
    { number: "36", title: "Optimization Completed", stage: 2 },
    { number: "36", title: "Migration Completed", stage: 2 },
  ];

  return (
    <div className={styles.dashboard}>
      {/* 标题卡片模块 */}
      <section className={styles.titleCard}>
        <DashboardHeader title="SAS Modernization Dashboard" />
      </section>

      {/* 数据统计模块 */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <MetricCard number="1,676,852" title="No. of SAS Programs To Be Converted" />
          <MetricCard number="9,871" title="No. of SAS Programs Converted" />
          <MetricCard number="36" title="No. of SAS Programs Migrated" />
        </div>
      </section>

      {/* 迁移流水线模块 */}
      <section className={styles.pipelineSection}>
        <MigrationFlow steps={migrationSteps} />
      </section>

      {/* 最新更新模块 */}
      <FileTreeSection fileTreeData={fileTreeData} />
    </div>
  );
};

export default Dashboard;
