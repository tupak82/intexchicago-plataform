import styles from "./HailDamageAnimation.module.css";

export function HailDamageAnimation({ compact = false }: { compact?: boolean }) {
  return <div className={`${styles.scene} ${compact ? styles.compact : ""}`} aria-label="Hail impact and soft-metal evidence animation"><div className={styles.roof} aria-hidden="true"><i/><i/><i/><i/><i/><span className={styles.bruiseA}/><span className={styles.bruiseB}/><span className={styles.granules}/><span className={styles.gutter}/><span className={styles.dentA}/><span className={styles.dentB}/></div>{!compact&&<div className={styles.caption}><span>Storm evidence</span><strong>The damage you cannot see from the street.</strong></div>}</div>;
}
