import Image from "next/image";
import CardHour from "./Components/CardHour/CardHour";
import BotaoPonto from "./Components/ButtonHour/ButtonHour";


export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-6 min-h-screen">
        <aside className="bg-yellow-100 text-black text-center py-6">
          <h2>últimos registros</h2>
          <div className="my-6">
            <CardHour />
          </div>
        </aside>
        <div className="col-span-5 flex items-center justify-center">
          <BotaoPonto />
        </div>
      </div>
    </main>
  );
}
