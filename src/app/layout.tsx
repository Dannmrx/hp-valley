import type { Metadata } from 'next';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { ClientOnly } from '@/components/client-only';

export const metadata: Metadata = {
  title: 'Alta Centro Médico',
  description: 'Agendamento de exames no Alta Centro Médico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ClientOnly>
          <AuthProvider>
            <AppLayout>{children}</AppLayout>
          </AuthProvider>
        </ClientOnly>
        <Toaster />
      </body>
    </html>
  );
}
