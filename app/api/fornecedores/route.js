// /api/fornecedores/route.js

import { prisma } from "@/lib/prisma";  // Ajuste conforme a configuração do prisma

export async function GET() {
  const fornecedores = await prisma.fornecedor.findMany();
  return new Response(JSON.stringify(fornecedores), { status: 200 });
}

export async function POST(request) {
  const { nome, formaPagamento, entregaBrasil, whatsappLink, instagramLink } = await request.json();
  const fornecedor = await prisma.fornecedor.create({
    data: { nome, formaPagamento, entregaBrasil, whatsappLink, instagramLink },
  });
  return new Response(JSON.stringify(fornecedor), { status: 201 });
}
