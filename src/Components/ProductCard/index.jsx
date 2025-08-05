import styles from "./styles.module.css";

export default function ProductCard({ produto, onClick }) {
  const getStockLevelClass = (level) => {
    if (level === "Crítico") return styles.critico;
    if (level === "Baixo") return styles.baixo;
    return "";
  };

  return (
    <div className={`${styles.card} ${getStockLevelClass(produto.stockLevel)}`} onClick={onClick}>
      <div className={styles.header}>
        <h3 className={styles.name}>{produto.name}</h3>
        <span className={styles.quantity}>Qtd: {produto.quantity}</span>
      </div>

      <p className={styles.description}>{produto.description}</p>

      <div className={styles.footer}>
        <div className={styles.details}>
          <span className={styles.barcode}>Código: {produto.barcode}</span>
          <span className={styles.price}>R$ {produto.price.toFixed(2)}</span>
        </div>
        {produto.stockLevel === "Crítico" && (
          <div className={`${styles.alert} ${styles.criticoAlert}`}>⚠ Estoque Crítico</div>
        )}
        {produto.stockLevel === "Baixo" && (
          <div className={`${styles.alert} ${styles.baixoAlert}`}>⚠ Estoque Baixo</div>
        )}
      </div>
    </div>
  );
}
