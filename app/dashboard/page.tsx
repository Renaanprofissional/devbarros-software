"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { allowedEmails } from "../../lib/allowed-users";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (!session?.user?.email || !allowedEmails.includes(session.user.email)) {
        router.push("/authentication");
      }
    }
  }, [session, isPending, router]);

  if (isPending) return <p>Carregando...</p>;
  if (!session?.user) return <p>Redirecionando...</p>;

  const systems = [
    { title: "Gerenciador de XML", desc: "Conversão e processamento de arquivos NF-e", href: "/dashboard/xml" },
    { title: "Gerenciador de Notas Fiscais", desc: "Mover nfs para próxima fatura", href: "/dashboard/nf" },
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