import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, HeartPulse, Microscope, Bone, Brain, Eye, Droplets } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Exam = {
  name: string;
  description: string;
  icon: LucideIcon | React.ComponentType<any>;
};

const ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.34 2.843a.5.5 0 0 1 .644.01l.053.052.01.01.004.003c.318.28.69.516 1.05.744.38.24.782.443 1.172.63.417.2.813.386 1.16.592.32.19.598.413.812.676.212.26.35.564.41.908a2.5 2.5 0 0 1-1.332 2.871l-.107.052-.132.056c-1.325.56-2.583.56-3.908 0l-.132-.056-.107-.052a2.5 2.5 0 0 1-1.332-2.871c.06-.344.198-.647.41-.908.214-.263.493-.486.812-.676.347-.206.743-.392 1.16-.592.39-.187.793-.39 1.172-.63.36-.228.732-.464 1.05-.744" />
      <path d="M20 12c0 2.29-2.02 4.14-4.5 4.14-1.22 0-2.32-.45-3.04-.98-.51.36-1.1.6-1.74.75-.43.1-.88.15-1.34.15-1.4 0-2.65-.4-3.5-1-1.28 1.16-3.18 1.16-4.46 0-1.12-.9-1.2-2.4-1.04-3.5.12-.8.5-1.5 1.04-2 .2-.18.4-.35.66-.5.3-.18.6-.32 1.02-.42.4-.1.8-.16 1.3-.16.3 0 .6.02.9.05.3.04.6.1.9.18.2.06.4.13.58.2.14.06.28.1.4.16.15.04.3.1.42.14.48.15.88.35 1.18.52.23.13.45.26.62.4.3.2.5.4.6.6.2.4.3.8.3 1.2 0 1.28-1.2 2.3-2.68 2.3-1.05 0-1.92-.5-2.32-1.2-.18-.3-.3-.6-.35-1-.05-.3-.08-.7-.08-1 0-.6.12-1.15.3-1.65.2-.55.5-.95.88-1.3.4-.34.8-.6 1.15-.8.32-.18.6-.32.8-.45.3-.2.5-.3.6-.4.2-.2.2-.3.2-.4 0-.3-1.1-1.1-1.1-1.1" />
    </svg>
  );

const exams: Exam[] = [
  { name: "Consultas de Clínica Geral", description: "Avaliações de saúde geral e acompanhamento.", icon: Stethoscope },
  { name: "Exames Cardiológicos", description: "Eletrocardiograma, Ecocardiograma, Teste Ergométrico.", icon: HeartPulse },
  { name: "Análises Clínicas", description: "Exames de sangue, urina e fezes para diagnóstico e monitoramento.", icon: Microscope },
  { name: "Exames Ortopédicos", description: "Raio-X, Ressonância Magnética para sistema musculoesquelético.", icon: Bone },
  { name: "Avaliações Neurológicas", description: "Eletroencefalograma e outros testes para o sistema nervoso.", icon: Brain },
  { name: "Exames Oftalmológicos", description: "Testes de acuidade visual, mapeamento de retina.", icon: Eye },
  { name: "Exames de Sangue", description: "Hemograma completo, glicemia, colesterol e outros marcadores.", icon: Droplets },
  { name: "Tratamentos Odontológicos", description: "Limpeza, restaurações, e avaliações da saúde bucal.", icon: ToothIcon },
];

export default function ExamesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Exames e Procedimentos</h1>
      <p className="text-muted-foreground">
        Conheça os principais exames e procedimentos que o Alta Centro Médico oferece.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exams.map((exam) => (
          <Card key={exam.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">{exam.name}</CardTitle>
              <exam.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{exam.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
