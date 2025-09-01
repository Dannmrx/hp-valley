import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Início</h1>
      <Card>
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="text-4xl font-bold tracking-tighter">
                Bem-vindo ao Alta Centro Médico
              </CardTitle>
              <CardDescription className="text-lg">
                Sua saúde, nossa prioridade. Agende seus exames com facilidade e confiança no Alta Centro Médico.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg">
                <Link href="/agendamentos">
                  Agendar um Exame <ArrowRight />
                </Link>
              </Button>
            </CardContent>
          </div>
          <div className="hidden md:block">
            {/* 
              Para usar sua própria imagem, a maneira mais confiável é subí-la no Firebase Storage,
              copiar o URL de download e colar no 'src' abaixo. O domínio do Firebase Storage já
              está autorizado no next.config.js.
            */}
            <Image
              src="https://i.ibb.co/84jvCfR5/hpvalley.png"
              alt="Fachada do Alta Centro Médico"
              width={800}
              height={600}
              className="h-full w-full rounded-r-lg object-cover"
              data-ai-hint="medical center building"
            />
          </div>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Médicos Qualificados</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Nossa equipe é formada por especialistas renomados em diversas áreas, prontos para oferecer o melhor cuidado.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tecnologia de Ponta</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Utilizamos equipamentos de última geração para garantir diagnósticos precisos e seguros.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Atendimento Humanizado</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Valorizamos cada paciente, oferecendo um atendimento atencioso e personalizado em todas as etapas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
