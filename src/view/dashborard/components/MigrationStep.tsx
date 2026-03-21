import React from "react";
import styles from "./MigrationStep.module.scss";

interface MigrationStepProps {
  number: string;
  title: string;
  stage?: number;
}

const formatNumber = (num: string): string => {
  const number = parseFloat(num);
  if (isNaN(number)) return num;
  return number.toLocaleString();
};

export const MigrationStep: React.FC<MigrationStepProps> = ({
  number,
  title,
  stage = 1,
}) => {
  const formattedNumber = formatNumber(number);
  const stepClass = stage === 1 ? styles.stepStage1 : styles.stepStage2;

  return (
    <div className={stepClass}>
      <div className={styles.stepContent}>
        <p className={styles.stepNumber}>{formattedNumber}</p>
        <p className={styles.stepTitle}>{title}</p>
      </div>
    </div>
  );
};

export default MigrationStep;
