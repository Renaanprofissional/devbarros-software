"use client";

import { useState } from "react";

import {
  Search,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type DanfeResponse = {
  status: string;

  emitente: string;

  destinatario: string;

  valor: number;

  data: string;

  numero: string;

  chave: string;

  produtos: {
    nome: string;
    quantidade: number;
    valor: number;
  }[];

  pdfUrl: string;
};

export default function DanfePage() {
  const [chave, setChave] = useState("");

  const [loading, setLoading] = useState(false);

  const [data, setData] =
    useState<DanfeResponse | null>(null);

  const [error, setError] = useState("");

  async function buscarDanfe() {
    try {
      setLoading(true);

      setError("");

      setData(null);

      const response = await fetch("/api/danfe", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          chave,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div className="min-h-screen bg-transparent text-white p-6 lg:p-10">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* HEADER */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            <FileText className="h-4 w-4" />

            Consulta Fiscal
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Consulta de
            <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}
              DANFE
            </span>
          </h1>

          <p className="mt-4 text-zinc-400 max-w-2xl">
            Consulte notas fiscais pela chave de
            acesso e baixe o PDF da DANFE em tempo
            real.
          </p>
        </div>

        {/* INPUT */}
        <div className="rounded-[32px] border border-white/10 bg-white/0.03 p-6 backdrop-blur-2xl">
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex-1">
              <label className="mb-3 block text-sm font-medium text-zinc-400">
                Chave de acesso da NF-e
              </label>

              <input
                type="text"
                placeholder="Digite os 44 dígitos da chave"
                value={chave}
                onChange={(e) =>
                  setChave(e.target.value)
                }
                className="h-14 w-full rounded-2xl border border-white/10 bg-[#0B1220] px-5 text-white outline-none transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              onClick={buscarDanfe}
              disabled={loading}
              className="h-14 rounded-2xl bg-linear-to-r from-blue-500 to-emerald-500 px-8 font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <div className="flex justify-center items-center gap-2">
                <Search className="h-5 w-5" />

                {loading
                  ? "Consultando..."
                  : "Buscar Nota"}
              </div>
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-400">
            <AlertCircle className="h-5 w-5" />

            <p>{error}</p>
          </div>
        )}

        {/* RESULTADO */}
        {data && (
          <div className="mt-8 overflow-hidden rounded-[32px] border border-emerald-500/20 bg-[#081121]/95 shadow-[0_0_80px_rgba(34,197,94,0.08)]">
            {/* TOP */}
            <div className="border-b border-white/5 p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />

                    {data.status}
                  </div>

                  <h2 className="text-3xl font-black">
                    Nota Fiscal Encontrada
                  </h2>

                  <p className="mt-2 text-zinc-400">
                    Chave: {data.chave}
                  </p>
                </div>

                <a
                  href={data.pdfUrl}
                  target="_blank"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-500 to-green-500 px-6 font-semibold text-white transition-all hover:scale-[1.02]"
                >
                  <Download className="h-5 w-5" />

                  Baixar PDF
                </a>
              </div>
            </div>

            {/* INFOS */}
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 xl:grid-cols-4">
              <InfoCard
                label="Emitente"
                value={data.emitente}
              />

              <InfoCard
                label="Destinatário"
                value={data.destinatario}
              />

              <InfoCard
                label="Valor Total"
                value={formatCurrency(
                  data.valor
                )}
              />

              <InfoCard
                label="Data de Emissão"
                value={data.data}
              />
            </div>

            {/* PRODUTOS */}
            <div className="border-t border-white/5 p-6">
              <h3 className="mb-5 text-xl font-bold">
                Produtos
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-sm text-zinc-400">
                      <th className="pb-4">
                        Produto
                      </th>

                      <th className="pb-4">
                        Quantidade
                      </th>

                      <th className="pb-4">
                        Valor
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.produtos.map(
                      (produto, index) => (
                        <tr
                          key={index}
                          className="border-b border-white/5"
                        >
                          <td className="py-4">
                            {produto.nome}
                          </td>

                          <td className="py-4 text-zinc-400">
                            {
                              produto.quantidade
                            }
                          </td>

                          <td className="py-4 font-semibold text-emerald-400">
                            {formatCurrency(
                              produto.valor
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/0.03 p-5">
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-white">
        {value}
      </h3>
    </div>
  );
}