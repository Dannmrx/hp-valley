
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SPECIALTIES } from "./constants";
import { useTransition } from "react";
import { scheduleAppointment } from "./actions";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth-provider";

const formSchema = z.object({
  patientName: z.string().min(1, "Nome do paciente é obrigatório."),
  patientPassport: z.string().regex(/^\d+$/, "Passaporte deve conter apenas números.").min(1, "Passaporte do paciente é obrigatório."),
  patientPhone: z.string().regex(/^\d+$/, "Telefone deve conter apenas números.").min(1, "Telefone do paciente é obrigatório."),
  consultationReason: z.string().min(1, "Motivo da consulta é obrigatório."),
  patientAvailability: z.string().min(1, "Disponibilidade é obrigatória."),
  specialty: z.string().min(1, "Especialidade é obrigatória."),
});

export type AppointmentFormValues = z.infer<typeof formSchema>;

export function AppointmentForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { user } = useAuth();


  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      patientPassport: "",
      patientPhone: "",
      consultationReason: "",
      patientAvailability: "",
      specialty: "",
    },
  });

  const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ''); // Remove all non-digit characters
    fieldChange(numericValue);
  };

  function onSubmit(values: AppointmentFormValues) {
    if (!user?.displayName) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Usuário não autenticado. Por favor, faça login novamente.",
      });
      return;
    }

    startTransition(async () => {
      const { success, error } = await scheduleAppointment(values, user.displayName!);
      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao agendar",
          description: error,
        });
        return;
      }
      
      toast({
          title: "Agendamento enviado!",
          description: "A equipe médica foi notificada e entrará em contato em breve.",
      });
      form.reset();
    });
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do paciente</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: João da Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="patientPassport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passaporte do paciente <span className="text-muted-foreground">(apenas números)</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: 123456" 
                          {...field} 
                          onChange={(e) => handleNumericInputChange(e, field.onChange)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="patientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone do paciente <span className="text-muted-foreground">(apenas números)</span></FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: 11999998888" 
                          {...field} 
                          onChange={(e) => handleNumericInputChange(e, field.onChange)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especialidade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a especialidade médica" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SPECIALTIES.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="consultationReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motivo da Consulta</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Ex: Dor de cabeça persistente" {...field} rows={6} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="patientAvailability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disponibilidade do Paciente</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Ex: Segundas e quartas à tarde, sextas o dia todo" {...field} rows={6} />
                      </FormControl>
                       <FormDescription>
                        Descreva os dias e horários que o paciente prefere ser atendido.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-full flex justify-end">
                <Button type="submit" disabled={isPending} size="lg">
                  {isPending ? <Loader2 className="animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Enviar Agendamento
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
