import styles from "./InsuranceClaimsAnimation.module.css";

export function InsuranceClaimsAnimation({ compact = false }: { compact?: boolean }) {
  return <div className={`${styles.scene} ${compact ? styles.compact : ""}`} aria-hidden="true"><div className={styles.clipboard}><span/><span/><span/><b/></div><div className={styles.camera}><i/></div><div className={styles.damage}><i/><i/><i/></div><div className={styles.scope}/><div className={styles.status}>DOCUMENT + SCOPE</div></div>;
}
