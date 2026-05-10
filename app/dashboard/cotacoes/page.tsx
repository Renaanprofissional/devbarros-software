"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";

type HistoryItem = {
  time: string;
  value: number;
};

type CoinHistory = {
  [key: string]: HistoryItem[];
};

type CurrencyData = {
  bid: string;
  pctChange?: string;
};

export default function CotacoesPage() {
  const [data, setData] = useState<Record<string, CurrencyData> | null>(null);

  const [history, setHistory] = useState<CoinHistory>({});

  const moedas = useMemo(
    () => [
      {
        key: "USD-BRL",
        apiKey: "USDBRL",
        name: "Dólar",
        symbol: "US$",
      },
      {
        key: "EUR-BRL",
        apiKey: "EURBRL",
        name: "Euro",
        symbol: "€",
      },
      {
        key: "GBP-BRL",
        apiKey: "GBPBRL",
        name: "Libra",
        symbol: "£",
      },
      {
        key: "BTC-BRL",
        apiKey: "BTCBRL",
        name: "Bitcoin",
        symbol: "₿",
      },
      {
        key: "ETH-BRL",
        apiKey: "ETHBRL",
        name: "Ethereum",
        symbol: "Ξ",
      },
    ],
    []
  );

  async function fetchCotacoes() {
    try {
      const pairs = moedas.map((m) => m.key).join(",");

      // PREÇOS ATUAIS
      const currentRes = await fetch(
        `https://economia.awesomeapi.com.br/json/last/${pairs}`
      );

      const currentJson = await currentRes.json();

      setData(currentJson);

      // HISTÓRICO 5 ANOS
      const updatedHistory: CoinHistory = {};

      for (const moeda of moedas) {
        const historyRes = await fetch(
          `https://economia.awesomeapi.com.br/json/daily/${moeda.key}/1825`
        );

        const historyJson = await historyRes.json();

        updatedHistory[moeda.apiKey] = historyJson
          .reverse()
          .map((item: any) => ({
            time: new Date(
              Number(item.timestamp) * 1000
            ).toLocaleDateString("pt-BR", {
              month: "short",
              year: "2-digit",
            }),

            value: Number(item.bid),
          }));
      }

      setHistory(updatedHistory);
    } catch (error) {
      console.error("Erro ao buscar cotações:", error);
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
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">
        <div className="animate-pulse text-lg">
          Carregando cotações...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6">
      {/* HEADER */}
      <div className="mb-10">
        <p className="text-blue-400 text-sm uppercase tracking-[0.25em]">
          Mercado Financeiro
        </p>

        <h1 className="text-5xl font-black mt-3 tracking-tight">
          Cotações em Tempo Real
        </h1>

        <p className="text-gray-400 mt-3 text-sm">
          Histórico dos últimos 5 anos
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {moedas.map((moeda) => (
          <Card
            key={moeda.apiKey}
            title={moeda.name}
            symbol={moeda.symbol}
            bid={Number(data[moeda.apiKey]?.bid)}
            variation={Number(data[moeda.apiKey]?.pctChange || 0)}
            history={history[moeda.apiKey] || []}
          />
        ))}
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
}: {
  title: string;
  symbol: string;
  bid: number;
  history: HistoryItem[];
  variation: number;
}) {
  function formatBRL(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const isPositive = variation >= 0;

  const lastValue = history[history.length - 1]?.value || 0;

  const firstValue = history[0]?.value || 0;

  const trendUp = lastValue >= firstValue;

  return (
    <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1220] p-6 shadow-[0_0_60px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
      {/* GLOW */}
      <div
        className={`absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-20 transition-all duration-500 ${
          trendUp ? "bg-emerald-500" : "bg-red-500"
        }`}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-linear-to-b to-transparent" />

      <div className="relative z-10">
        {/* TOP */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight">
              {formatBRL(bid)}
            </h2>
          </div>

          <div
            className={`rounded-full px-3 py-1 text-xs font-bold backdrop-blur-xl ${
              isPositive
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/15 text-red-400 border border-red-500/20"
            }`}
          >
            {isPositive ? "+" : ""}
            {variation.toFixed(2)}%
          </div>
        </div>

        {/* INFO */}
        <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
          <span>
            1 {symbol} =
          </span>

          <span className="font-semibold text-white">
            {formatBRL(bid)}
          </span>
        </div>

        {/* GRÁFICO */}
        <div className="mt-8 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
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
                    stopColor={trendUp ? "#22c55e" : "#ef4444"}
                    stopOpacity={0.5}
                  />

                  <stop
                    offset="100%"
                    stopColor={trendUp ? "#22c55e" : "#ef4444"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="rgba(255,255,255,0.04)"
                vertical={false}
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="time"
                tick={{
                  fill: "#6b7280",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
                minTickGap={35}
              />

              <YAxis
                hide
                domain={["auto", "auto"]}
              />

              <Tooltip
                cursor={{
                  stroke: trendUp ? "#22c55e" : "#ef4444",
                  strokeWidth: 1,
                  strokeDasharray: "5 5",
                }}
                contentStyle={{
                  background: "rgba(17,24,39,0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "18px",
                  color: "#fff",
                  backdropFilter: "blur(12px)",
                }}
                labelStyle={{
                  color: "#9ca3af",
                  marginBottom: 8,
                }}
                formatter={(value) => [
                  formatBRL(Number(value)),
                  "Valor",
                ]}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke={trendUp ? "#22c55e" : "#ef4444"}
                strokeWidth={3}
                fill={`url(#gradient-${title})`}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke={trendUp ? "#22c55e" : "#ef4444"}
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 7,
                  fill: trendUp ? "#22c55e" : "#ef4444",
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