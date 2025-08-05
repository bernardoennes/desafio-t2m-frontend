import { useState } from "react";
import styles from "./styles.module.css";
import logo from "../../assets/t2m-logo.png";
import Sidebar from "../../Components/Sidebar";
import ProductList from "../../Components/ProductList";
import ProductForm from "../../Components/ProductForm";

function StockManagementPage() {
  const [view, setView] = useState("mostrar");

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} alt="Logo T2M" className={styles.logo} />
        <h1 className={styles.title}>Gerenciador de Estoque</h1>
      </header>

      <div className={styles.main}>
        <Sidebar setView={setView} />
        <div className={styles.content}>
          {view === "mostrar" && <ProductList />}
          {view === "adicionar" && <ProductForm />}
          {view === "atualizar" && <ProductForm isUpdate />}
        </div>
      </div>
    </div>
  );
}

export default StockManagementPage;
