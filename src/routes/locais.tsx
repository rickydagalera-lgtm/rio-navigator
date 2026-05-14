import { createFileRoute } from "@tanstack/react-router";
import { PLACES } from "@/lib/places";
import { Camera, MapPin, ExternalLink, CalendarPlus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/locais")({
  component: LocaisPage,
  head: () => ({
    meta: [
      { title: "Locais turísticos no Rio | RioLocal" },
      { name: "description", content: "Cristo Redentor, Pão de Açúcar, praias, museus e parques — os melhores pontos turísticos do Rio com preço e tempo." },
    ],
  }),
});

function LocaisPage() {
  const [scheduled, setScheduled] = useState<Record<string, string>>({});
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1.5"><Camera className="w-3.5 h-3.5" /> Pontos turísticos</p>
        <h1 className="text-4xl font-bold mt-2">Locais imperdíveis</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Veja imagens, preços, tempo médio e agende sua visita.</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PLACES.map((p) => (
          <article key={p.id} className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
            <div className="aspect-[4/3] overflow-hidden"><img src={p.image} alt={p.name} loading="lazy" width={1280} height={960} className="w-full h-full object-cover" /></div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold leading-tight">{p.name}</h3>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary shrink-0">{p.category}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" />{p.neighborhood}</div>
              <p className="text-sm mt-2">{p.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mt-3 text-muted-foreground">
                <span>💵 {p.price}</span>
                <span>⏱ {p.duration}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <input
                  type="date"
                  value={scheduled[p.id] ?? ""}
                  onChange={(e) => setScheduled((s) => ({ ...s, [p.id]: e.target.value }))}
                  className="text-xs px-2 py-1.5 rounded-lg border border-border bg-background"
                />
                <button onClick={() => alert(`Visita agendada para ${scheduled[p.id] || "uma data"} em ${p.name}!`)} disabled={!scheduled[p.id]} className="text-xs inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground disabled:opacity-40">
                  <CalendarPlus className="w-3.5 h-3.5" />Agendar
                </button>
                {p.bookingUrl && (
                  <a href={p.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-xs inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground">
                    <ExternalLink className="w-3 h-3" />Site oficial
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
