import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LogIn, UserPlus, LogOut, Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/conta")({
  component: ContaPage,
  head: () => ({
    meta: [
      { title: "Minha conta — RioLocal" },
      { name: "description", content: "Crie sua conta no RioLocal para salvar roteiros, eventos favoritos e receber alertas." },
    ],
  }),
});

function ContaPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null); setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/conta" } });
        if (error) setMsg("⚠️ " + error.message);
        else setMsg("✅ Conta criada! Verifique seu e-mail para confirmar.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setMsg("⚠️ " + error.message);
      }
    } finally { setLoading(false); }
  }

  async function logout() { await supabase.auth.signOut(); setMsg(null); }

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <div className="rounded-3xl border border-border bg-card p-7 shadow-xl">
        {user ? (
          <>
            <h1 className="text-2xl font-bold mb-1">Olá, {user.email?.split("@")[0]}!</h1>
            <p className="text-sm text-muted-foreground mb-6">Você está conectado ao RioLocal.</p>
            <button onClick={logout} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground transition">
              <LogOut className="w-4 h-4" />Sair
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-1">{mode === "login" ? "Entrar" : "Criar conta"}</h1>
            <p className="text-sm text-muted-foreground mb-6">Salve roteiros, favoritos e receba alertas de eventos.</p>
            <form onSubmit={submit} className="space-y-3">
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">E-mail</span>
                <div className="mt-1 flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-background focus-within:border-primary">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 bg-transparent text-sm focus:outline-none" placeholder="voce@email.com" />
                </div>
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Senha</span>
                <div className="mt-1 flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-background focus-within:border-primary">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 bg-transparent text-sm focus:outline-none" placeholder="mín. 6 caracteres" />
                </div>
              </label>
              <button disabled={loading} type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 font-medium">
                {mode === "login" ? <><LogIn className="w-4 h-4" />Entrar</> : <><UserPlus className="w-4 h-4" />Criar conta</>}
              </button>
            </form>
            {msg && <p className="text-xs mt-3 p-2 rounded-lg bg-secondary">{msg}</p>}
            <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMsg(null); }} className="w-full text-xs text-primary mt-4 hover:underline">
              {mode === "login" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entre"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
