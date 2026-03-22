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
        <div className={styles.content}>
            {/* 左侧卡片 - 第一阶段 */}
            <div className={styles.leftCard}>
                <div className={styles.stepsArea}>
                    <div className={styles.stepsRow}>
                        {stage1Steps.map((step, idx) => (
                            <React.Fragment key={idx}>
                                <MigrationStep number={step.number} title={step.title} stage={1} />
                                {idx < stage1Steps.length - 1 && (
                                    <span className={`${styles.arrow} ${styles.arrowOrange}`}>→</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className={`${styles.footer} ${styles.footerOrange}`}>
                    ⚡ Fully Automatic
                </div>
            </div>

            {/* 中间箭头 */}
            <div className={styles.center}>
                <span className={styles.centerArrow}>→</span>
            </div>

            {/* 右侧卡片 - 第二阶段 */}
            <div className={styles.rightCard}>
                <div className={styles.stepsArea}>
                    <div className={styles.stepsRow}>
                        {stage2Steps.map((step, idx) => (
                            <React.Fragment key={idx}>
                                <MigrationStep number={step.number} title={step.title} stage={2} />
                                {idx < stage2Steps.length - 1 && (
                                    <span className={`${styles.arrow} ${styles.arrowRed}`}>→</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className={`${styles.footer} ${styles.footerRed}`}>
                    👤 Managed by Human SME & Powered by Code Jarvis
                </div>
            </div>
        </div>
    );
};

export default MigrationFlow;
