'use client'

import { useEffect, useState } from "react";
import Fornecedores from "./fornecedores";
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()


  const handleLogout = () => {
    localStorage.removeItem('token') // Remover o token do localStorage
    router.push('/login') // Redirecionar para a página de login
  }


  useEffect(() => {
    // Verificar se o usuário está autenticado
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login') // Redirecionar para login se não houver token
      return
    }

    // Verificar se o token é válido e se o usuário é do tipo comum
    const payload = JSON.parse(atob(token.split('.')[1])) // Decodificar o token
    if (payload.tipo !== 'admin') {
      setError('Você não tem permissão para acessar esta área.')
      return
    }

    setLoading(false)
  }, [router])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{error}</div>


  return (
    <div className="flex flex-col justify-center text-center">
      <div>
        <h1 className="text-2xl p-4">Painel Administrativo</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-6 rounded mb-4"
        >
          Sair
        </button>
      </div>
      <Fornecedores />
    </div>
  );
}
