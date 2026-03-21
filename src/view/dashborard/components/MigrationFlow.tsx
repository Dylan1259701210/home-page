import React from "react";
import MigrationStep from "./MigrationStep";
import styles from "./MigrationFlow.module.scss";

interface Step {
  number: string;
  title: string;
  stage?: number;
}

interface MigrationFlowProps {
  steps: Step[];
}

export const MigrationFlow: React.FC<MigrationFlowProps> = ({ steps }) => {
  const stage1Steps = steps.slice(0, 3);
  const stage2Steps = steps.slice(3);

  return (
    <div className={styles.flow}>
      {/* 头部 */}
      <div className={styles.flowHeader}>
        <h3 className={styles.flowTitle}>Migration Pipeline</h3>
        <span className={styles.flowSubtitle}>Real-time progress</span>
      </div>

      {/* 主体 */}
      <div className={styles.flowBody}>
        <div className={styles.stepsContainer}>
          {/* 第一阶段：自动化 */}
          <div className={styles.stage1}>
            <div className={styles.stepsRow}>
              {stage1Steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <MigrationStep number={step.number} title={step.title} stage={1} />
                  {idx < stage1Steps.length - 1 && (
                    <div className={styles.stepArrow}>
                      <span className={styles.arrowIcon}>→</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            {/* 向下箭头 */}
            <div className={styles.downArrow}>
              <span className={styles.downArrowIcon}>↓</span>
            </div>
            {/* 阶段标签 */}
            <div className={styles.stageLabel}>⚡ Automation</div>
          </div>

          {/* 第二阶段：人工 */}
          <div className={styles.stage2}>
            <div className={styles.stepsRow}>
              {stage2Steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <MigrationStep number={step.number} title={step.title} stage={2} />
                  {idx < stage2Steps.length - 1 && (
                    <div className={styles.stepArrow}>
                      <span className={styles.arrowIcon}>→</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            {/* 阶段标签 */}
            <div className={styles.stageLabel}>👤 Human SME</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MigrationFlow;
