"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from '../../components/ui/button'

export default function Authentication() {

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="min-h-screen w-full bg-[#0A0F1C] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* LOGO */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            DevBarros
          </h1>
          <p className="text-zinc-400 text-sm mt-1 tracking-wide">
            Painel de Acesso
          </p>
        </div>

        <Button
              type="button"
              variant="outline"
              onClick={handleSignInWithGoogle}
              className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors rounded-lg flex gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78..." />
                <path fill="#34A853" d="M12 23c2.97 0..." />
                <path fill="#FBBC05" d="M5.84 14.09c-.22..." />
                <path fill="#EA4335" d="M12 5.38c1.62..." />
              </svg>
              Entrar com Google
            </Button>
      </div>
    </div>
  );
}
