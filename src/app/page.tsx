import Image from "next/image";
import CardHour from "./Components/CardHour/CardHour";
import BotaoPonto from "./Components/ButtonHour/ButtonHour";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen grid grid-cols-6 gap-4 p-4
                      md:grid-cols-6">
        {/* Aside fica full width no mobile, col-span-1 no desktop */}
        <aside className="bg-yellow-100 text-black text-center py-6 col-span-6 md:col-span-1 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Últimos registros</h2>
          <div className="my-6 max-h-[60vh] overflow-auto">
            <CardHour />
          </div>
        </aside>

        {/* Botão ocupa toda a largura no mobile, col-span-5 no desktop */}
        <div className="col-span-6 md:col-span-5 flex items-center justify-center">
          <BotaoPonto />
        </div>
      </div>
    </main>
  );
}
