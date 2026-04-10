"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { ExternalLink, Loader2, Search } from "lucide-react";

export default function CNPJPage() {
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!cnpj) return;

    setLoading(true);
    setData(null);
    setError("");

    try {
      const res = await fetch(`/api/cnpj?cnpj=${cnpj}`);
      const json = await res.json();

      // 🔥 TRATAMENTO CORRETO DE ERRO
      if (!res.ok) {
        setError(json.error || "Erro ao buscar CNPJ");
        return;
      }

      console.log("DATA:", json); // debug
      setData(json);
    } catch (err) {
      setError("Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-10 ">
      {/* CARD PRINCIPAL */}
      <div className="w-[700px] bg-linear-to-br from-[#0D1117] to-[#111827] p-6 rounded-2xl border border-white/10 text-white shadow-xl">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-white/10 rounded-lg">
            <Search size={18} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Consulta de CNPJ
          </h1>
        </div>

        {/* INPUT */}
        <input
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="Digite o CNPJ..."
          className="w-full p-3 rounded-lg bg-black/40 border border-white/10 mb-4 outline-none focus:border-white/30 transition"
        />

        {/* BOTÃO */}
        <Button
          onClick={handleSearch}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 transition font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Buscando...
            </>
          ) : (
            <>
              <Search size={18} />
              Consultar
            </>
          )}
        </Button>

        {/* ERRO */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* RESULTADO */}
        {data && (
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="col-span-2 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400">Empresa</p>
              <p className="font-semibold">{data.razao_social}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400">Nome Fantasia</p>
              <p>{data.nome_fantasia || "-"}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400">CNPJ</p>
              <p>{data.cnpj}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400">Situação</p>
              <p>{data.descricao_situacao_cadastral}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400">Abertura</p>
              <p>{data.data_inicio_atividade || "-"}</p>
            </div>

            <div className="col-span-2 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400">CNAE</p>
              <p>{data.cnae_fiscal_descricao}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400">CEP</p>
              <p>{data.cep}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400">UF</p>
              <p>{data.uf}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400">Cidade</p>
              <p>{data.municipio}</p>
            </div>

            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400">Bairro</p>
              <p>{data.bairro}</p>
            </div>

            <div className="col-span-2 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400">Logradouro</p>
              <p>{data.logradouro}</p>
            </div>
          </div>
        )}
      </div>

      {/* CARD SECUNDÁRIO (LINK) */}
      <div className="w-[700px] bg-linear-to-br from-[#0D1117] to-[#111827] p-6 rounded-2xl border border-white/10 text-white shadow-xl">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/10 rounded-lg">
            <ExternalLink size={18} />
          </div>
          <h2 className="text-lg font-semibold">Acesso externo</h2>
        </div>

        {/* INSTRUÇÃO */}
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-4 text-sm text-yellow-300">
          ⚠️ Para funcionar corretamente, abra o link em uma aba anônima.
        </div>

        {/* LINK + COPY */}
        <div className="flex items-center gap-2">
          <input
            value={`https://seusite.com/consulta?cnpj=${cnpj}`}
            readOnly
            className="flex-1 p-3 rounded-lg bg-black/40 border border-white/10 text-gray-300"
          />

          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `https://seusite.com/consulta?cnpj=${cnpj}`,
              );
            }}
            className="px-4 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Copiar
          </button>
        </div>

        {/* HINT */}
        <p className="text-xs text-gray-500 mt-3">
          Use este link para compartilhar ou abrir a consulta isoladamente.
        </p>
      </div>
    </div>
  );
}
