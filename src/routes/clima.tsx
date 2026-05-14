import { createFileRoute } from "@tanstack/react-router";
import { Cloud, Sun, Plane, Bus, TrainFront } from "lucide-react";
import beach from "@/assets/rio-beach.jpg";
import cristo from "@/assets/cristo-hero.jpg";

export const Route = createFileRoute("/clima")({
  component: ClimaPage,
  head: () => ({
    meta: [
      { title: "Clima e melhor época para o Rio + transporte | RioLocal" },
      { name: "description", content: "Quando ir ao Rio: clima por estação, voos, ônibus interestaduais e metrô da cidade." },
    ],
  }),
});

const SEASONS = [
  { name: "Verão", months: "Dez–Mar", temp: "28–38°C", vibe: "🔥 Quente, lotado, caro", best: "Réveillon, Carnaval, praias", color: "from-accent to-destructive" },
  { name: "Outono", months: "Abr–Jun", temp: "20–28°C", vibe: "✨ Equilíbrio perfeito", best: "Trilhas, museus, cidade vazia", color: "from-primary to-accent" },
  { name: "Inverno", months: "Jul–Set", temp: "17–25°C", vibe: "🌤 Ameno e seco", best: "Cultura, gastronomia, festivais", color: "from-primary to-secondary" },
  { name: "Primavera", months: "Out–Nov", temp: "22–30°C", vibe: "🌸 Florida e calorosa", best: "Pré-temporada, preços médios", color: "from-accent to-primary" },
];

const TRANSPORT = [
  { icon: Plane, title: "Voos", desc: "Aeroporto Internacional do Galeão (GIG) recebe voos internacionais; Santos Dumont (SDU) atende voos domésticos.", tip: "Use Google Flights, Decolar e Latam.com. Evite passar de 10h de antecedência no aeroporto." },
  { icon: Bus, title: "Ônibus interestadual", desc: "Rodoviária Novo Rio (Centro) é o hub. Empresas: 1001, Cometa, Útil, Kaissara.", tip: "Compre na ClickBus ou Buser; trechos São Paulo–Rio a partir de R$ 80." },
  { icon: TrainFront, title: "Metrô e VLT na cidade", desc: "Metrô Rio cobre Ipanema, Copacabana, Centro e Tijuca. VLT atende o Centro e Porto Maravilha.", tip: "Compre o cartão Giro Carioca; bilhete único: R$ 7,50. Evite o pico (07–09h e 17–19h)." },
];

function ClimaPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8 grid md:grid-cols-[1fr_300px] gap-6 items-end">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1.5"><Cloud className="w-3.5 h-3.5" />Clima e logística</p>
          <h1 className="text-4xl font-bold mt-2">Quando ir e como chegar</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">Cada estação no Rio tem sua magia. Veja o melhor momento e os transportes para chegar e se locomover.</p>
        </div>
        <img src={beach} alt="Praia de Copacabana vista de cima" loading="lazy" width={1536} height={896} className="rounded-2xl object-cover h-40 w-full shadow-lg" />
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {SEASONS.map((s) => (
          <div key={s.name} className={`p-5 rounded-2xl text-primary-foreground bg-gradient-to-br ${s.color} shadow-lg`}>
            <Sun className="w-5 h-5 opacity-80" />
            <div className="mt-2 text-xl font-bold">{s.name}</div>
            <div className="text-xs opacity-90">{s.months}</div>
            <div className="mt-3 text-2xl font-bold">{s.temp}</div>
            <p className="text-sm mt-1">{s.vibe}</p>
            <p className="text-xs mt-2 opacity-90">{s.best}</p>
          </div>
        ))}
      </section>

      <section className="grid md:grid-cols-2 gap-6 items-start">
        <div className="rounded-2xl overflow-hidden border border-border">
          <img src={cristo} alt="Vista do Rio com Cristo Redentor" loading="lazy" width={1536} height={1024} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-4">
          {TRANSPORT.map((t) => (
            <article key={t.title} className="p-5 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <t.icon className="w-5 h-5 text-primary" />
                <h3 className="font-bold">{t.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
              <p className="text-xs mt-2 p-2 rounded-lg bg-secondary">💡 {t.tip}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
