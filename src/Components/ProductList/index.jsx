import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import api from "../../Service";
import ProductCard from "../ProductCard"; 

export default function ProductList() {
  const [produtos, setProdutos] = useState([]);

  const fetchProdutos = () => {
    api.get("/estoque")
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Produtos Cadastrados</h2>
      <div className={styles.cardList}>
        {produtos.map((produto, i) => (
          <ProductCard
            key={i}
            produto={produto}
            onDelete={fetchProdutos}
          />
        ))}
      </div>
    </div>
  );
}
