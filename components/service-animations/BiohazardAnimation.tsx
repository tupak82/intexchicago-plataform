import styles from "./BiohazardAnimation.module.css";

export function BiohazardAnimation({ compact = false }: { compact?: boolean }) {
  return <div className={`${styles.scene} ${compact ? styles.compact : ""}`} aria-hidden="true"><div className={styles.zone}/><div className={styles.tape}>CONTROLLED AREA</div><div className={styles.worker}><i/></div><div className={styles.cleanPass}/><div className={styles.bin}/><div className={styles.status}>DISCREET + CONTROLLED</div></div>;
}
