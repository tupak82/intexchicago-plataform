import styles from "./IceDamAnimation.module.css";

export function IceDamAnimation({ compact = false }: { compact?: boolean }) {
  return <div className={`${styles.scene} ${compact ? styles.compact : ""}`} aria-label="Chicago ice dam freeze-thaw animation"><div className={styles.house} aria-hidden="true"><span className={styles.roof}/><span className={styles.snow}/><span className={styles.melt}/><span className={styles.ice}/><span className={styles.backup}/><span className={styles.drip}/></div>{!compact&&<div className={styles.caption}><span>Chicago winter roofing</span><strong>Freeze. Thaw. Refreeze. Stop the backup.</strong></div>}</div>;
}
