import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { DeleteTitleProps} from "../../types/titleTypes";
import { deleteTitle } from "../../service/titleService";
import { useToast } from "@/hooks/use-toast";

export default function DeleteTitle({ title, callback }: DeleteTitleProps) {
  const { toast } = useToast();
  async function handleDelete() {
    try {
      const data = await deleteTitle(title.id);
      if (data) {
        toast({
          title: "Título excluído",
          description: `O título (title.id: ${title.id}, descrição: ${title.description}) foi excluído.`,
        });
        callback(true)
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao excluir o título",
          description: `Não foi possível excluir o títlulo (title.id: ${title.id}, descrição: ${title.description}).`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir o título",
        description: `Não foi possível excluir o títlulo (title.id: ${title.id}, descrição: ${title.description}).`,
      });
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"destructive"}>
          Excluir <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você realmente deseja excluir esse Título?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Este título será removido
            permanentemente dos registros.{" "}
            <span className="font-extrabold">Título: {title.description}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
