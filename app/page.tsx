import Link from "next/link";
import { Button } from "../components/ui/button";
import { getServerSession } from "../lib/session";
import { logout } from "../actions/logout";
import { FiLogOut, FiArrowRight, FiUnlock, FiLock } from "react-icons/fi";

export default async function Home() {
  const session = await getServerSession();
  const user = session?.user ?? null;

  const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") || [];
  const hasAccess = user && allowedEmails.includes(user.email ?? "");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#03050D] text-white font-sans">

      {/* BACKGROUND VIDEO + EFFECTS */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 scale-110"
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-linear-to-br from-[#03050D]/95 via-[#03050D]/80 to-black" />
        <div className="absolute w-[600px] h-[600px] bg-blue-600/15 blur-[140px] -top-36 -left-36" />
        <div className="absolute w-[500px] h-[500px] bg-purple-600/15 blur-[140px] -bottom-32 -right-32" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* CENTRAL CARD */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl p-10 shadow-lg shadow-black/30 transition-all hover:border-white/20">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">
              DevBarros{" "}
              <span className="bg-linear-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                System
              </span>
            </h1>
            <p className="text-zinc-400 text-sm mt-2">
              Plataforma segura para gerenciamento do painel
            </p>
          </div>

          {/* NOT LOGGED */}
          {!user && (
            <div className="flex justify-center">
              <Link href="/authentication">
                <Button className="cursor-pointer flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-transform">
                  <FiUnlock className="w-5 h-5" />
                  Acessar sistema
                </Button>
              </Link>
            </div>
          )}

          {/* LOGGED */}
          {user && (
            <div className="text-center">
              <p className="text-lg mb-6 text-zinc-300">
                Bem-vindo,{" "}
                <span className="font-semibold text-blue-400">
                  {user.name}
                </span>
              </p>

              <div className="flex flex-col items-center gap-4">

                {/* ACCESS GRANTED */}
                {hasAccess && (
                  <Link href="/dashboard">
                    <Button className="cursor-pointer flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-transform">
                      <FiArrowRight className="w-5 h-5" />
                      Entrar no painel
                    </Button>
                  </Link>
                )}

                {/* NO ACCESS */}
                {!hasAccess && (
                  <div className="cursor-pointer flex items-center gap-2 w-full justify-center text-sm bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
                    <FiLock className="w-4 h-4" />
                    Sem permissão para acessar o painel
                  </div>
                )}

                {/* LOGOUT */}
                <form action={logout}>
                  <Button
                    type="submit"
                    className="cursor-pointer flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-sm text-white shadow-sm hover:shadow-md transition-all hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <FiLogOut className="w-5 h-5" />
                    Sair da conta
                  </Button>
                </form>

              </div>
            </div>
          )}

          {/* FOOTER */}
          <div className="mt-10 text-center text-xs text-zinc-500 tracking-wide">
          • Sistema restrito • 
          </div>

        </div>
      </div>
    </div>
  );
}