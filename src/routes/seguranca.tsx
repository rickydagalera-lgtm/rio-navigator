import { createFileRoute } from "@tanstack/react-router";
import { Shield, Phone, AlertTriangle, Heart } from "lucide-react";
import safetyImg from "@/assets/safety-icon.png";

export const Route = createFileRoute("/seguranca")({
  component: SegurancaPage,
  head: () => ({
    meta: [
      { title: "Segurança no Rio — antiassédio, antirroubo e proteção | RioLocal" },
      { name: "description", content: "Dicas práticas de segurança para mulheres e turistas no Rio: antiassédio, antirroubo, transporte seguro e contatos úteis." },
    ],
  }),
});

const TIPS = [
  {
    icon: Heart,
    title: "Contra o assédio (foco em mulheres)",
    color: "from-destructive to-accent",
    items: [
      "Use o vagão rosa do metrô em horários de pico (apenas mulheres).",
      "Apps de transporte com a opção 'Mulher dirige para mulher' (Lady Driver, 99Mulher).",
      "Em caso de assédio em transporte público, ligue para a Central Lilás: 180.",
      "Compartilhe a viagem em tempo real com amigos (Uber/99 têm essa função).",
      "Ao sair à noite, prefira grupos. Evite andar sozinha em ruas mal iluminadas.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Antirroubo (geral)",
    color: "from-primary to-accent",
    items: [
      "Não exiba celular caro, joias ou câmera profissional na rua.",
      "Use apenas pochete ou bolsa cruzada com fecho na frente do corpo.",
      "Na praia, leve só o essencial: nada de bolsa cheia ou laptop.",
      "Evite mostrar dinheiro em público — pague com cartão sempre que possível.",
      "Se for abordado, NÃO reaja. Entregue o que pedirem — sua vida vale mais.",
    ],
  },
  {
    icon: Shield,
    title: "Proteção no dia a dia",
    color: "from-primary to-secondary",
    items: [
      "Tire foto de seus documentos e guarde no e-mail/Google Drive.",
      "Saia com cópia do passaporte; deixe o original no cofre do hotel.",
      "Evite áreas de risco à noite: morros sem batalhão UPP, ruas vazias do Centro.",
      "Use Uber/99 em vez de táxi de rua, especialmente à noite.",
      "Avise o hotel de seus planos diários — eles são uma rede de apoio.",
    ],
  },
];

const PHONES = [
  { name: "Polícia Militar", number: "190" },
  { name: "Central Lilás (mulheres)", number: "180" },
  { name: "Disque Denúncia", number: "181" },
  { name: "Bombeiros / SAMU", number: "192 / 193" },
  { name: "Polícia Turística (DEAT)", number: "(21) 2334-6802" },
];

function SegurancaPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8 grid md:grid-cols-[1fr_220px] gap-6 items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-destructive font-bold flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" />Sua segurança importa</p>
          <h1 className="text-4xl font-bold mt-2">Viaje protegida(o)</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">Dicas práticas focadas em assédio, roubo e proteção — escritas com base em quem mora no Rio.</p>
        </div>
        <img src={safetyImg} alt="Símbolo de pare contra assédio e violência" loading="lazy" width={1024} height={1024} className="w-40 h-40 object-contain mx-auto" />
      </header>

      <div className="grid lg:grid-cols-3 gap-5">
        {TIPS.map((t) => (
          <article key={t.title} className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
            <div className={`p-4 bg-gradient-to-br ${t.color} text-primary-foreground`}>
              <t.icon className="w-6 h-6 mb-2" />
              <h3 className="font-bold">{t.title}</h3>
            </div>
            <ul className="p-5 space-y-2.5">
              {t.items.map((item, i) => (
                <li key={i} className="text-sm flex gap-2"><span className="text-primary font-bold">·</span><span>{item}</span></li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="mt-10 p-5 rounded-2xl border-2 border-destructive/40 bg-destructive/5">
        <h2 className="font-bold flex items-center gap-2 mb-3"><Phone className="w-5 h-5 text-destructive" />Telefones de emergência</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {PHONES.map((p) => (
            <a key={p.name} href={`tel:${p.number.replace(/\D/g, "")}`} className="px-4 py-3 rounded-xl bg-card border border-border hover:border-destructive transition flex items-center justify-between">
              <span className="text-sm">{p.name}</span>
              <span className="font-bold text-destructive">{p.number}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
