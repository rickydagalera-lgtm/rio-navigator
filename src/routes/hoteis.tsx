import { createFileRoute } from "@tanstack/react-router";
import { HOTELS } from "@/lib/places";
import { Hotel, MapPin, CalendarPlus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/hoteis")({
  component: HoteisPage,
  head: () => ({
    meta: [
      { title: "Hotéis no Rio — Onde se hospedar | RioLocal" },
      { name: "description", content: "Hospedagem no Rio de Janeiro: opções em Ipanema, Copacabana, Santa Teresa, Botafogo e Lapa, do econômico ao luxo." },
    ],
  }),
});

function HoteisPage() {
  const [booked, setBooked] = useState<string | null>(null);
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1.5"><Hotel className="w-3.5 h-3.5" /> Hospedagem</p>
        <h1 className="text-4xl font-bold mt-2">Onde dormir no Rio</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Do hostel boêmio na Lapa ao luxo de Ipanema — escolha a vibe e simule uma reserva.</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {HOTELS.map((h) => (
          <article key={h.id} className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition">
            <div className="aspect-[4/3] overflow-hidden"><img src={h.image} alt={h.name} loading="lazy" width={1280} height={960} className="w-full h-full object-cover" /></div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold leading-tight">{h.name}</h3>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/30 text-accent-foreground shrink-0">{h.tier}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" />{h.area}</div>
              <p className="text-sm mt-2">{h.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-semibold text-primary">{h.price}</span>
                <button onClick={() => setBooked(h.id)} className="text-xs inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:opacity-90">
                  <CalendarPlus className="w-3.5 h-3.5" />Agendar
                </button>
              </div>
              {booked === h.id && <p className="text-xs mt-3 p-2 rounded-lg bg-secondary">✅ Pré-reserva enviada! Confirme datas em parceiros como Booking ou Airbnb.</p>}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
