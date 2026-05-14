import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { convertToBRL } from "@/lib/currency.functions";
import { DollarSign, ArrowRight, Smartphone } from "lucide-react";

export const Route = createFileRoute("/conversor")({
  component: ConversorPage,
  head: () => ({
    meta: [
      { title: "Conversor de moedas para Real (BRL) | RioLocal" },
      { name: "description", content: "Converta dólar, euro, libra e outras moedas para reais e veja apps recomendados para câmbio no Brasil." },
    ],
  }),
});

const CURRENCIES = ["USD", "EUR", "GBP", "ARS", "CLP", "AUD", "CAD", "CHF", "JPY", "MXN"];

function ConversorPage() {
  const convert = useServerFn(convertToBRL);
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [result, setResult] = useState<{ converted: number; rate: number; date: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function go(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try { setResult(await convert({ data: { amount, from } })); } finally { setLoading(false); }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" />Câmbio</p>
        <h1 className="text-4xl font-bold mt-2">Converter para Reais</h1>
        <p className="text-muted-foreground mt-2">Cotação oficial via Frankfurter API (BCE). Atualizada diariamente.</p>
      </header>

      <form onSubmit={go} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="grid sm:grid-cols-[1fr_auto_140px_auto] gap-3 items-end">
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Valor</span>
            <input type="number" min={1} max={1000000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-1 w-full px-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-primary" />
          </label>
          <ArrowRight className="hidden sm:block w-5 h-5 text-muted-foreground self-center mb-2" />
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Moeda</span>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-primary">
              {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <button disabled={loading} className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium disabled:opacity-50">{loading ? "..." : "Converter"}</button>
        </div>

        {result && !result.error && (
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <div className="text-xs text-muted-foreground">Resultado ({result.date})</div>
            <div className="text-3xl font-bold text-primary mt-1">R$ {result.converted.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground mt-1">1 {from} = R$ {result.rate.toFixed(4)}</div>
          </div>
        )}
        {result?.error && <p className="text-xs mt-3 text-destructive">{result.error}</p>}
      </form>

      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Smartphone className="w-5 h-5 text-primary" />Apps recomendados para trocar dinheiro</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: "Wise", desc: "Câmbio com taxa real do mercado, cartão multimoedas. Excelente para turistas.", url: "https://wise.com" },
            { name: "Nomad", desc: "Conta digital em USD para brasileiros e estrangeiros — IOF baixo.", url: "https://nomadglobal.com" },
            { name: "Confidence Câmbio", desc: "Casa de câmbio tradicional com unidades nos aeroportos GIG e SDU.", url: "https://www.confidencecambio.com.br" },
            { name: "Western Union", desc: "Envio internacional, retirada em dinheiro em várias agências do Rio.", url: "https://www.westernunion.com" },
          ].map((a) => (
            <a key={a.name} href={a.url} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl border border-border bg-card hover:border-primary transition">
              <div className="font-semibold">{a.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{a.desc}</div>
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">⚠️ Evite trocar dinheiro em casas sem registro do Banco Central. Prefira aeroporto, agências oficiais ou apps regulados.</p>
      </section>
    </main>
  );
}
