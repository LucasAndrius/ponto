"use client";
import { useState, useEffect } from "react";

export default function BotaoPonto() {
  const [dias, setDias] = useState<any[]>([]);

  useEffect(() => {
    const dados = localStorage.getItem("dias");
    if (dados) {
      setDias(JSON.parse(dados));
    }
  }, []);

  const baterPonto = () => {
    const agora = new Date().toISOString();
    let diasAtualizados = [...dias];

    // Pega o último dia
    let diaAtual = diasAtualizados[diasAtualizados.length - 1];

    // Se não existe dia atual ou já tem 4 batidas, cria um novo
    if (!diaAtual || diaAtual.batidas.length === 4) {
      diaAtual = { batidas: [] };
      diasAtualizados.push(diaAtual);
    }

    // Adiciona batida
    diaAtual.batidas.push(agora);

    // Se completou 4 batidas, calcula total e extras
    if (diaAtual.batidas.length === 4) {
      const inicio = new Date(diaAtual.batidas[0]).getTime();
      const fim = new Date(diaAtual.batidas[3]).getTime();
      const intervalo =
        new Date(diaAtual.batidas[2]).getTime() -
        new Date(diaAtual.batidas[1]).getTime();

      const totalMs = fim - inicio - intervalo;
      const totalHoras = Math.floor(totalMs / 3600000);
      const totalMinutos = Math.floor((totalMs % 3600000) / 60000);

      diaAtual.totalHoras = `${totalHoras}h ${totalMinutos}m`;

      const horasExtras = totalHoras - 8;
      diaAtual.extras =
        horasExtras > 0
          ? `${horasExtras}h ${totalMinutos}m`
          : "0h 0m";

      // também salva tempo de intervalo
      const intervaloHoras = Math.floor(intervalo / 3600000);
      const intervaloMinutos = Math.floor((intervalo % 3600000) / 60000);
      diaAtual.intervalo = `${intervaloHoras}h ${intervaloMinutos}m`;
    }

    // Salva no estado e no localStorage
    setDias(diasAtualizados);
    localStorage.setItem("dias", JSON.stringify(diasAtualizados));

    // dispara evento para atualizar CardHour
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <button
      onClick={baterPonto}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Bater ponto
    </button>
  );
}
