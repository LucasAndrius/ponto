"use client";
import { useState, useEffect } from "react";

type Dia = {
  batidas: string[];
  totalHoras?: string;
  extras?: string;
  intervalo?: string; // <-- novo campo
};

export default function CardHour() {
  const [dias, setDias] = useState<Dia[]>([]);

  const carregar = () => {
    const dados = localStorage.getItem("dias");
    if (dados) {
      try {
        const lista: Dia[] = JSON.parse(dados);

        // Calcula intervalo para cada dia
        lista.forEach((dia) => {
          if (dia.batidas.length >= 3) {
            const saidaIntervalo = new Date(dia.batidas[1]).getTime();
            const retornoIntervalo = new Date(dia.batidas[2]).getTime();
            const diffMs = retornoIntervalo - saidaIntervalo;

            if (diffMs > 0) {
              const horas = Math.floor(diffMs / 3600000);
              const minutos = Math.floor((diffMs % 3600000) / 60000);
              dia.intervalo = `${horas}h ${minutos}m`;
            }
          }
        });

        setDias(lista);
      } catch {
        setDias([]);
      }
    } else {
      setDias([]);
    }
  };

  useEffect(() => {
    carregar();
    window.addEventListener("storage", carregar);
    return () => window.removeEventListener("storage", carregar);
  }, []);

  return (
    <div>
      {dias.length === 0 ? (
        <p className="text-gray-500 text-sm">Nenhum registro</p>
      ) : (
        dias
          .slice()
          .reverse()
          .map((dia, index) => (
            <div
              key={index}
              className="border-2 border-gray-500 border-dotted rounded mx-4 p-4 mb-2"
            >
              <div className="text-xs mb-2 font-bold">
                Dia: {new Date(dia.batidas[0]).toLocaleDateString()}
              </div>

              {dia.batidas.map((batida, i) => (
                <div
                  key={i}
                  className="text-xs grid grid-flow-col justify-between"
                >
                  <span>
                    {["Entrada", "Saída p/ intervalo", "Retorno", "Saída final"][i]}
                  </span>
                  <span>
                    {new Date(batida).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}

              {dia.intervalo && (
                <div className="mt-2 text-xs text-blue-600">
                  Intervalo: {dia.intervalo}
                </div>
              )}

              {dia.totalHoras && (
                <div className="mt-2 text-xs font-semibold">
                  <p>Total horas: {dia.totalHoras}</p>
                  <p>Horas extras: {dia.extras}</p>
                </div>
              )}
            </div>
          ))
      )}
    </div>
  );
}
