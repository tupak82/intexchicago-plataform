import styles from "./MoldRemediationAnimation.module.css";

export function MoldRemediationAnimation({ compact = false }: { compact?: boolean }) {
  return <div className={`${styles.scene} ${compact ? styles.compact : ""}`} aria-hidden="true"><div className={styles.wall}/><div className={styles.mold}><i/><i/><i/><i/></div><div className={styles.barrier}/><div className={styles.worker}><b/></div><div className={styles.clean}/><div className={styles.status}>CONTAIN + REMOVE</div></div>;
}
