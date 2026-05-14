import { createFileRoute } from "@tanstack/react-router";
import { FOODS } from "@/lib/places";
import { UtensilsCrossed, MapPin, CalendarPlus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/comida")({
  component: ComidaPage,
  head: () => ({
    meta: [
      { title: "Comida típica do Rio | RioLocal" },
      { name: "description", content: "Feijoada, açaí, picanha, pastel de feira e biscoito Globo — onde comer comida carioca de verdade." },
    ],
  }),
});

function ComidaPage() {
  const [reserva, setReserva] = useState<string | null>(null);
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1.5"><UtensilsCrossed className="w-3.5 h-3.5" /> Sabores cariocas</p>
        <h1 className="text-4xl font-bold mt-2">Comida típica</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">O melhor da culinária carioca — onde achar e como agendar uma mesa.</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FOODS.map((f) => (
          <article key={f.id} className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
            <div className="aspect-[4/3] overflow-hidden"><img src={f.image} alt={f.name} loading="lazy" width={1280} height={960} className="w-full h-full object-cover" /></div>
            <div className="p-4">
              <h3 className="font-bold leading-tight">{f.name}</h3>
              <p className="text-sm mt-2">{f.desc}</p>
              <div className="text-xs text-muted-foreground mt-2 flex items-start gap-1"><MapPin className="w-3 h-3 mt-0.5" /><span>{f.where}</span></div>
              <button onClick={() => setReserva(f.id)} className="mt-4 text-xs inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground">
                <CalendarPlus className="w-3.5 h-3.5" />Agendar mesa
              </button>
              {reserva === f.id && <p className="text-xs mt-3 p-2 rounded-lg bg-secondary">✅ Confirme diretamente com o restaurante via iFood, Google Maps ou ligação.</p>}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
