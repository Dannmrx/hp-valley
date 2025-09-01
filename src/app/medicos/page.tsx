"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Loader2, User, Trash2 } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { EditDoctorDialog } from "./edit-dialog";
import { Button } from "@/components/ui/button";
import { DeleteDoctorDialog } from "./delete-dialog";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  role: string;
  avatar?: string;
};

export default function MedicosPage() {
  const { userData, user } = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [deletingDoctor, setDeletingDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "users"), where("status", "==", "approved"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const doctorsData: Doctor[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          doctorsData.push({
            id: doc.id,
            name: data.name,
            specialty: data.specialty || "Não especificada",
            role: data.role || "Não especificado",
            avatar: data.avatar, // Assuming you have an avatar field
          });
        });
        setDoctors(doctorsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Corpo Clínico</h1>
        <p className="text-muted-foreground">
          Conheça a equipe de especialistas dedicados a cuidar da sua saúde.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doctors.length === 0 ? (
            <p>Nenhum médico encontrado.</p>
          ) : (
            doctors.map((doctor) => (
              <Card key={doctor.id} className="text-center">
                <CardHeader className="items-center">
                  <Avatar className="h-24 w-24">
                    {doctor.avatar ? (
                      <AvatarImage src={doctor.avatar} alt={doctor.name} data-ai-hint="doctor portrait" />
                    ) : (
                       <AvatarFallback>
                        <User className="h-12 w-12 text-muted-foreground" />
                      </AvatarFallback>
                    )}
                    <AvatarFallback>{doctor.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent className="relative">
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{doctor.role}</p>
                  <Badge variant="secondary" className="mt-2">
                    {doctor.specialty}
                  </Badge>
                  {userData?.isAdmin && (
                     <div className="mt-4 flex justify-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingDoctor(doctor)}>
                            Editar
                        </Button>
                         <Button variant="destructive" size="sm" onClick={() => setDeletingDoctor(doctor)} disabled={user?.uid === doctor.id}>
                            <Trash2 className="mr-2 h-4 w-4"/>
                            Deletar
                        </Button>
                     </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      
      {editingDoctor && (
        <EditDoctorDialog
          doctor={editingDoctor}
          isOpen={!!editingDoctor}
          onClose={() => setEditingDoctor(null)}
        />
      )}

      {deletingDoctor && (
        <DeleteDoctorDialog
          doctor={deletingDoctor}
          isOpen={!!deletingDoctor}
          onClose={() => setDeletingDoctor(null)}
        />
      )}
    </>
  );
}
