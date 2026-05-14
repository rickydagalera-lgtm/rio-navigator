import { createFileRoute } from "@tanstack/react-router";
import { ROTAS } from "@/lib/places";
import { Map, Clock } from "lucide-react";

export const Route = createFileRoute("/rotas")({
  component: RotasPage,
  head: () => ({
    meta: [
      { title: "Rotas e roteiros do Rio | RioLocal" },
      { name: "description", content: "Roteiros prontos para 1, 2 ou 3 dias no Rio de Janeiro: clássico, econômico, praiano e noturno." },
    ],
  }),
});

function RotasPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1.5"><Map className="w-3.5 h-3.5" /> Roteiros</p>
        <h1 className="text-4xl font-bold mt-2">Rotas prontas</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Escolha um roteiro testado por locais e adapte ao seu ritmo.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        {ROTAS.map((r) => (
          <article key={r.id} className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
            <div className="aspect-[16/8] overflow-hidden">
              <img src={r.image} alt={r.title} loading="lazy" width={1280} height={640} className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg">{r.title}</h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Custo aprox. {r.cost}</span>
              </div>
              <ol className="mt-4 space-y-2">
                {r.stops.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
