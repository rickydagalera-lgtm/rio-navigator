export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-16 py-8 text-center text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 space-y-1">
        <p className="font-display text-base text-foreground">RioLocal · Capital do Samba!</p>
        <p>🤖 Conteúdo curado com auxílio de IA. Horários, preços e disponibilidade podem mudar — confirme nos sites oficiais.</p>
        <p>Feito com 💛 para turistas e cariocas. © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
