'use client'

import { useState, useEffect } from "react";

// Funções para interagir com a API
export async function getFornecedores() {
  const res = await fetch("/api/fornecedores");
  if (!res.ok) throw new Error("Falha ao carregar fornecedores");
  return res.json();
}

export async function postFornecedor(data) {
  const res = await fetch("/api/fornecedores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Falha ao criar fornecedor");
  return res.json();
}

export async function updateFornecedor(id, data) {
  const res = await fetch(`/api/fornecedores/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Falha ao atualizar fornecedor");
  return res.json();
}

export async function deleteFornecedor(id) {
  const response = await fetch(`/api/fornecedores/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error || "Erro ao excluir fornecedor.");
  }
}

// Componente de Fornecedores
export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    nome: "",
    formaPagamento: "",
    entregaBrasil: false,
    whatsappLink: "",
    instagramLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para carregar os fornecedores
  const loadFornecedores = async () => {
    setLoading(true);
    try {
      const data = await getFornecedores();
      setFornecedores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Carregar fornecedores ao montar o componente
  useEffect(() => {
    loadFornecedores();
  }, []);

  // Função para adicionar ou editar um fornecedor
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newFornecedor = {
        nome: formData.nome,
        formaPagamento: formData.formaPagamento,
        entregaBrasil: formData.entregaBrasil,
        whatsappLink: formData.whatsappLink,
        instagramLink: formData.instagramLink,
      };

      if (formData.id) {
        await updateFornecedor(formData.id, newFornecedor);
      } else {
        await postFornecedor(newFornecedor);
      }

      loadFornecedores();
      setFormData({
        id: null,
        nome: "",
        formaPagamento: "",
        entregaBrasil: false,
        whatsappLink: "",
        instagramLink: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um fornecedor
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteFornecedor(id);
      loadFornecedores(); // Atualiza a lista após exclusão bem-sucedida
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para editar um fornecedor
  const handleEdit = (fornecedor) => {
    setFormData({
      id: fornecedor.id,
      nome: fornecedor.nome,
      formaPagamento: fornecedor.formaPagamento,
      entregaBrasil: fornecedor.entregaBrasil,
      whatsappLink: fornecedor.whatsappLink,
      instagramLink: fornecedor.instagramLink,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fornecedores</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Carregando...</p>}

      {/* Formulário de adicionar/editar fornecedor */}
      <form onSubmit={handleAdd} className="mb-4">
        <div className="mb-2">
          <label className="block">Nome:</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block">Forma de Pagamento:</label>
          <input
            type="text"
            value={formData.formaPagamento}
            onChange={(e) => setFormData({ ...formData, formaPagamento: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block">Entrega para todo o Brasil?</label>
          <input
            type="checkbox"
            checked={formData.entregaBrasil}
            onChange={(e) => setFormData({ ...formData, entregaBrasil: e.target.checked })}
            className="p-2"
          />
        </div>
        <div className="mb-2">
          <label className="block">WhatsApp:</label>
          <input
            type="text"
            value={formData.whatsappLink}
            onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block">Instagram:</label>
          <input
            type="text"
            value={formData.instagramLink}
            onChange={(e) => setFormData({ ...formData, instagramLink: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          {formData.id ? "Alterar Fornecedor" : "Adicionar Fornecedor"}
        </button>
      </form>

      {/* Lista de fornecedores */}
      <ul className="list-none p-0">
        {fornecedores.map((fornecedor) => (
          <li key={fornecedor.id} className="flex justify-between items-center p-2 border-b">
            <div>
              <p className="font-semibold">{fornecedor.nome}</p>
              <p>{fornecedor.formaPagamento}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(fornecedor)}
                className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
              >
                Alterar
              </button>
              <button
                onClick={() => handleDelete(fornecedor.id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
