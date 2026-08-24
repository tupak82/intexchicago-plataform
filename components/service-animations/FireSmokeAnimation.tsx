import styles from "./FireSmokeAnimation.module.css";

export function FireSmokeAnimation({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.scene} ${compact ? styles.compact : ""}`} aria-hidden="true">
      <div className={styles.wall}><span /><span /></div>
      <div className={styles.smoke}><i /><i /><i /></div>
      <div className={styles.soot} />
      <div className={styles.scrubber}><b /></div>
      <div className={styles.cleanSweep} />
      <div className={styles.status}>AIR + SURFACES</div>
    </div>
  );
}
