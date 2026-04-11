"use client";

import { useEffect, useState } from "react";

export default function CotacoesPage() {
  const [data, setData] = useState<any>(null);

  const moedas = [
    { key: "USDBRL", name: "Dólar", symbol: "US$" },
    { key: "EURBRL", name: "Euro", symbol: "€" },
    { key: "GBPBRL", name: "Libra", symbol: "£" },
    { key: "BTCBRL", name: "Bitcoin", symbol: "₿" },
    { key: "ETHBRL", name: "Ethereum", symbol: "Ξ" },
  ];

  async function fetchCotacoes() {
    const pairs = moedas.map(m => m.key.replace("BRL", "-BRL")).join(",");

    const res = await fetch(
      `https://economia.awesomeapi.com.br/json/last/${pairs}`
    );
    const json = await res.json();

    setData(json);
  }

  useEffect(() => {
    fetchCotacoes();

    const interval = setInterval(fetchCotacoes, 10000);

    return () => clearInterval(interval);
  }, []);

  function formatBRL(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatNumber(value: number) {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    });
  }

  if (!data) return <p className="p-6 text-white">Carregando cotações...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Cotações em Tempo Real
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {moedas.map((moeda) => {
          const item = data[moeda.key];

          return (
            <Card
              key={moeda.key}
              title={moeda.name}
              symbol={moeda.symbol}
              bid={Number(item?.bid)}
            />
          );
        })}
      </div>
    </div>
  );
}

function Card({ title, symbol, bid }: any) {
  function formatBRL(value: number) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatNumber(value: number) {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    });
  }

  const brlToCurrency = 1 / bid;

  return (
    <div className="bg-[#111827] p-4 rounded-xl border border-white/10 hover:border-blue-500/40 transition">
      
      <p className="text-gray-400 text-sm">{title}</p>

      {/* Valor em Real */}
      <p className="text-xl font-semibold">
        {formatBRL(bid)}
      </p>

      {/* Moeda → BRL */}
      <p className="text-gray-500 text-sm mt-1">
        1 {symbol} = {formatBRL(bid)}
      </p>

      {/* BRL → Moeda */}
      <p className="text-gray-500 text-sm">
        1 BRL = {formatNumber(brlToCurrency)} {symbol}
      </p>

    </div>
  );
}
