'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const router = useRouter()

  const handleLogout = () => {
    // Remover o token do LocalStorage
    localStorage.removeItem('token')

    // Redirecionar para a página de login
    router.push('/login')
  }

  return (
    <div>
      <button onClick={handleLogout} className="bg-zinc-700 py-1 px-6 rounded-md">SAIR</button>
    </div>
  )
}

const AdminPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login') // Redirecionar para login se não houver token
      return
    }

    // Verificar se o token é válido e se o usuário é admin
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
    <div>
      <h1>Área Administrativa</h1>
      <p>Bem-vindo à área exclusiva do administrador.</p>
      <Logout /> {/* Botão de Logout */}
    </div>
  )
}

export default AdminPage
