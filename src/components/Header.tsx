'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  showBack?: boolean;
  backHref?: string;
}

export default function Header({ showBack = false, backHref = "/" }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-navy border-b-4 border-gold shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-gold tracking-tight">
            Assessment KGA-F
          </h1>
          <p className="text-xs text-light-teal font-semibold">
            Fundación Grupo Cajamar
          </p>
        </Link>

        {showBack && (
          <button
            onClick={handleBack}
            className="px-4 py-2 text-cream hover:bg-deep-blue rounded transition-colors duration-200"
          >
            ← Atrás
          </button>
        )}
      </div>
    </header>
  );
}
