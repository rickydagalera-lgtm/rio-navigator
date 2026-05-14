import { createFileRoute } from "@tanstack/react-router";
import { Bell, MapPin, ExternalLink } from "lucide-react";
import eventos from "@/assets/eventos-rio.jpg";
import beach from "@/assets/rio-beach.jpg";
import comida from "@/assets/comida-tipica.jpg";
import { useState } from "react";

export const Route = createFileRoute("/noticias")({
  component: NoticiasPage,
  head: () => ({
    meta: [
      { title: "Notícias e alertas para turistas no Rio | RioLocal" },
      { name: "description", content: "Notícias, eventos próximos e alertas em tempo real para turistas no Rio de Janeiro." },
    ],
  }),
});

const NEWS = [
  { id: "1", tag: "Acontecendo agora", title: "Roda de samba na Pedra do Sal hoje às 19h", desc: "Tradição secular no Largo João da Baiana. Entrada gratuita, leve dinheiro vivo para os ambulantes.", area: "Saúde · Centro", image: eventos, link: "https://www.instagram.com/explore/tags/pedradosal/" },
  { id: "2", tag: "Alerta", title: "Mar agitado em Copacabana e Ipanema", desc: "Marinha emite aviso de ressaca até quinta. Banho com cautela e respeitar bandeiras vermelhas dos guarda-vidas.", area: "Zona Sul", image: beach, link: "https://www.marinha.mil.br/" },
  { id: "3", tag: "Novidade", title: "Linha 4 do metrô amplia horário de domingo", desc: "Operação especial até meia-noite durante temporada de verão. Confira estações abertas no app MetrôRio.", area: "Cidade", image: beach, link: "https://www.metrorio.com.br/" },
  { id: "4", tag: "Gastronomia", title: "Festival Comida di Buteco começa sexta", desc: "+50 botequins concorrem ao melhor petisco. Cardápio fixo R$ 39,90 com chope.", area: "Cidade toda", image: comida, link: "https://comidadibuteco.com.br/" },
  { id: "5", tag: "Cultura", title: "Museu do Amanhã com entrada grátis nesta terça", desc: "Toda terça-feira a entrada é gratuita. Chegue cedo — fila costuma ser grande no verão.", area: "Praça Mauá · Centro", image: eventos, link: "https://museudoamanha.org.br/" },
];

function NoticiasPage() {
  const [enabled, setEnabled] = useState(false);

  function askPermission() {
    if (typeof Notification === "undefined") { alert("Seu navegador não suporta notificações."); return; }
    Notification.requestPermission().then((p) => {
      setEnabled(p === "granted");
      if (p === "granted") new Notification("RioLocal ativado!", { body: "Você receberá alertas de eventos próximos." });
    });
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-1.5"><Bell className="w-3.5 h-3.5" />Para o turista</p>
          <h1 className="text-4xl font-bold mt-2">Notícias & alertas</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">Eventos perto, alertas de praia, transporte e gastronomia.</p>
        </div>
        <button onClick={askPermission} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition ${enabled ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:border-primary"}`}>
          <Bell className="w-4 h-4" />{enabled ? "Notificações ativas" : "Ativar notificações"}
        </button>
      </header>

      <div className="grid md:grid-cols-2 gap-5">
        {NEWS.map((n) => (
          <article key={n.id} className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition">
            <div className="aspect-[16/8] overflow-hidden"><img src={n.image} alt={n.title} loading="lazy" width={1280} height={640} className="w-full h-full object-cover" /></div>
            <div className="p-5">
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/30 text-accent-foreground">{n.tag}</span>
              <h3 className="font-bold text-lg mt-2 leading-tight">{n.title}</h3>
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" />{n.area}</div>
              <p className="text-sm mt-3">{n.desc}</p>
              <a href={n.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground">
                Saiba mais <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
