import { useState } from "react";
import styles from "./styles.module.css";
import api from "../../Service";

export default function ProductForm({ isUpdate = false, produto = {}, onFinish }) {
  const [name, setName] = useState(produto.name || "");
  const [quantity, setQuantity] = useState(produto.quantity || "");
  const [barCode, setBarCode] = useState(produto.barCode || "");
  const [description, setDescription] = useState(produto.description || "");
  const [price, setPrice] = useState(produto.price || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, quantity, barCode, description, price };
    try {
      if (isUpdate) {
        await api.put(`/estoque/${barCode}`, payload);
        await api.post("/estoque", payload); 
      }

      onFinish?.(); 
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        {isUpdate ? "Atualizar Produto" : "Adicionar Produto"}
      </h2>

      <label className={styles.label}>
        Nome do Produto
        <input
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className={styles.label}>
        Quantidade
        <input
          type="number"
          className={styles.input}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </label>

      <label className={styles.label}>
        Código de Barras
        <input
          type="text"
          className={styles.input}
          value={barCode}
          onChange={(e) => setBarCode(e.target.value)}
          disabled={isUpdate}
        />
      </label>

      <label className={styles.label}>
        Descrição
        <input
          type="text"
          className={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label className={styles.label}>
        Preço
        <input
          type="number"
          step="0.01"
          className={styles.input}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </label>

      <button type="submit" className={styles.button}>
        {isUpdate ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
}
