// /admin/page.js

import Fornecedores from "./fornecedores";  // Importa o componente

export default function AdminPage() {
  return (
    <div>
      <h1>Painel Administrativo</h1>
      <Fornecedores />
    </div>
  );
}
