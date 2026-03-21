import React from "react";
import styles from "./DashboardHeader.module.scss";

interface DashboardHeaderProps {
  title: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <h1 className={styles.headerTitle}>{title}</h1>
          <p className={styles.headerSubtitle}>
            Real-time monitoring of SAS program conversion and migration
          </p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            Live
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
