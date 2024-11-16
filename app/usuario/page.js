'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const UsuarioPage = () => {
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

    // Verificar se o token é válido e se o usuário é do tipo comum
    const payload = JSON.parse(atob(token.split('.')[1])) // Decodificar o token
    if (payload.tipo !== 'usuario') {
      setError('Você não tem permissão para acessar esta área.')
      return
    }

    setLoading(false)
  }, [router])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h1>Área do Usuário</h1>
      <p>Bem-vindo à área do usuário comum.</p>
    </div>
  )
}

export default UsuarioPage
