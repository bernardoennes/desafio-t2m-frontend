import styles from "./styles.module.css";

export default function ProductForm({ isUpdate = false }) {
  return (
    <form className={styles.form}>
      <h2 className={styles.title}>
        {isUpdate ? "Atualizar Produto" : "Adicionar Produto"}
      </h2>

      <label className={styles.label}>
        Nome do Produto
        <input type="text" className={styles.input} />
      </label>

      <label className={styles.label}>
        Quantidade
        <input type="number" className={styles.input} />
      </label>

      <button type="submit" className={styles.button}>
        {isUpdate ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
}
