import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Title, TitleTableProps } from "../../types/titleTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import DeleteTitle from "../deleteTitle";
import AddEditTitle from "../addEditTitle";

export default function TitleTable({ titles, callback }: TitleTableProps) {
  return (
    <Table className="flex flex-col w-full items-center">
      <TableCaption className="mb-4 font-extrabold">
        Lista dos Títulos registrados
      </TableCaption>
      <TableHeader className="flex justify-center w-full">
        <TableRow className="grid grid-cols-10 lg:w-9/12 md:w-full">
          <TableHead className="text-center h-fit p-2">ID</TableHead>
          <TableHead className="col-span-6 text-center h-fit p-2">
            Descrição
          </TableHead>
          <TableHead className="col-span-3 text-center h-fit p-2">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="flex flex-col items-center w-full">
        {titles.length === 0 && (
          <TableRow className="grid grid-cols-10 w-9/12">
            <TableCell className="col-span-10">
              Não há registro de títulos
            </TableCell>
          </TableRow>
        )}
        {titles.length > 0 && (
          <ScrollArea className=" flex h-[450px] lg:w-9/12 md:w-full">
            {titles.map((title: Title, index: number) => {
              return (
                <TableRow
                  key={title.id}
                  className={`grid grid-cols-10 w-full ${
                    index % 2 === 0 && ""
                  }`}
                >
                  <TableCell className="text-center h-fit p-2">
                    {title.id}
                  </TableCell>
                  <TableCell className="text-center col-span-6 h-fit p-2">
                    {title.description}
                  </TableCell>
                  <TableCell className="flex md:flex-row justify-around col-span-3 h-fit p-2 flex-col gap-2">
                    <AddEditTitle
                      buttonTitle="Editar"
                      confirmButtonTitle="Salvar Alterações"
                      icon={<Pen />}
                      dialogTitle="Editar Título"
                      titleId={title.id}
                      titleDescription={title.description}
                      description={`As alterções serão realizadas no título de ID ${title.id}`}
                      callback={callback}
                    />
                    <DeleteTitle
                      title={{id: title.id, description: title.description}}
                      callback={callback}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </ScrollArea>
        )}
      </TableBody>
    </Table>
  );
}
