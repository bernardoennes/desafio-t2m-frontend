import styles from "./styles.module.css";

export default function ProductList() {
  const produtos = [
    { nome: "Notebook Dell", quantidade: 5 },
    { nome: "Mouse Logitech", quantidade: 12 },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Produtos Cadastrados</h2>
      <ul className={styles.list}>
        {produtos.map((produto, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.nome}>{produto.name}</span>
            <span className={styles.quantidade}>{produto.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
