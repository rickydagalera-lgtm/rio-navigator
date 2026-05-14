import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Send, MapPin, Sparkles, Shield, Sun } from "lucide-react";
import { sendChatMessage } from "@/lib/chat.functions";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rio Local Guide — Seu guia turístico inteligente do Rio de Janeiro" },
      {
        name: "description",
        content:
          "Planeje sua viagem ao Rio com dicas locais de turismo, custo-benefício, transporte e segurança. Guia turístico com IA.",
      },
      { property: "og:title", content: "Rio Local Guide" },
      { property: "og:description", content: "Guia turístico com IA para o Rio de Janeiro." },
    ],
  }),
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Roteiro de 3 dias com bom custo-benefício",
  "Como ir do aeroporto ao Centro?",
  "O que fazer no Rio em dia de chuva?",
  "Bairros mais seguros para se hospedar",
];

function getSessionId() {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem("rio_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("rio_session_id", id);
  }
  return id;
}

function Index() {
  const send = useServerFn(sendChatMessage);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setConversationId(localStorage.getItem("rio_conversation_id"));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    if (trimmed.length > 2000) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await send({
        data: {
          sessionId: getSessionId(),
          conversationId,
          userMessage: trimmed,
          history: messages.slice(-20),
        },
      });
      if (res.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ ${res.error}` }]);
      } else if (res.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: res.reply! }]);
        if (res.conversationId && res.conversationId !== conversationId) {
          setConversationId(res.conversationId);
          localStorage.setItem("rio_conversation_id", res.conversationId);
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Erro de conexão. Tente novamente." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function newChat() {
    setMessages([]);
    setConversationId(null);
    localStorage.removeItem("rio_conversation_id");
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-md bg-background/60 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none">Rio Local Guide</h1>
              <p className="text-xs text-muted-foreground mt-1">Seu guia local com IA · Rio de Janeiro</p>
            </div>
          </div>
          <button
            onClick={newChat}
            className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition"
          >
            Nova conversa
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
        {messages.length === 0 && (
          <section className="text-center py-10">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Cidade Maravilhosa
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Planeje sua viagem ao <span className="text-primary">Rio</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Roteiros otimizados, dicas de custo-benefício, logística de transporte e segurança —
              tudo num só lugar.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mt-8 max-w-2xl mx-auto text-left">
              {[
                { icon: Sparkles, title: "Custo-benefício", desc: "Dias gratuitos e dicas de economia" },
                { icon: Sun, title: "Melhor época", desc: "Outono é o equilíbrio perfeito" },
                { icon: Shield, title: "Segurança", desc: "Dicas práticas de turista local" },
              ].map((f) => (
                <div key={f.title} className="rounded-2xl border border-border bg-card p-4">
                  <f.icon className="w-5 h-5 text-primary mb-2" />
                  <div className="font-semibold text-sm">{f.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center mt-8">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="text-sm px-4 py-2 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </section>
        )}

        {messages.length > 0 && (
          <div
            ref={scrollRef}
            className="flex flex-col gap-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card border border-border rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="sticky bottom-4 bg-card/90 backdrop-blur border border-border rounded-2xl shadow-xl p-2 flex gap-2 items-end"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(input);
              }
            }}
            placeholder="Pergunte sobre o Rio… (ex: roteiro econômico de 2 dias)"
            rows={1}
            maxLength={2000}
            className="flex-1 resize-none bg-transparent px-3 py-2 text-sm focus:outline-none max-h-32"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition"
            aria-label="Enviar"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-center text-muted-foreground -mt-2">
          🤖 Sou uma IA — horários e preços podem mudar; confirme nos sites oficiais.
        </p>
      </div>
    </main>
  );
}
