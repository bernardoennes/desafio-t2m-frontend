import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import api from "../../Service";

export default function ProductList({ setProdutoSelecionado, setView }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get("/estoque")
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Produtos Cadastrados</h2>
      <ul className={styles.list}>
        {produtos.map((produto, i) => (
          <li
            key={i}
            className={styles.item}
            onClick={() => {
              setProdutoSelecionado(produto);
              setView("atualizar");
            }}
          >
            <span className={styles.nome}>{produto.name}</span>
            <span className={styles.quantidade}>{produto.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
