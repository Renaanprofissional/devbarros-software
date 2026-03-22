"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileSpreadsheet, FileUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function NFPage() {
  const router = useRouter(); // <-- declare apenas uma vez
  const { data: session, isPending } = useSession();

  // Lista de emails permitidos, tirando espaços extras
  const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS
    ?.split(",")
    .map(e => e.trim()) || [];

  // Redirecionamento seguro usando useEffect
  useEffect(() => {
    if (!isPending && (!session?.user || !allowedEmails.includes(session.user.email || ""))) {
      router.push("/authentication"); // redireciona se não autorizado
    }
  }, [isPending, session, router, allowedEmails]);

  // Mostrar loading enquanto a sessão carrega
  if (isPending) return <p>Carregando...</p>;

  // Caso não tenha sessão ou não seja permitido, mostra mensagem enquanto redireciona
  if (!session?.user || !allowedEmails.includes(session.user.email || "")) {
    return <p>Redirecionando...</p>;
  }

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ moved: string[]; skipped: string[]; notFound: string[] } | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);

  async function handleUpload() {
    if (!file) return;

    setLoading(true);
    setResult(null);
    setTimeTaken(null);

    const start = performance.now();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const API_URL = process.env.NEXT_PUBLIC_NF_API_URL + "/api/nf/process-sheet";

      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Erro ao processar planilha");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Erro inesperado ao enviar");
    } finally {
      const end = performance.now();
      setTimeTaken((end - start) / 1000);
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center py-10">
      <Card className="w-[750px] bg-[#0D1117] border-white/10 shadow-2xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
            <FileSpreadsheet className="h-5 w-5 text-blue-400" />
            Movimentação de Notas Fiscais
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Input de arquivo estilizado */}
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Selecione uma planilha XLSX:</p>
            
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
            >
              <FileUp className="h-5 w-5" />
              {file ? file.name : "Clique para selecionar o arquivo"}
            </label>

            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </div>

          {/* Botão de envio */}
          <Button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Movendo arquivos...
              </>
            ) : (
              <>
                <FileUp className="h-5 w-5" />
                Enviar{file ? `: ${file.name}` : ""}
              </>
            )}
          </Button>

          {/* Resultado */}
          {result && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <p>📤 Movidos: {result.moved.length}</p>
                <p>⚠️ Já estavam fora da pasta: {result.skipped.length}</p>
                <p>❌ Não encontrados: {result.notFound.length}</p>
                {timeTaken && <p>⏱️ Tempo: {timeTaken.toFixed(2)}s</p>}
              </div>

              {result.moved.length > 0 && (
                <section>
                  <h3 className="font-semibold text-white mb-2">📤 Movidos</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.moved.map((nf) => (
                      <Badge key={nf} variant="default">{nf}</Badge>
                    ))}
                  </div>
                </section>
              )}

              {result.skipped.length > 0 && (
                <section>
                  <h3 className="font-semibold text-yellow-400 mb-2">⚠️ Já estavam movidos</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.skipped.map((nf) => (
                      <Badge key={nf} variant="secondary">{nf}</Badge>
                    ))}
                  </div>
                </section>
              )}

              {result.notFound.length > 0 && (
                <section>
                  <h3 className="font-semibold text-red-400 mb-2">❌ Não Encontrados</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.notFound.map((nf) => (
                      <Badge key={nf} variant="destructive">{nf}</Badge>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}