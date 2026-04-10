import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-deep-blue">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-navy">
        <div className="flex items-center gap-3">
          <div className="text-gold text-2xl font-bold">Assessment KGA-F</div>
        </div>
        <Link
          href="/admin"
          className="text-sm text-white/70 hover:text-gold transition-colors"
        >
          Admin
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="max-w-2xl text-center space-y-8">
          {/* Branding */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold text-cream tracking-tight">
              Assessment KGA-F
            </h1>
            <p className="text-2xl text-light-teal font-semibold">
              Fundación Grupo Cajamar
            </p>
            <p className="text-sm text-white/60 italic">by DCK Studios</p>
          </div>

          {/* Description */}
          <div className="space-y-4 text-lg text-cream leading-relaxed">
            <p>
              Evalúa la disposición de tu organización para la transformación digital y el cambio organizacional.
            </p>
            <p>
              A través de una serie de cuestionarios estructurados, obtendrás un análisis profundo de capacidades,
              colaboración, procesos y madurez tecnológica.
            </p>
            <p className="text-light-teal font-semibold">
              El journey comienza aquí.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              href="/registro"
              className="inline-block px-12 py-4 bg-gold hover:bg-amber-400 text-navy font-bold text-lg rounded-lg transition-all hover:shadow-lg hover:scale-105 duration-200"
            >
              Comenzar Assessment
            </Link>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="space-y-3">
              <div className="text-4xl">📋</div>
              <h3 className="text-light-teal font-semibold">Registro</h3>
              <p className="text-sm text-white/70">Completa tus datos básicos</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl">📊</div>
              <h3 className="text-light-teal font-semibold">Cuestionarios</h3>
              <p className="text-sm text-white/70">Responde 6 evaluaciones</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl">📈</div>
              <h3 className="text-light-teal font-semibold">Resultados</h3>
              <p className="text-sm text-white/70">Obtén tu análisis completo</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy border-t border-deep-blue px-8 py-6 text-center text-white/60 text-sm">
        <p>© 2025 Fundación Grupo Cajamar. Metodología KGA-F by DCK Studios.</p>
      </footer>
    </div>
  );
}
