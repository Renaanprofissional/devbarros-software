import { getServerSession } from "@/lib/session";

export default async function Header() {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <header className="relative w-full h-20 flex items-center justify-between px-8 border-b border-white/10 bg-white/[0.02] backdrop-blur-2xl">

      {/* BACKGROUND LIGHT */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[250px] h-[250px] bg-blue-500/10 blur-[100px] left-[-80px] top-[-80px]" />
      </div>

      {/* ESQUERDA */}
      <div className="flex flex-col relative z-10">
        <h2 className="text-lg font-semibold tracking-tight text-white">
          Painel Administrativo
        </h2>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-zinc-500">
            Ambiente seguro
          </span>

          <span className="w-1 h-1 bg-zinc-600 rounded-full" />

          <span className="text-xs text-green-400">
            Sistema ativo
          </span>
        </div>
      </div>

      {/* DIREITA */}
      <div className="flex items-center gap-4 relative z-10">

        {/* USER CARD */}
        <div className="group flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300">

          {/* AVATAR */}
          <div className="relative">
            {user?.image ? (
              <img
                src={user.image}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-white/20 transition"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-semibold">
                {user?.name?.[0]}
              </div>
            )}

            {/* STATUS DOT */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#03050D] rounded-full" />
          </div>

          {/* INFO */}
          <div className="flex flex-col leading-tight">
            <span className="text-sm text-white font-medium">
              {user?.name}
            </span>

            <span className="text-xs text-zinc-500">
              Administrador
            </span>
          </div>

          {/* INDICADOR VISUAL */}
          <div className="ml-2 h-6 w-px bg-white/10 group-hover:bg-white/20 transition" />

          <div className="text-xs text-zinc-500 group-hover:text-white transition">
            Conta
          </div>

        </div>

      </div>
    </header>
  );
}