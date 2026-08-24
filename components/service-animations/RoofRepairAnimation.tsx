import styles from "./RoofRepairAnimation.module.css";

export function RoofRepairAnimation({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.scene} ${compact ? styles.compact : ""}`} aria-label="Localized roof repair animation">
      <div className={styles.roof} aria-hidden="true">
        <i className={styles.shingleA} /><i className={styles.shingleB} /><i className={styles.shingleC} />
        <span className={styles.damage} /><span className={styles.seal} /><span className={styles.patch} />
        <span className={styles.tool} />
      </div>
      {!compact && <div className={styles.caption}><span>Targeted repair</span><strong>Find the failure. Seal the source.</strong></div>}
    </div>
  );
}
