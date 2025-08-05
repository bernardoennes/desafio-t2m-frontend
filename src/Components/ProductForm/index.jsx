import { useState } from "react";
import styles from "./styles.module.css";
import api from "../../Service";

export default function ProductForm({ isUpdate = false, produto = {}, onFinish }) {
  const [name, setName] = useState(produto.name || "");
  const [quantity, setQuantity] = useState(produto.quantity || "");
  const [barcode, setBarcode] = useState(produto.barcode || "");
  const [description, setDescription] = useState(produto.description || "");
  const [price, setPrice] = useState(produto.price || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !barcode || quantity <= 0 || price <= 0) {
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
      return;
    }

    const productData = {
      barcode,
      name,
      quantity,
      description,
      price,
    };

    try {
      if (isUpdate) {
        await api.put(`/estoque/${barcode}`, productData);
        alert("Produto atualizado com sucesso!");
      } else {
        await api.post("/estoque", productData);
        alert("Produto adicionado com sucesso!");

        setName("");
        setQuantity("");
        setBarcode("");
        setDescription("");
        setPrice("");
      }
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
      alert("Erro ao salvar produto. Verifique os dados e tente novamente.");
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
          placeholder="Digite o nome do produto..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        Quantidade
        <input
          type="number"
          placeholder="Digite a quantidade..."
          className={styles.input}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </label>

      <label className={styles.label}>
        Código de Barras
        <input
          type="text"
          className={styles.input}
          value={barcode}
          placeholder="XXXX-XXXX"
          onChange={(e) => setBarcode(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        Descrição
        <input
          type="text"
          placeholder="Digite uma descrição breve do produto..."
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
          placeholder="Digite o preço do produto..."
          className={styles.input}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </label>

      <button type="submit" className={styles.button}>
        {isUpdate ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
}
