import { ProfileForm } from "./profile-form";


export default function PerfilPage() {
  // This is a server component, so we can't use hooks.
  // We'll rely on the client component to handle auth state.
  // The layout already protects this route.

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Segurança da Conta</h1>
        <p className="text-muted-foreground">
          Gerencie sua senha de acesso.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
