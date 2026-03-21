import React from "react";
import styles from "./MetricCard.module.scss";

interface MetricCardProps {
  number: string;
  title: string;
  badge?: string;
  variant?: "default" | "pending" | "completed" | "migrated";
}

export const MetricCard: React.FC<MetricCardProps> = ({
  number,
  title,
  badge,
  variant = "default",
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {badge && (
          <div className={styles.cardBadge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>{badge}</span>
          </div>
        )}
        <p className={styles.cardNumber}>{number}</p>
        <p className={styles.cardTitle}>{title}</p>
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.cardTrend}>View details →</span>
      </div>
    </div>
  );
};

export default MetricCard;
