"use client";

import Link from "next/link";
import { useSession } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Lista de emails permitidos, tirando espaços extras
  const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS
    ?.split(",")
    .map(e => e.trim()) || [];

  // Redirecionamento seguro usando useEffect
  useEffect(() => {
    if (!isPending && (!session?.user || !allowedEmails.includes(session.user.email || ""))) {
      router.push("/authentication"); // redireciona se não autorizado
    }
  }, [isPending, session, router, allowedEmails]);

  // Mostrar loading enquanto a sessão carrega
  if (isPending) return <p>Carregando...</p>;

  // Caso não tenha sessão ou não seja permitido, mostra mensagem enquanto redireciona
  if (!session?.user || !allowedEmails.includes(session.user.email || "")) {
    return <p>Redirecionando...</p>;
  }

  // Sistemas disponíveis no dashboard
  const systems = [
    { title: "Gerenciador de XML", desc: "Conversão e processamento de arquivos NF-e", href: "/dashboard/xml" },
    { title: "Gerenciador de Notas Fiscais", desc: "Mover NFs para próxima fatura", href: "/dashboard/nf" },
    { title: "Consulta de CNPJ", desc: "Busque dados completos de empresas", href: "/dashboard/cnpj" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {systems.map((s, i) => (
        <Link
          key={i}
          href={s.href}
          className="group bg-[#11161D] border border-white/5 hover:border-blue-500/50 rounded-xl p-6 shadow-lg shadow-black/40 hover:shadow-blue-500/10 transition-all duration-300"
        >
          <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-blue-400">{s.title}</h3>
          <p className="text-zinc-400 text-sm">{s.desc}</p>
        </Link>
      ))}
    </div>
  );
}