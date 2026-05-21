import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { chave } = body;

    if (!chave) {
      return NextResponse.json(
        {
          error: "Chave de acesso obrigatória",
        },
        {
          status: 400,
        }
      );
    }

    // REMOVE ESPAÇOS
    const cleanedKey = chave.replace(/\D/g, "");

    // VALIDAÇÃO
    if (cleanedKey.length !== 44) {
      return NextResponse.json(
        {
          error: "A chave deve conter 44 dígitos",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * SIMULAÇÃO
     *
     * Aqui depois você pode integrar:
     *
     * - Focus NFe
     * - PlugNotas
     * - NFE.io
     *
     */

    const fakeResponse = {
      status: "Autorizada",

      emitente: "Empresa Exemplo LTDA",

      destinatario: "Cliente Exemplo",

      valor: 2590.9,

      data: "20/05/2026",

      numero: "000123",

      chave: cleanedKey,

      produtos: [
        {
          nome: "Notebook Gamer",
          quantidade: 1,
          valor: 2590.9,
        },
      ],

      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    };

    return NextResponse.json(fakeResponse);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao consultar DANFE",
      },
      {
        status: 500,
      }
    );
  }
}