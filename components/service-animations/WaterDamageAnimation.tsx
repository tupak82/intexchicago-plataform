import styles from "./WaterDamageAnimation.module.css";

export function WaterDamageAnimation({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.scene} ${compact ? styles.compact : ""}`} aria-hidden="true">
      <div className={styles.room} />
      <div className={styles.water}><span /><span /><span /></div>
      <div className={styles.extractor}><i /></div>
      <div className={styles.dryer}><i /><i /><i /></div>
      <div className={styles.moisture}>MOISTURE</div>
      <div className={styles.dry}>DRY</div>
    </div>
  );
}
