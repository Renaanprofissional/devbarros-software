"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function Authentication() {
  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="relative min-h-screen w-full flex bg-[#05070F] text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute w-[600px] h-[600px] bg-indigo-500/30 blur-[180px] rounded-full -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/25 blur-[150px] rounded-full -bottom-28 -right-28 animate-pulse-slow" />
      </div>

      {/* NOISE TEXTURE */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* LADO ESQUERDO */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <img
          src="https://i.pinimg.com/736x/b4/79/de/b479debf4cc434d9707cb3cd87dc6f75.jpg"
          alt="tech background"
          className="absolute inset-0 w-full h-full object-cover scale-110 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#05070F]/95 via-[#05070F]/80 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between p-14">
          <h1 className="text-sm tracking-[0.4em] uppercase text-zinc-400">
            DevBarros
          </h1>

          <div>
            <h2 className="text-6xl font-bold leading-[1.05] tracking-tight">
              Gestão
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                financeira
              </span>
              com eficiência
            </h2>
            <p className="text-zinc-400 mt-6 max-w-lg text-base leading-relaxed">
              Um sistema moderno desenvolvido para simplificar processos financeiros. Criado como projeto pessoal de aprendizado em programação, mas pensado para impacto real no ambiente corporativo.
            </p>
            <p className="text-indigo-400 mt-4 italic max-w-lg text-base leading-relaxed">
              “Transforme cada desafio em oportunidade de crescimento.”
            </p>
          </div>

          <p className="text-xs text-zinc-600 tracking-wide">
            © {new Date().getFullYear()} DevBarros
          </p>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 relative z-10">

        <div className="w-full max-w-md">
          <div className="group bg-white/5 backdrop-blur-[40px] border border-white/10 rounded-3xl p-10 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] hover:shadow-[0_60px_160px_-20px_rgba(0,0,0,1)] transition-all duration-500">

            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-semibold tracking-tight">
                Acessar painel
              </h1>
              <p className="text-zinc-400 text-sm mt-2">
                Continue com sua conta Google
              </p>
            </div>

            {/* Botão Google */}
            <Button
              type="button"
              onClick={handleSignInWithGoogle}
              className="relative w-full cursor-pointer bg-white text-black hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white transition-all rounded-lg flex items-center justify-center gap-3 font-medium py-5 text-sm tracking-wide group-hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78..." />
                <path fill="#34A853" d="M12 23c2.97 0..." />
                <path fill="#FBBC05" d="M5.84 14.09c-.22..." />
                <path fill="#EA4335" d="M12 5.38c1.62..." />
              </svg>
              Continuar com Google
            </Button>

            {/* Redes sociais */}
            <div className="flex justify-center gap-4 mt-6">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/renan-costa-barros"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.1h.07c.67-1.27 2.3-2.6 4.73-2.6 5.05 0 6 3.33 6 7.66V24h-5V15.3c0-2.06-.04-4.71-2.87-4.71-2.87 0-3.31 2.24-3.31 4.57V24h-5V8z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/renan.devbarros"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.403a4.92 4.92 0 011.675.973 4.92 4.92 0 01.973 1.675c.163.46.347 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.43a4.918 4.918 0 01-.973 1.675 4.918 4.918 0 01-1.675.973c-.46.163-1.26.347-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.403a4.92 4.92 0 01-1.675-.973 4.92 4.92 0 01-.973-1.675c-.163-.46-.347-1.26-.403-2.43-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.43a4.92 4.92 0 01.973-1.675 4.92 4.92 0 011.675-.973c.46-.163 1.26-.347 2.43-.403 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.012 7.052.07 5.78.127 4.835.308 4.042.63a6.918 6.918 0 00-2.51 1.645A6.918 6.918 0 00.63 4.042c-.322.793-.503 1.738-.56 3.01C.012 8.332 0 8.741 0 12c0 3.259.012 3.668.07 4.948.057 1.272.238 2.217.56 3.01a6.918 6.918 0 001.645 2.51 6.918 6.918 0 002.51 1.645c.793.322 1.738.503 3.01.56 1.28.058 1.689.07 4.948.07s3.668-.012 4.948-.07c1.272-.057 2.217-.238 3.01-.56a6.918 6.918 0 002.51-1.645 6.918 6.918 0 001.645-2.51c.322-.793.503-1.738.56-3.01.058-1.28.07-1.689.07-4.948s-.012-3.668-.07-4.948c-.057-1.272-.238-2.217-.56-3.01a6.918 6.918 0 00-1.645-2.51A6.918 6.918 0 0019.958.63c-.793-.322-1.738-.503-3.01-.56C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.879 0 1.44 1.44 0 012.879 0z" />
                </svg>
              </a>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-white/10 w-full" />
              <span className="text-[10px] text-zinc-500 tracking-[0.4em]">
                ACESSO RESTRITO
              </span>
              <div className="h-px bg-white/10 w-full" />
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-zinc-500 leading-relaxed">
              Apenas usuários autorizados podem acessar o sistema.
              <br />
              Caso não tenha permissão, entre em contato com o suporte.
            </p>

          </div>
        </div>

        {/* Botão Voltar Moderno - Parte Inferior */}
        <div className="mt-10 w-full max-w-md flex justify-start">
          <Link href="/">
            <Button
              type="button"
              className="
        w-12 h-12
        rounded-full
        bg-purple-900
        hover:scale-105
        hover:shadow-xl
        transition-transform duration-300
        flex items-center justify-center
        cursor-pointer
      "
            >
              {/* Ícone de seta */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}