import styles from "./styles.module.css";

export default function Sidebar({ setView }) {
  return (
    <nav className={styles.sidebar}>
      <button onClick={() => setView("mostrar")}>Mostrar Produtos</button>
      <button onClick={() => setView("adicionar")}>Adicionar Produto</button>
      <button onClick={() => setView("atualizar")}>Atualizar Produto</button>
    </nav>
  );
}
