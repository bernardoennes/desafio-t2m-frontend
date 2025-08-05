import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import api from "../../Service";
import ProductCard from "../ProductCard";

export default function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const produtosPorPagina = 10;

  const fetchProdutos = () => {
    api.get("/estoque")
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Cálculo para paginação
  const indexInicial = (paginaAtual - 1) * produtosPorPagina;
  const indexFinal = indexInicial + produtosPorPagina;
  const produtosPaginados = produtos.slice(indexInicial, indexFinal);
  const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

  const mudarPagina = (novaPagina) => {
    if (novaPagina < 1 || novaPagina > totalPaginas) return;
    setPaginaAtual(novaPagina);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Produtos Cadastrados</h2>

      <div className={styles.cardList}>
        {produtosPaginados.map((produto, i) => (
          <ProductCard key={i} produto={produto} onDelete={fetchProdutos} />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => mudarPagina(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            ⬅
          </button>

          <span className={styles.pageInfo}>
            Página {paginaAtual} de {totalPaginas}
          </span>

          <button
            className={styles.pageButton}
            onClick={() => mudarPagina(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            ➡
          </button>
        </div>
      )}
    </div>
  );
}
