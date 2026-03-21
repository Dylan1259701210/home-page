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
            <div className={styles.flowBody}>
                {/* 左侧：Automation */}
                <div className={styles.leftStage}>
                    <div className={styles.stageHeader}>
                        <span className={styles.stageIcon}>⚡</span>
                        <span className={styles.stageName}>Fully Automatic</span>
                    </div>
                    <div className={styles.stepsTrack}>
                        {stage1Steps.map((step, idx) => (
                            <React.Fragment key={idx}>
                                <MigrationStep number={step.number} title={step.title} stage={1} />
                                {idx < stage1Steps.length - 1 && (
                                    <div className={styles.stepArrow}>
                                        <span className={styles.arrow}>→</span>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* 中间：向右箭头 */}
                <div className={styles.centerArrow}>
                    <div className={styles.arrowRight}>→</div>
                </div>

                {/* 右侧：Human SME */}
                <div className={styles.rightStage}>
                    <div className={styles.stageHeaderDark}>
                        <span className={styles.stageIcon}>👤</span>
                        <span className={styles.stageName}>Managed by Human SME & Powered by Code Jarvis</span>
                    </div>
                    <div className={styles.stepsTrack}>
                        {stage2Steps.map((step, idx) => (
                            <React.Fragment key={idx}>
                                <MigrationStep number={step.number} title={step.title} stage={2} />
                                {idx < stage2Steps.length - 1 && (
                                    <div className={styles.stepArrow}>
                                        <span className={styles.arrowDark}>→</span>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MigrationFlow;
