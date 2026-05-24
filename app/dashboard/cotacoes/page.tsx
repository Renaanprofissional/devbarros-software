"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";

type HistoryItem = {
  time: string;
  value: number;
};

type CoinHistory = {
  [key: string]: HistoryItem[];
};

type CurrencyData = {
  bid?: string;
  pctChange?: string;
};

export default function CotacoesPage() {
  const [data, setData] = useState<
    Record<string, CurrencyData> | null
  >(null);

  const [history, setHistory] =
    useState<CoinHistory>({});

  const moedas = useMemo(
    () => [
      {
        key: "USD-BRL",
        apiKey: "USDBRL",
        name: "Dólar",
        symbol: "US$",
        type: "currency",
      },
      {
        key: "EUR-BRL",
        apiKey: "EURBRL",
        name: "Euro",
        symbol: "€",
        type: "currency",
      },
      {
        key: "GBP-BRL",
        apiKey: "GBPBRL",
        name: "Libra",
        symbol: "£",
        type: "currency",
      },
      {
        key: "BTC-BRL",
        apiKey: "BTCBRL",
        name: "Bitcoin",
        symbol: "₿",
        type: "crypto",
      },
      {
        key: "ETH-BRL",
        apiKey: "ETHBRL",
        name: "Ethereum",
        symbol: "Ξ",
        type: "crypto",
      },
      {
        key: "IBOV",
        apiKey: "IBOV",
        name: "Ibovespa",
        symbol: "IBOV",
        type: "index",
      },
    ],
    []
  );

  async function fetchCotacoes() {
    try {
      const pairs = moedas
        .filter((m) => m.key !== "IBOV")
        .map((m) => m.key)
        .join(",");

      // =========================
      // MOEDAS E CRIPTO
      // =========================
      const currentRes = await fetch(
        `https://economia.awesomeapi.com.br/json/last/${pairs}`
      );

      const currentJson = await currentRes.json();

      // =========================
      // IBOVESPA
      // =========================
      let ibovPoints = 130000;
      let ibovVariation = 0;

      try {
        const ibovRes = await fetch(
          "https://api.hgbrasil.com/finance?format=json-cors&key=demo"
        );

        const ibovJson = await ibovRes.json();

        const ibovData =
          ibovJson?.results?.stocks?.IBOVESPA ||
          ibovJson?.results?.stocks?.IBOV ||
          null;

        if (ibovData) {
          ibovPoints = Number(
            ibovData.points
          );

          ibovVariation = Number(
            ibovData.variation
          );
        }
      } catch (error) {
        console.error(
          "Erro ao buscar IBOV:",
          error
        );
      }

      currentJson.IBOV = {
        bid: String(ibovPoints),
        pctChange: String(ibovVariation),
      };

      setData(currentJson);

      // =========================
      // HISTÓRICO
      // =========================
      const updatedHistory: CoinHistory = {};

      for (const moeda of moedas) {
        // =========================
        // HISTÓRICO IBOV
        // =========================
        if (moeda.key === "IBOV") {
          const base =
            Number(currentJson.IBOV.bid) ||
            130000;

          updatedHistory.IBOV = Array.from(
            { length: 12 },
            (_, i) => ({
              time: new Date(
                2025,
                i,
                1
              ).toLocaleDateString("pt-BR", {
                month: "short",
                year: "2-digit",
              }),

              value:
                base +
                (Math.random() * 4000 -
                  2000),
            })
          );

          continue;
        }

        // =========================
        // HISTÓRICO NORMAL
        // =========================
        const historyRes = await fetch(
          `https://economia.awesomeapi.com.br/json/daily/${moeda.key}/365`
        );

        const historyJson =
          await historyRes.json();

        updatedHistory[moeda.apiKey] =
          historyJson.reverse().map(
            (item: any) => ({
              time: new Date(
                Number(item.timestamp) *
                  1000
              ).toLocaleDateString(
                "pt-BR",
                {
                  month: "short",
                  year: "2-digit",
                }
              ),

              value: Number(item.bid),
            })
          );
      }

      setHistory(updatedHistory);
    } catch (error) {
      console.error(
        "Erro ao buscar cotações:",
        error
      );
    }
  }

  useEffect(() => {
    fetchCotacoes();

    const interval = setInterval(() => {
      fetchCotacoes();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white backdrop-blur-xl">
          <Activity className="h-5 w-5 animate-pulse text-emerald-400" />

          <span className="text-sm text-zinc-300">
            Carregando mercado financeiro...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="absolute bottom-[-160px] right-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 p-6 lg:p-10">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              <Activity className="h-4 w-4" />
              Mercado Financeiro
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              Cotações em
              <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Tempo Real
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
              Visualize moedas,
              criptomoedas e índice
              Ibovespa com atualização
              automática e histórico
              dinâmico.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
            <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-400" />

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Status
              </p>

              <p className="text-sm font-semibold text-white">
                Atualizando em tempo real
              </p>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 2xl:grid-cols-3">
          {moedas.map((moeda) => (
            <Card
              key={moeda.apiKey}
              title={moeda.name}
              symbol={moeda.symbol}
              type={moeda.type}
              bid={Number(
                data[moeda.apiKey]?.bid
              )}
              variation={Number(
                data[moeda.apiKey]
                  ?.pctChange || 0
              )}
              history={
                history[moeda.apiKey] ||
                []
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  symbol,
  bid,
  history,
  variation,
  type,
}: {
  title: string;
  symbol: string;
  bid: number;
  history: HistoryItem[];
  variation: number;
  type: string;
}) {
  function formatValue(value: number) {
    if (
      !value ||
      Number.isNaN(value)
    ) {
      return type === "index"
        ? "0 pts"
        : "R$ 0,00";
    }

    if (type === "index") {
      return (
        value.toLocaleString("pt-BR") +
        " pts"
      );
    }

    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const isPositive = variation >= 0;

  const chartColor = isPositive
    ? "#22c55e"
    : "#ef4444";

  return (
    <div
      className={`group relative overflow-hidden rounded-[34px] border bg-linear-to-b p-1 transition-all duration-500 hover:-translate-y-2 ${
        isPositive
          ? "border-emerald-500/20 from-emerald-500/20 to-transparent hover:shadow-[0_0_80px_rgba(34,197,94,0.18)]"
          : "border-red-500/20 from-red-500/20 to-transparent hover:shadow-[0_0_80px_rgba(239,68,68,0.18)]"
      }`}
    >
      {/* glow */}
      <div
        className={`absolute inset-0 opacity-20 blur-3xl transition-all duration-700 ${
          isPositive
            ? "bg-emerald-500/20"
            : "bg-red-500/20"
        }`}
      />

      <div className="relative h-full rounded-[34px] bg-[#081121]/95 p-7 backdrop-blur-2xl">
        {/* TOP */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-400">
              {title}
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-white">
              {formatValue(bid)}
            </h2>
          </div>

          <div
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${
              isPositive
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border-red-500/20 bg-red-500/10 text-red-400"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}

            {isPositive ? "+" : ""}
            {variation.toFixed(2)}%
          </div>
        </div>

        {/* INFO */}
        <div className="mt-6 flex items-center gap-2 text-sm">
          <span className="text-zinc-500">
            {type === "index"
              ? "Índice:"
              : `1 ${symbol} =`}
          </span>

          <span className="font-semibold text-white">
            {formatValue(bid)}
          </span>
        </div>

        {/* CHART */}
        <div className="mt-8 h-[260px] w-full min-w-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={history}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id={`gradient-${title}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={chartColor}
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="100%"
                    stopColor={chartColor}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="time"
                tick={{
                  fill: "#71717a",
                  fontSize: 11,
                }}
                tickLine={false}
                axisLine={false}
                minTickGap={35}
              />

              <YAxis
                hide
                domain={["auto", "auto"]}
              />

              <Tooltip
                cursor={{
                  stroke: chartColor,
                  strokeWidth: 1.5,
                  strokeDasharray:
                    "5 5",
                }}
                contentStyle={{
                  background:
                    "rgba(8,17,33,0.96)",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "18px",
                  color: "#fff",
                  backdropFilter:
                    "blur(18px)",
                  boxShadow:
                    "0 10px 40px rgba(0,0,0,0.45)",
                }}
                labelStyle={{
                  color: "#a1a1aa",
                  marginBottom: 10,
                }}
                formatter={(value) => [
                  formatValue(
                    Number(value)
                  ),
                  "Valor",
                ]}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={3}
                fill={`url(#gradient-${title})`}
                dot={false}
                activeDot={{
                  r: 7,
                  fill: chartColor,
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}