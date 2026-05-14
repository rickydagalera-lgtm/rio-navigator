import { createFileRoute } from "@tanstack/react-router";
import { EVENTS } from "@/lib/places";
import { Bell, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/eventos")({
  component: EventosPage,
  head: () => ({
    meta: [
      { title: "Eventos no Rio — Carnaval, shows, blocos | RioLocal" },
      { name: "description", content: "Os principais eventos do Rio de Janeiro: Carnaval, Rock in Rio, Réveillon, samba na Pedra do Sal e mais." },
    ],
  }),
});

function EventosPage() {
  const [reminded, setReminded] = useState<Set<string>>(new Set());
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Agenda carioca</p>
        <h1 className="text-4xl font-bold mt-2">Eventos no Rio</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Do samba de raiz aos megafestivais — escolha sua vibe e ative um lembrete.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-5">
        {EVENTS.map((e) => {
          const on = reminded.has(e.id);
          return (
            <article key={e.id} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition group">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={e.image} alt={e.name} loading="lazy" width={1280} height={896} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg">{e.name}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{e.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.area}</span>
                </div>
                <p className="text-sm mt-3">{e.desc}</p>
                <button
                  onClick={() => setReminded((s) => { const n = new Set(s); n.has(e.id) ? n.delete(e.id) : n.add(e.id); return n; })}
                  className={`mt-4 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition ${on ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-accent hover:text-accent-foreground"}`}
                >
                  <Bell className="w-3.5 h-3.5" /> {on ? "Lembrete ativo" : "Avise-me"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
