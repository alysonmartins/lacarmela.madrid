import Navigation from "@/app/components/Navigation";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="text-center py-10">
      <Navigation />
      <h2 className="text-3xl font-semibold light:text-gray-800 dark:text-zinc-300 hidden">
        {title}
      </h2>
    </header>
  );
}
