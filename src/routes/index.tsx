import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Send, Sparkles, Calendar, Map, Hotel, Camera, UtensilsCrossed, Cloud, Compass, Shield, Bell, DollarSign } from "lucide-react";
import { sendChatMessage } from "@/lib/chat.functions";
import cristo from "@/assets/cristo-hero.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RioLocal — Capital do Samba! Seu guia turístico do Rio de Janeiro" },
      { name: "description", content: "Eventos, rotas, hotéis, comida típica, câmbio, segurança e dicas locais para sua viagem ao Rio. RioLocal: Capital do Samba!" },
      { property: "og:title", content: "RioLocal — Capital do Samba!" },
      { property: "og:description", content: "Tudo para sua viagem ao Rio em um só lugar." },
      { property: "og:image", content: cristo },
    ],
  }),
});

const TABS = [
  { to: "/eventos", icon: Calendar, label: "Eventos", desc: "Carnaval, shows e blocos" },
  { to: "/rotas", icon: Map, label: "Rotas", desc: "Roteiros prontos por dia" },
  { to: "/hoteis", icon: Hotel, label: "Hotéis", desc: "Onde se hospedar" },
  { to: "/locais", icon: Camera, label: "Locais turísticos", desc: "Cristo, Pão, praias…" },
  { to: "/comida", icon: UtensilsCrossed, label: "Comida típica", desc: "Feijoada, açaí, picanha" },
  { to: "/clima", icon: Cloud, label: "Clima & Transporte", desc: "Voos, ônibus, metrô" },
  { to: "/preferencias", icon: Compass, label: "Seu perfil de viagem", desc: "Recomendações sob medida" },
  { to: "/seguranca", icon: Shield, label: "Segurança", desc: "Antiassédio e antirroubo" },
  { to: "/noticias", icon: Bell, label: "Notícias & alertas", desc: "Eventos perto de você" },
  { to: "/conversor", icon: DollarSign, label: "Câmbio", desc: "Converta para reais" },
] as const;

type Msg = { role: "user" | "assistant"; content: string };

function Index() {
  const send = useServerFn(sendChatMessage);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  function getSessionId() {
    let id = localStorage.getItem("rio_session_id");
    if (!id) { id = crypto.randomUUID(); localStorage.setItem("rio_session_id", id); }
    return id;
  }

  async function submit(text: string) {
    const t = text.trim();
    if (!t || loading) return;
    setMessages((p) => [...p, { role: "user", content: t }]);
    setInput("");
    setLoading(true);
    try {
      const res = await send({ data: { sessionId: getSessionId(), conversationId, userMessage: t, history: messages.slice(-20) } });
      if (res.error) setMessages((p) => [...p, { role: "assistant", content: `⚠️ ${res.error}` }]);
      else if (res.reply) {
        setMessages((p) => [...p, { role: "assistant", content: res.reply! }]);
        if (res.conversationId) setConversationId(res.conversationId);
      }
    } catch { setMessages((p) => [...p, { role: "assistant", content: "⚠️ Erro de conexão." }]); }
    finally { setLoading(false); }
  }

  return (
    <main>
      {/* Hero with Cristo */}
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Bem-vindo
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] mb-4">
              <span className="text-primary">RioLocal</span>,<br />
              Capital do <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Samba!</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mb-6">
              Tudo o que você precisa para uma viagem incrível ao Rio: eventos, rotas, hotéis, comida típica, câmbio, segurança e um guia local com IA.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/preferencias" className="px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-lg">Descobrir meu perfil</Link>
              <Link to="/rotas" className="px-5 py-3 rounded-full bg-card border border-border font-medium hover:border-primary transition">Ver rotas prontas</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-accent/30 blur-3xl rounded-full" />
            <img src={cristo} alt="Cristo Redentor ao pôr do sol no Rio de Janeiro" width={1536} height={1024} className="relative rounded-3xl shadow-2xl object-cover w-full h-[360px] md:h-[460px]" />
          </div>
        </div>
      </section>

      {/* Tab grid */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-5">Explore por categoria</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {TABS.map((t) => (
            <Link key={t.to} to={t.to} className="group p-4 rounded-2xl border border-border bg-card hover:border-primary hover:-translate-y-0.5 transition shadow-sm">
              <t.icon className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition" />
              <div className="font-semibold text-sm">{t.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{t.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Chat */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="font-bold">Pergunte ao Guia Local (IA)</h2>
          </div>
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {["Roteiro econômico de 2 dias", "O que fazer com chuva?", "Bairros mais seguros"].map((s) => (
                <button key={s} onClick={() => submit(s)} className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition">{s}</button>
              ))}
            </div>
          )}
          {messages.length > 0 && (
            <div ref={scrollRef} className="flex flex-col gap-3 mb-4 max-h-80 overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap ${m.role === "user" ? "self-end bg-primary text-primary-foreground" : "self-start bg-secondary"}`}>{m.content}</div>
              ))}
              {loading && <div className="self-start text-xs text-muted-foreground">digitando…</div>}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); submit(input); }} className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pergunte sobre o Rio…" maxLength={500} className="flex-1 px-3 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:border-primary" />
            <button disabled={loading || !input.trim()} className="px-4 rounded-xl bg-primary text-primary-foreground disabled:opacity-40"><Send className="w-4 h-4" /></button>
          </form>
        </div>
      </section>
    </main>
  );
}
