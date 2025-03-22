"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddEditTitleProps } from "../../types/titleTypes";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTitle, updatedTitle } from "../../service/titleService";
import { useToast } from "@/hooks/use-toast";

export default function AddEditTitle({
  titleId,
  titleDescription,
  buttonTitle,
  confirmButtonTitle,
  icon,
  description,
  dialogTitle,
  callback
}: AddEditTitleProps) {
  const formSchema = z.object({
    titleDescription: z
      .string()
      .min(3, {
        message: "A descrição deve ter no mínimo 3 caracteres.",
      })
      .max(150, {
        message: "A descrição deve ter no máximo 150 caracteres.",
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleDescription: titleDescription,
    },
  });
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let data;
      if (titleId) {
        data = await updatedTitle(titleId, values.titleDescription);
      }else {
        data = await addTitle(values.titleDescription);
      }

      if (data) {
        toast({
          title: "Dados salvos com sucesso!",
          description: "Os dados foram salvos no backend.",
        });

        callback(true);
        
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao salvar dados.",
          description: "Não foi possível salvar os dados no backend.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar dados.",
        description: "Não foi possível salvar os dados no backend.",
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          {buttonTitle}
          {icon}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="titleDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Está é a descrição do título
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{confirmButtonTitle}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
