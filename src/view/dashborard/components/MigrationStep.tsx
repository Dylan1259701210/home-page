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

  return (
    <div className={stage === 1 ? styles.stepOrange : styles.stepRed}>
      <span className={styles.stepNumber}>{formattedNumber}</span>
      <span className={styles.stepTitle}>{title}</span>
    </div>
  );
};

export default MigrationStep;
