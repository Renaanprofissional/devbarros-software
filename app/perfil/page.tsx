"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { logout } from "@/actions/logout";
import { LogOut } from "lucide-react";
import { TfiViewListAlt } from "react-icons/tfi";

interface UserProfile {
  name?: string;
  email?: string;
  image?: string;
}

export default function Perfil() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserProfile>({});

  // Atualiza o usuário apenas se houver sessão
  useEffect(() => {
    if (session?.user) {
      setUser({
        name: session.user.name ?? "Usuário",
        email: session.user.email ?? "Sem e-mail",
        image: session.user.image ?? "",
      });
    }
  }, [session]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#05070F] text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="https://i.pinimg.com/1200x/18/18/9e/18189eedf00a84e15a4532681fc7844e.jpg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
        />
        <div className="absolute w-[600px] h-[600px] bg-indigo-500/30 blur-[180px] rounded-full -top-20 -left-20 animate-pulse-slow" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/25 blur-[150px] rounded-full -bottom-28 -right-28 animate-pulse-slow" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* PROFILE CARD */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-10">
        <div className="group bg-gray-900/90 backdrop-blur-[40px] border border-gray-800 rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-500">

          {/* Avatar */}
          <div className="relative flex justify-center mb-6">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover ring-2 ring-gray-700"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                {user.name?.charAt(0) ?? "U"}
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white/20 rounded-full animate-pulse" />
          </div>

          {/* User Info */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            {/* LOGOUT */}
            <form action={logout} className="mt-auto">
              <button className="cursor-pointer flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all">
                <LogOut size={18} />
                Sair da conta
              </button>
            </form>

            {/* Dashboard */}
            <Link
              href="/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition"
            >
              <TfiViewListAlt className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">Dashboard</span>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-6">
            <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M..." /></svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M..." /></svg>
            </a>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 w-full text-center text-xs text-gray-400">
        © {new Date().getFullYear()} DevBarros. Todos os direitos reservados.
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 0.4; }
        }
        .animate-pulse-slow { animation: pulse-slow 8s infinite; }
      `}</style>
    </div>
  );
}