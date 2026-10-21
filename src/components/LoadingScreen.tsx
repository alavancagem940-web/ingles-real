export function LoadingScreen() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
      <div className="size-16 animate-pulse rounded-full bg-gold shadow-[0_0_0_8px_rgba(232,184,109,0.18)]" />
      <h1 className="text-2xl font-extrabold text-white">Carregando a trilha…</h1>
      <p className="text-sm text-muted">Preparando o teste de nivelamento, o progresso local e a voz Jenny.</p>
      <div className="h-2 w-48 overflow-hidden rounded-full bg-line">
        <div className="h-full w-1/2 animate-[slide_1.1s_ease-in-out_infinite] rounded-full bg-gold" />
      </div>
    </div>
  )
}
