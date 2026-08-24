import styles from "./CommercialRestorationAnimation.module.css";

export function CommercialRestorationAnimation({ compact = false }: { compact?: boolean }) {
  return <div className={`${styles.scene} ${compact ? styles.compact : ""}`} aria-hidden="true"><div className={styles.building}><i/><i/><i/><i/></div><div className={styles.zones}><span/><span/><span/></div><div className={styles.crew}><b/><b/></div><div className={styles.path}/><div className={styles.status}>PHASED RESTORATION</div></div>;
}
