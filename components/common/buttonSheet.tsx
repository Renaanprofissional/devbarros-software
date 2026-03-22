"use client";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BsHddStack, BsGraphUp, BsCashStack, BsHourglassSplit, BsCheckCircle } from "react-icons/bs";
import { FaTruckFast } from "react-icons/fa6";
import { X, User, LogOut } from "lucide-react";
import Link from "next/link";
import { logout } from '../../actions/logout'


export default function ProfessionalMenuSheet() {
  return (
    <Sheet>
      {/* Trigger apenas com ícone */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
        >
          <BsHddStack className="w-6 h-6 text-indigo-400" />
        </Button>
      </SheetTrigger>

      {/* Conteúdo do Sheet */}
      <SheetContent
        side="right"
        className="
          p-6
          w-80
          bg-[#0A0C17]/95 backdrop-blur-[40px]
          rounded-tr-3xl rounded-br-3xl
          shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]
          border-r border-white/10
          flex flex-col justify-between
        "
      >
        {/* Header */}
        <SheetHeader className="flex justify-between items-center mb-6">
          <SheetTitle className="text-2xl font-bold text-white flex items-center gap-3">
            <BsHddStack className="w-6 h-6 text-indigo-400" /> Menu
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" className="p-2 rounded-full hover:bg-white/10 transition">
              <X className="w-5 h-5 text-white" />
            </Button>
          </SheetClose>
        </SheetHeader>

        {/* Menu Principal */}
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-500/20 transition">
            <BsGraphUp className="w-5 h-5 text-indigo-400" /> <span className="text-white font-medium">Dashboard</span>
          </Link>
          <Link href="https://drive.google.com/drive/folders/1SjRl9MARKTVnMPVh27GSWHejY8Vfunfe" target="_blant" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-500/20 transition">
            <BsCashStack className="w-5 h-5 text-green-400" /> <span className="text-white font-medium">Faturas <span className="m-[2px]">|</span> Mover canhotos </span>
          </Link>
          <Link href="https://docs.google.com/spreadsheets/d/19Lypkr7EAfP7Xgzbre0bpKXODWY9G9Wh/edit?gid=1223040419#gid=1223040419" target="_blant" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-500/20 transition">
            <BsCheckCircle className="w-5 h-5 text-yellow-400" /> <span className="text-white font-medium">Tarefas</span>
          </Link>
          <Link href="https://drive.google.com/drive/folders/1muyV1_Buv7xAB5rHftLRjoNluJuY_GgE" target="_blant" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-500/20 transition">
            <FaTruckFast className="w-5 h-5 text-green-400" /> <span className="text-white font-medium">Perfomances de Entregas</span>
          </Link>
          <Link href="https://docs.google.com/spreadsheets/d/195W1t0iZp5iTNZCacuDUxxe0yZWb8nKx/edit?gid=321506686#gid=321506686" target="_blant" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-500/20 transition">
            <BsHourglassSplit className="w-5 h-5 text-gray-400" /> <span className="text-white font-medium">Tracking</span>
          </Link>
        </nav>

        {/* Footer do Menu */}
        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
          <Link href="/perfil" className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-500/20 transition">
            <User className="w-5 h-5 text-white" /> <span className="text-white font-medium">Perfil</span>
          </Link>
          {/* LOGOUT */}
          <form action={logout} className="mt-auto">
            <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all">
              <LogOut size={18} />
              Sair da conta
            </button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}