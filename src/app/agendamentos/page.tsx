import { AppointmentForm } from "./appointment-form";

export default function AgendamentosPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Agendar Consulta</h1>
      <p className="text-muted-foreground">
        Preencha o formulário abaixo para criar um novo agendamento para o paciente.
      </p>
      <AppointmentForm />
    </div>
  );
}
