import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/eventos", label: "Eventos" },
  { to: "/rotas", label: "Rotas" },
  { to: "/hoteis", label: "Hotéis" },
  { to: "/locais", label: "Locais" },
  { to: "/comida", label: "Comida" },
  { to: "/clima", label: "Clima & Transporte" },
  { to: "/preferencias", label: "Seu perfil" },
  { to: "/seguranca", label: "Segurança" },
  { to: "/noticias", label: "Notícias" },
  { to: "/conversor", label: "Câmbio" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
    });
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user?.email ?? null));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/75">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-md">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="leading-none">
            <div className="font-bold text-base">RioLocal</div>
            <div className="text-[10px] uppercase tracking-widest text-primary font-semibold">Capital do Samba</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="px-2.5 py-1.5 rounded-md hover:bg-secondary transition data-[status=active]:text-primary data-[status=active]:font-semibold"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/conta"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            <User className="w-3.5 h-3.5" />
            {email ? email.split("@")[0] : "Entrar"}
          </Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-md hover:bg-secondary" aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95">
          <nav className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                className="px-3 py-2 rounded-md hover:bg-secondary data-[status=active]:text-primary data-[status=active]:font-semibold"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/conta" onClick={() => setOpen(false)} className="col-span-2 mt-1 px-3 py-2 rounded-md bg-primary text-primary-foreground text-center font-medium">
              {email ? `Conta · ${email.split("@")[0]}` : "Entrar / Criar conta"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
