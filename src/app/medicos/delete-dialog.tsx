"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useTransition } from "react";
import type { Doctor } from "./page";
import { Loader2 } from "lucide-react";


interface DeleteDoctorDialogProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteDoctorDialog({ doctor, isOpen, onClose }: DeleteDoctorDialogProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        // Note: This only deletes the Firestore document.
        // For a full user deletion, you would also need to delete the user from Firebase Authentication
        // using a server-side function (e.g., a Firebase Cloud Function) for security reasons.
        // For this app's scope, we'll just delete the Firestore record.
        const userDocRef = doc(db, "users", doctor.id);
        await deleteDoc(userDocRef);
        toast({ title: "Sucesso", description: "Usuário deletado com sucesso." });
        onClose();
      } catch (error) {
        console.error("Error deleting doctor:", error);
        toast({ variant: "destructive", title: "Erro", description: "Não foi possível deletar o usuário." });
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso irá deletar permanentemente a conta de 
            <span className="font-bold"> {doctor.name} </span>
            do banco de dados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Deletar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
