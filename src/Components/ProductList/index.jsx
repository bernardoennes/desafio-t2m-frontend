import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import api from "../../Service";
import ProductCard from "../ProductCard"; 

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
      <div className={styles.cardList}>
        {produtos.map((produto, i) => (
          <ProductCard
            key={i}
            produto={produto}
            onClick={() => {
              setProdutoSelecionado(produto);
              setView("atualizar");
            }}
          />
        ))}
      </div>
    </div>
  );
}
