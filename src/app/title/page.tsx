"use client";

import { useCallback, useEffect, useState } from "react";
import { Title } from "./types/titleTypes";
import { Skeleton } from "@/components/ui/skeleton";
import { getTitles } from "./service/titleService";
import TitleTable from "./components/titleTable";
import AddEditTitle from "./components/addEditTitle";
import { PlusSquare } from "lucide-react";

export default function TitleCrud() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [titles, setTitles] = useState<Title[]>([]);
  const [loadTitles, setLoadTitles] = useState<boolean>(true);

  const handleTitles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTitles();
      setTitles(data);
    } catch (error) {
      setError("Não foi possível buscar os títulos.");
    } finally {
      setLoading(false);
      setLoadTitles(false);
    }
  }, [loadTitles]);

  useEffect(() => {
    handleTitles();
  }, [handleTitles]);

  if (error) {
    return (
      <div className="flex w-full p-4 justify-center">
        <p className="font-bold text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col w-full gap-1 justify-center items-center mt-8">
        <div className="flex items-start w-9/12">
          <Skeleton className="h-10 w-36"/>
        </div>
        <Skeleton className="h-3 w-80 mb-2" />
        <Skeleton className="h-10 w-9/12" />
        {Array.from({ length: 8 }).map((item: any, index: number) => (
          <Skeleton className="h-14 w-9/12" key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full gap-1 justify-center items-center mt-8">
      <div className="flex items-start w-9/12">
        <AddEditTitle
          buttonTitle="Novo Título"
          confirmButtonTitle="Adiconar"
          dialogTitle="Novo Título"
          icon={<PlusSquare />}
          description="Adcione um novo título."
          callback={setLoadTitles}
        />
      </div>
      <TitleTable titles={titles} callback={setLoadTitles}/>
    </div>
  );
}
