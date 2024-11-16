import prisma from '../../../lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req) {
  const { email, senha } = await req.json()

  // Verificar se o usuário existe
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  })

  if (!usuario) {
    return new Response(
      JSON.stringify({ mensagem: 'Usuário ou senha inválidos.' }),
      { status: 401 }
    )
  }

  // Verificar a senha
  const senhaValida = await bcrypt.compare(senha, usuario.senha)

  if (!senhaValida) {
    return new Response(
      JSON.stringify({ mensagem: 'Usuário ou senha inválidos.' }),
      { status: 401 }
    )
  }

  // Gerar o token JWT
  const token = jwt.sign(
    { id: usuario.id, tipo: usuario.tipo },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return new Response(
    JSON.stringify({ tipo: usuario.tipo, token }),
    { status: 200 }
  )
}
