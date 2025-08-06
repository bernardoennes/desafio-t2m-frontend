import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import api from "../../Service";
import ProductCard from "../ProductCard";
import Loading from "../Loading";

export default function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 10;

  const fetchProdutos = () => {
    setLoading(true);
    api.get("/estoque")
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar produtos:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const initialIndex = (page - 1) * productsPerPage;
  const finalIndex = initialIndex + productsPerPage;
  const productsInPage = produtos.slice(initialIndex, finalIndex);
  const totalPages = Math.ceil(produtos.length / productsPerPage);

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  if (loading) return <Loading />;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Produtos Cadastrados</h2>

      <div className={styles.cardList}>
        {productsInPage.map((produto, i) => (
          <ProductCard key={i} produto={produto} onDelete={fetchProdutos} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
          >
            ⬅
          </button>

          <span className={styles.pageInfo}>
            Página {page} de {totalPages}
          </span>

          <button
            className={styles.pageButton}
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages}
          >
            ➡
          </button>
        </div>
      )}
    </div>
  );
}

