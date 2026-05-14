import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Compass, RefreshCw } from "lucide-react";
import beach from "@/assets/rio-beach.jpg";
import eventos from "@/assets/eventos-rio.jpg";
import cristo from "@/assets/cristo-hero.jpg";
import comida from "@/assets/comida-tipica.jpg";

export const Route = createFileRoute("/preferencias")({
  component: PreferenciasPage,
  head: () => ({
    meta: [
      { title: "Seu perfil de viagem — recomendações personalizadas | RioLocal" },
      { name: "description", content: "Responda 3 perguntas e receba recomendações sob medida para sua viagem ao Rio." },
    ],
  }),
});

type Q = { id: string; text: string; options: { id: string; label: string }[] };
const QUESTIONS: Q[] = [
  { id: "vibe", text: "Você prefere viajar…", options: [{ id: "casual", label: "Sem compromisso, livre" }, { id: "show", label: "Para um show ou festival" }, { id: "ponto", label: "Para conhecer pontos turísticos clássicos" }] },
  { id: "crowd", text: "E o lugar ideal é…", options: [{ id: "lotado", label: "Cheio de gente, animado" }, { id: "sossego", label: "Sossegado e tranquilo" }] },
  { id: "budget", text: "Seu orçamento por dia é…", options: [{ id: "low", label: "Econômico (até R$ 200)" }, { id: "mid", label: "Médio (R$ 200–600)" }, { id: "high", label: "Alto (R$ 600+)" }] },
];

const RECOS: Record<string, { title: string; image: string; tips: string[] }> = {
  "casual|sossego|low": { title: "Carioca relax pé na areia", image: beach, tips: ["Mureta da Urca para o pôr do sol (cervejinha barata)", "Praia do Leme (mais tranquila que Copa)", "Parque Lage para um café e trilha curta", "Use ônibus + caminhada; cartão Giro Carioca"] },
  "casual|lotado|low": { title: "Vibração de boteco", image: eventos, tips: ["Pedra do Sal (segunda) — samba grátis", "Lapa nas sextas — música ao vivo nos botecos", "Feira de São Cristóvão (sábado) — forró e comida nordestina", "Vá em grupo, deixe valores em casa"] },
  "show|lotado|mid": { title: "O Rio que vibra alto", image: eventos, tips: ["Rock in Rio, Carnaval ou shows na Jeunesse Arena", "Ingressos antecipados (Eventim, Ingresse)", "Hospede em Botafogo ou Lapa para chegar de Uber", "Sempre vá com app de transporte de confiança"] },
  "ponto|lotado|mid": { title: "Clássicos do cartão postal", image: cristo, tips: ["Cristo Redentor + Pão de Açúcar (mesmo dia, manhã/tarde)", "Praias de Ipanema e Copacabana", "Maracanã com tour guiado", "Compre ingressos antecipados para evitar filas"] },
  "ponto|sossego|high": { title: "Rio sofisticado e exclusivo", image: cristo, tips: ["Hotel boutique em Santa Teresa ou Ipanema", "Tour privado ao Corcovado ao amanhecer", "Jardim Botânico no fim de tarde", "Reservas em Aprazível e Oro (cozinha autoral)"] },
  "casual|sossego|mid": { title: "Equilíbrio perfeito", image: beach, tips: ["Caminhada no Arpoador ao nascer do sol", "Almoço no Galeto Sat's (Copacabana)", "Tarde no Parque Lage", "Jantar em Botafogo (Comuna ou Meza Bar)"] },
};

function key(a: Record<string, string>) { return `${a.vibe}|${a.crowd}|${a.budget}`; }

function PreferenciasPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const reco = RECOS[key(answers)] ?? null;
  const allAnswered = QUESTIONS.every((q) => answers[q.id]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1.5"><Compass className="w-3.5 h-3.5" />Perfil de viagem</p>
        <h1 className="text-4xl font-bold mt-2">Que tipo de viajante você é?</h1>
        <p className="text-muted-foreground mt-2 max-w-xl">Responda 3 perguntinhas rápidas e receba recomendações sob medida.</p>
      </header>

      <div className="space-y-6">
        {QUESTIONS.map((q) => (
          <div key={q.id} className="p-5 rounded-2xl border border-border bg-card">
            <h3 className="font-semibold mb-3">{q.text}</h3>
            <div className="flex flex-wrap gap-2">
              {q.options.map((o) => {
                const sel = answers[q.id] === o.id;
                return (
                  <button key={o.id} onClick={() => setAnswers((s) => ({ ...s, [q.id]: o.id }))} className={`px-4 py-2 text-sm rounded-full border transition ${sel ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {allAnswered && (
        <div className="mt-8 rounded-3xl overflow-hidden border-2 border-primary shadow-2xl">
          <img src={reco?.image ?? comida} alt={reco?.title ?? "Recomendação"} loading="lazy" width={1280} height={896} className="w-full h-56 object-cover" />
          <div className="p-6 bg-card">
            <p className="text-xs uppercase tracking-widest text-primary font-bold">Sua recomendação</p>
            <h2 className="text-2xl font-bold mt-1 mb-4">{reco?.title ?? "Roteiro personalizado em construção"}</h2>
            <ul className="space-y-2">
              {(reco?.tips ?? ["Combinação rara! Veja nossas rotas prontas em /rotas para inspiração."]).map((t, i) => (
                <li key={i} className="flex gap-3 text-sm"><span className="shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">{i + 1}</span><span>{t}</span></li>
              ))}
            </ul>
            <button onClick={() => setAnswers({})} className="mt-5 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground"><RefreshCw className="w-3 h-3" />Refazer</button>
          </div>
        </div>
      )}
    </main>
  );
}
