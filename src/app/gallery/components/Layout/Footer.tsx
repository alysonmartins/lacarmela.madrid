import { Instagram } from "lucide-react";

interface FooterProps {
  fullName: string;
  instagram?: string;
}

export function Footer({ instagram }: FooterProps) {
  if (!instagram) return null;

  return (
    <footer className="fixed bottom-20 right-4">
      <a
        href={`https://www.instagram.com/${instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-white opacity-80 hover:opacity-100 px-4 py-2 rounded-full shadow-lg transition-all duration-200 bg-linear-to-bl from-violet-500 to-fuchsia-500"
      >
        <Instagram size={20} />
        <span className="text-sm font-medium">{instagram}</span>
      </a>
    </footer>
  );
}
