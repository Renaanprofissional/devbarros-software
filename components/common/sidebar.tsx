"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, LogOut } from "lucide-react";
import { logout } from "../../actions/logout";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Início", icon: Home },
    { href: "/dashboard/xml", label: "XML", icon: Layers },
    { href: "/dashboard/nf", label: "Notas Fiscais", icon: Layers },
    { href: "/dashboard/cnpj", label: "Consultar CNPJ", icon: Layers },
    { href: "/dashboard/cotacoes", label: "Cotações", icon: Layers },
    // { href: "/dashboard/settings", label: "Configurações", icon: Settings },
  ];

  return (
    <aside className="min-w-[260px] h-screen flex flex-col px-6 py-8 backdrop-blur-2xl border-r border-white/10">

      {/* LOGO */}
      <div className="mb-10">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          DevBarros{" "}
          <span className="bg-linear-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            System
          </span>
        </h1>

        <p className="text-xs text-zinc-500 mt-1">
          Painel administrativo
        </p>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-2">

        {links.map((item, i) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={i}
              href={item.href}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300
              
              ${isActive
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
                }`}
            >
              {/* glow ativo */}
              {isActive && (
                <div className="absolute inset-0 rounded-lg bg-linear-to-r from-blue-500/10 to-purple-500/10" />
              )}

              {/* ICON */}
              <Icon
                size={18}
                className={`relative z-10 ${isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-white"
                  }`}
              />

              {/* LABEL */}
              <span className="relative z-10">{item.label}</span>

              {/* ACTIVE BAR */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] bg-linear-to-b from-blue-500 to-purple-500 rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* DIVIDER */}
      <div className="my-8 h-px bg-white/10" />

      {/* EXTRA (futuro) 
      <div className="text-xs text-zinc-500 mb-4">
        Sistema
      </div>

       
      <nav className="flex flex-col gap-2">
        <button className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-500 hover:text-white hover:bg-white/[0.04] rounded-lg transition">
          <Settings size={18} />
          Configurações
        </button>
      </nav>
      */}

      {/* LOGOUT */}
      <form action={logout} className="mt-auto">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all">
          <LogOut size={18} />
          Sair da conta
        </button>
      </form>

    </aside>
  );
}