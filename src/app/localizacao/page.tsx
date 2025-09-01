import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function LocalizacaoPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Nossa Localização</h1>
      <p className="text-muted-foreground">
        Encontre-nos e entre em contato. Estamos prontos para atendê-lo.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Alta Centro Médico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Endereço</p>
                <p className="text-muted-foreground">
                  Av. Paulista, 1234 - Bela Vista
                  <br />
                  São Paulo - SP, 01310-100, Brasil
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Telefone</p>
                <p className="text-muted-foreground">+55 (11) 3333-4444</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-muted-foreground">contato@altacare.med.br</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="overflow-hidden rounded-lg">
          <Image
            src="https://picsum.photos/800/600?grayscale"
            alt="Mapa da localização do Alta Centro Médico"
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            data-ai-hint="city map"
          />
        </div>
      </div>
    </div>
  );
}
