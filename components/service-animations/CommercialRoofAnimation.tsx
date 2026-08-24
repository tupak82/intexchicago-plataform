import styles from "./CommercialRoofAnimation.module.css";

export function CommercialRoofAnimation({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.scene} ${compact ? styles.compact : ""}`} aria-label="Commercial roof operations animation">
      <div className={styles.roof} aria-hidden="true">
        <span className={styles.zoneA} /><span className={styles.zoneB} /><span className={styles.zoneC} />
        <span className={styles.hvacA} /><span className={styles.hvacB} />
        <span className={styles.safetyLine} /><span className={styles.crew} />
        <span className={styles.path} /><span className={styles.drain} />
      </div>
      {!compact && <div className={styles.caption}><span>Commercial execution</span><strong>Protect the roof without losing control of the building below.</strong></div>}
    </div>
  );
}
