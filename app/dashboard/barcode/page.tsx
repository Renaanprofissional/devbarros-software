"use client";

import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";

export default function BarcodePage() {
  const [type, setType] = useState("CODE128");
  const [codes, setCodes] = useState<string[]>([]);
  const [scale, setScale] = useState(2);
  const [rotation, setRotation] = useState("0");
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState(14);
  const [height, setHeight] = useState(100);

  const barcodeRefs = useRef<(SVGSVGElement | null)[]>([]);

  // 🔥 geração automática
  useEffect(() => {
    barcodeRefs.current.forEach((ref, index) => {
      if (!ref) return;
      if (!codes[index]) return;

      JsBarcode(ref, codes[index], {
        format: type as any,
        lineColor: "#000",
        width: Number(scale),
        height: Number(height),
        displayValue: true,
        font: font,
        fontSize: Number(fontSize),
        textMargin: 5,
        margin: 10,
      });

      // rotação opcional
      ref.style.transform = `rotate(${rotation}deg)`;
    });
  }, [codes, type, scale, rotation, font, fontSize, height]);

  // 🖨 imprimir todos
  function printBarcode() {
    const printWindow = window.open("", "_blank");

    if (!printWindow) return;

    const allBarcodes = barcodeRefs.current
      .map((ref) => ref?.outerHTML || "")
      .join(`
        <div style="margin-bottom:40px;display:flex;justify-content:center;">
      `);

    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Código de Barras</title>

          <style>
            body{
              padding:40px;
              font-family:Arial;
            }

            .barcode-item{
              margin-bottom:40px;
              display:flex;
              justify-content:center;
            }
          </style>
        </head>

        <body>
          ${barcodeRefs.current
            .map(
              (ref) => `
                <div class="barcode-item">
                  ${ref?.outerHTML || ""}
                </div>
              `
            )
            .join("")}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-black p-6 bg-gray-100">
      <div className="w-[1100px] bg-white border border-gray-200 p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6">
          Gerador de Código de Barras
        </h1>

        <div className="grid grid-cols-2 gap-6">
          {/* CONTROLES */}
          <div className="space-y-4">
            {/* tipo */}
            <div>
              <label className="text-sm font-medium">Tipo:</label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="CODE128">Code 128</option>
                <option value="CODE39">Code 39</option>
              </select>
            </div>

            {/* tamanho */}
            <div>
              <label className="text-sm font-medium">
                Espessura:
              </label>

              <input
                type="number"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* fonte */}
            <div className="flex gap-2">
              <div className="w-full">
                <label className="text-sm font-medium">
                  Fonte:
                </label>

                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier">Courier</option>
                  <option value="Times New Roman">
                    Times New Roman
                  </option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Tamanho
                </label>

                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) =>
                    setFontSize(Number(e.target.value))
                  }
                  className="w-[100px] border p-2 rounded"
                />
              </div>
            </div>

            {/* altura */}
            <div>
              <label className="text-sm font-medium">
                Altura:
              </label>

              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* códigos */}
            <div>
              <label className="text-sm font-medium">
                Códigos:
              </label>

              <textarea
                placeholder={`Digite um código por linha

Exemplo:
789123456
ABC123
000111222`}
                className="w-full border p-3 rounded h-52"
                onChange={(e) =>
                  setCodes(
                    e.target.value
                      .split("\n")
                      .map((v) => v.trim())
                      .filter(Boolean)
                  )
                }
              />
            </div>

            {/* botão */}
            <button
              onClick={printBarcode}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold"
            >
              Imprimir
            </button>
          </div>

          {/* RESULTADO */}
          <div className="border rounded p-4 bg-white overflow-auto max-h-[800px]">
            <div className="flex flex-col items-center gap-8">
              {codes.length === 0 && (
                <div className="text-gray-400 text-sm">
                  Nenhum código informado
                </div>
              )}

              {codes.map((item, index) => (
                <div
                  key={index}
                  className="border rounded p-4 w-full flex justify-center bg-gray-50"
                >
                  <svg
                    ref={(el) => {
                      barcodeRefs.current[index] = el;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}