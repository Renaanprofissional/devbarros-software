import Sidebar from "../../components/common/sidebar";
import Header from "../../components/common/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen w-full flex bg-[#03050D] text-white overflow-hidden">

      {/* BACKGROUND GLOBAL */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[140px] top-[-120px] left-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[140px] bottom-[-100px] right-[-100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* SIDEBAR */}
      <aside className="relative h-full w-[260px] border-r border-white/10 bg-white/[0.02] backdrop-blur-2xl hidden md:flex">
        <div className="h-full flex flex-col">
          <Sidebar />
        </div>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* HEADER */}
        <header className="border-b border-white/10 bg-white/[0.02] backdrop-blur-2xl">
          <Header />
        </header>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-8 md:p-10">

          {/* container interno */}
          <div className="max-w-7xl mx-auto">
            {children}
          </div>

        </main>

      </div>
    </div>
  );
}