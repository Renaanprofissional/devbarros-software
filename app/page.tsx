import Link from "next/link";
import { Button } from "../components/ui/button";
import { getServerSession } from "@/lib/session";
import { logout } from "@/actions/logout";
import { allowedEmails } from "@/lib/allowed-users";

export default async function Home() {
  const session = await getServerSession();
  const user = session?.user ?? null;

  const hasAccess = user && allowedEmails.includes(user.email ?? "");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#03050D] text-white">

      {/* ===============================
          BACKGROUND VIDEO + FX
      ================================= */}
      <div className="absolute inset-0 ">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 scale-110"
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>

        {/* Gradiente profundo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#03050D]/95 via-[#03050D]/80 to-black" />

        {/* Glow */}
        <div className="absolute w-[600px] h-[600px] bg-blue-600/20 blur-[140px] top-[-150px] left-[-150px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[140px] bottom-[-120px] right-[-120px]" />

        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* ===============================
          CARD CENTRAL
      ================================= */}
      <div className="relative z-10 w-full max-w-xl px-6">

        <div className="bg-white/[0.04] backdrop-blur-3xl border border-white/10 rounded-2xl p-10 shadow-[0_50px_120px_-20px_rgba(0,0,0,0.9)] transition-all duration-500 hover:border-white/20">

          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-semibold tracking-tight">
              DevBarros{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                System
              </span>
            </h1>

            <p className="text-zinc-400 text-sm mt-3">
              Plataforma segura para gerenciamento e acesso ao painel
            </p>
          </div>

          {/* =============================
              NÃO LOGADO
          ============================== */}
          {!user && (
            <div className="flex justify-center">
              <Link href="/authentication">
                <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-5 text-sm rounded-lg transition-all hover:scale-[1.03] active:scale-[0.97]">
                  Acessar sistema
                </Button>
              </Link>
            </div>
          )}

          {/* =============================
              LOGADO
          ============================== */}
          {user && (
            <div className="text-center">

              <p className="text-lg mb-6 text-zinc-300">
                Bem-vindo,{" "}
                <span className="font-semibold text-blue-400">
                  {user.name}
                </span>
              </p>

              <div className="flex flex-col items-center gap-4">

                {/* =============================
                    ACESSO LIBERADO
                ============================== */}
                {hasAccess && (
                  <Link href="/dashboard">
                    <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-5 rounded-lg transition-all hover:scale-[1.03] active:scale-[0.97]">
                      Entrar no painel
                    </Button>
                  </Link>
                )}

                {/* =============================
                    SEM ACESSO
                ============================== */}
                {!hasAccess && (
                  <div className="w-full text-center text-sm bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
                    Seu usuário não possui permissão para acessar o painel.
                  </div>
                )}

                {/* LOGOUT */}
                <form action={logout}>
                  <Button
                    type="submit"
                    className="bg-white/10 hover:bg-white/20 px-6 py-3 text-sm rounded-lg transition-all"
                  >
                    Sair da conta
                  </Button>
                </form>

              </div>
            </div>
          )}

          {/* FOOTER */}
          <div className="mt-10 text-center text-xs text-zinc-600">
            Sistema restrito • Acesso monitorado
          </div>

        </div>
      </div>
    </div>
  );
}