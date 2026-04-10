import { NextResponse } from "next/server";
import { db } from "../../../db/index";
import { cnpjTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

// ==============================
// 🔥 NORMALIZADOR (PADRÃO ÚNICO)
// ==============================
function normalizeCNPJ(data: any) {
  return {
    cnpj: data.cnpj,

    razao_social: data.razao_social || data.razaoSocial,
    nome_fantasia: data.nome_fantasia || data.nomeFantasia,

    cep: data.cep,
    uf: data.uf,
    municipio: data.municipio || data.cidade,
    bairro: data.bairro,
    logradouro: data.logradouro,

    descricao_situacao_cadastral:
      data.descricao_situacao_cadastral || data.situacao,

    cnae_fiscal_descricao:
      data.cnae_fiscal_descricao || data.cnae,

    // 🔥 agora funcionando com banco + API
    data_inicio_atividade:
      data.data_inicio_atividade ||
      data.dataInicioAtividade ||
      null,
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let cnpj = searchParams.get("cnpj");

    // ============================
    // 🔴 VALIDAÇÃO
    // ============================
    if (!cnpj) {
      return NextResponse.json(
        { error: "CNPJ obrigatório" },
        { status: 400 }
      );
    }

    cnpj = cnpj.replace(/\D/g, "");

    if (cnpj.length !== 14) {
      return NextResponse.json(
        { error: "CNPJ inválido" },
        { status: 400 }
      );
    }

    // ============================
    // 🔥 1. CACHE (BANCO)
    // ============================
    const existing = await db
      .select()
      .from(cnpjTable)
      .where(eq(cnpjTable.cnpj, cnpj));

    if (existing.length > 0) {
      console.log("✅ CACHE HIT");

      const normalized = normalizeCNPJ(existing[0]);

      return NextResponse.json(normalized);
    }

    // ============================
    // 🔥 2. API EXTERNA
    // ============================
    console.log("🌐 BUSCANDO NA API EXTERNA...");

    const res = await fetch(
      `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const text = await res.text();

      console.log("❌ ERRO BRASILAPI:");
      console.log("STATUS:", res.status);
      console.log("RESPONSE:", text);

      return NextResponse.json(
        {
          error: "Erro ao consultar CNPJ",
          status: res.status,
        },
        { status: res.status }
      );
    }

    const data = await res.json();

    // ============================
    // 🔥 3. SALVAR NO BANCO
    // ============================
    try {
      await db.insert(cnpjTable).values({
        id: crypto.randomUUID(),

        cnpj,

        razaoSocial: data.razao_social,
        nomeFantasia: data.nome_fantasia,

        cep: data.cep,
        uf: data.uf,
        cidade: data.municipio,
        bairro: data.bairro,
        logradouro: data.logradouro,

        situacao: data.descricao_situacao_cadastral,
        cnae: data.cnae_fiscal_descricao,

        // 🔥 AGORA SIM SALVANDO CERTO
        dataInicioAtividade: data.data_inicio_atividade,

        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log("💾 SALVO NO BANCO");
    } catch (dbError) {
      console.log("⚠️ ERRO AO SALVAR (IGNORADO):", dbError);
    }

    // ============================
    // 🔥 4. RETORNO PADRONIZADO
    // ============================
    const normalized = normalizeCNPJ(data);

    return NextResponse.json(normalized);

  } catch (error) {
    console.error("🔥 ERRO GERAL:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
