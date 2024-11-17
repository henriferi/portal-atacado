
import prisma from '@/lib/prisma';

export async function GET({ params }) {
  const { id } = params;
  const fornecedor = await prisma.fornecedor.findUnique({
    where: { id: parseInt(id) },
  });
  if (!fornecedor) {
    return new Response("Fornecedor não encontrado", { status: 404 });
  }
  return new Response(JSON.stringify(fornecedor), { status: 200 });
}



export async function PUT({ params, request }) {
  const { id } = params || {}; // Garantir que 'params' não seja undefined

  if (!id) {
    return new Response(
      JSON.stringify({ error: "ID do fornecedor não encontrado" }),
      { status: 400 }
    );
  }

  try {
    const { nome, formaPagamento, entregaBrasil, whatsappLink, instagramLink } = await request.json();

    // Atualizando fornecedor no banco de dados
    const fornecedor = await prisma.fornecedor.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        formaPagamento,
        entregaBrasil,
        whatsappLink,
        instagramLink,
      },
    });

    return new Response(JSON.stringify(fornecedor), { status: 200 });
  } catch (err) {
    console.error("Erro ao atualizar fornecedor:", err);
    return new Response(
      JSON.stringify({ error: "Falha ao atualizar fornecedor", details: err.message }),
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  try {
    // Certifique-se de que o `id` está presente nos `params`
    if (!params || !params.id) {
      return new Response(
        JSON.stringify({ error: "ID do fornecedor não fornecido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const id = parseInt(params.id); // Converta o ID para número
    if (isNaN(id)) {
      return new Response(
        JSON.stringify({ error: "ID inválido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Exclua o fornecedor no banco de dados
    await prisma.fornecedor.delete({
      where: { id },
    });

    // Responda com `204 No Content` sem corpo
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Erro ao excluir fornecedor:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno ao excluir fornecedor." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}



