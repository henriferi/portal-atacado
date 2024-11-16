'use client'

import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação simples dos campos
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.')
      return
    }

    // Chamar API para autenticar usuário
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    })

    const data = await res.json()

    if (res.ok) {

      localStorage.setItem('token', data.token)

      
      // Redirecionar para a página do usuário ou admin com base no tipo
      window.location.href = data.tipo === 'admin' ? '/admin' : '/usuario'
    } else {
      setErro(data.mensagem || 'Erro ao fazer login.')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {erro && <div className="text-red-500 mb-4">{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="senha" className="block text-sm font-semibold text-gray-700">Senha</label>
            <input
              type="password"
              id="senha"
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
