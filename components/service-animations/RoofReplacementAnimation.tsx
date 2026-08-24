import styles from "./RoofReplacementAnimation.module.css";

export function RoofReplacementAnimation({ compact = false }: { compact?: boolean }) {
  return <div className={`${styles.scene} ${compact ? styles.compact : ""}`} aria-label="Roof replacement layer-by-layer animation"><div className={styles.deck} aria-hidden="true"><span className={styles.oldLayer}/><span className={styles.tearOff}/><span className={styles.underlayment}/><span className={styles.row1}/><span className={styles.row2}/><span className={styles.row3}/></div>{!compact&&<div className={styles.caption}><span>Full system renewal</span><strong>Tear off. Rebuild. Protect.</strong></div>}</div>;
}
