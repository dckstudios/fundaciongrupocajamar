import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-deep-blue to-teal">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-gold text-2xl font-bold">Assessment KGA-F</div>
        <Link
          href="/admin"
          className="text-sm text-white/80 hover:text-gold transition-colors"
        >
          Admin
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="max-w-2xl text-center space-y-10">
          {/* Branding */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              Assessment KGA-F
            </h1>
            <p className="text-2xl text-gold font-semibold">
              Fundación Grupo Cajamar
            </p>
            <p className="text-sm text-white/50 italic">by DCK Studios</p>
          </div>

          {/* Description */}
          <div className="space-y-4 text-lg text-white/90 leading-relaxed max-w-xl mx-auto">
            <p>
              Evalúa la disposición de tu organización para la transformación digital y el cambio organizacional.
            </p>
            <p>
              A través de una serie de cuestionarios estructurados, obtendrás un análisis profundo de capacidades,
              colaboración, procesos y madurez tecnológica.
            </p>
            <p className="text-gold font-semibold text-xl pt-2">
              El journey comienza aquí.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Link
              href="/registro"
              className="inline-block px-12 py-4 bg-gold hover:bg-amber-400 text-navy font-bold text-lg rounded-lg transition-all hover:shadow-xl hover:scale-105 duration-200 shadow-lg"
            >
              Comenzar Assessment
            </Link>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-3">
              <div className="text-4xl">📋</div>
              <h3 className="text-gold font-semibold text-lg">Registro</h3>
              <p className="text-sm text-white/80">Completa tus datos básicos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-3">
              <div className="text-4xl">📊</div>
              <h3 className="text-gold font-semibold text-lg">Cuestionarios</h3>
              <p className="text-sm text-white/80">Responde 6 evaluaciones</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-3">
              <div className="text-4xl">📈</div>
              <h3 className="text-gold font-semibold text-lg">Resultados</h3>
              <p className="text-sm text-white/80">Obtén tu análisis completo</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-6 text-center text-white/50 text-sm">
        <p>© 2025 Fundación Grupo Cajamar. Metodología KGA-F by DCK Studios.</p>
      </footer>
    </div>
  );
}
