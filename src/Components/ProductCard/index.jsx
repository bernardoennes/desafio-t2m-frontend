import styles from "./styles.module.css";
import api from "../../Service";
import { Trash2 } from "lucide-react";

export default function ProductCard({ produto, onDelete }) {
  const getStockLevelClass = (level) => {
    if (level === "Crítico") return styles.critico;
    if (level === "Baixo") return styles.baixo;
    return "";
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar este produto?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/estoque/${produto.barcode}`);
      alert("Produto deletado com sucesso!");
      onDelete?.();
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
      alert("Erro ao deletar produto.");
    }
  };

  return (
    <div className={`${styles.card} ${getStockLevelClass(produto.stockLevel)}`}>
      <div className={styles.header}>
        <h3 className={styles.name}>{produto.name}</h3>
        <span className={styles.quantity}>| Qtd: {produto.quantity}</span>
        <button className={styles.deleteBtn} onClick={handleDelete} title="Excluir produto">
          <Trash2 size={18} />
        </button>
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
