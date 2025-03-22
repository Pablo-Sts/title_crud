import { ModeToggle } from "@/components/themeToggle";
import { HeaderProps } from "./types/headerTypes";

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center justify-center w-full p-4 border-b">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex absolute right-4">
        <ModeToggle />
      </div>
    </header>
  );
}
