import { Toaster } from "@/components/ui/toaster";
import Header from "../template/header";

export default function TitleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col w-screen h-screen">
        <Header title="CRUD de Títulos" />
        <main className="flex flex-grow">{children}</main>
        <Toaster/>
      </body>
    </html>
  );
}
