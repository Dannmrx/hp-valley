
"use server";

import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { AppointmentFormValues } from "./appointment-form";
// A função de notificação do Discord foi removida temporariamente para simplificar
// a depuração e garantir que não está causando efeitos colaterais.
// import { notifyAppointmentToDiscord } from "@/services/discord-notifier";

/**
 * Salva um novo agendamento no banco de dados Firestore.
 * @param input Dados do formulário de agendamento.
 * @param userName Nome do usuário que está realizando o agendamento.
 * @returns Objeto indicando sucesso ou falha.
 */
export async function scheduleAppointment(
  input: AppointmentFormValues,
  userName: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const appointmentData = {
      ...input,
      scheduledBy: userName,
      createdAt: serverTimestamp(),
      status: "pending", // 'pending', 'confirmed', 'cancelled'
    };

    const docRef = await addDoc(collection(db, "appointments"), appointmentData);
    console.log("Appointment created with ID: ", docRef.id);


    // Notifica o Discord (opcional, pode ser configurado no futuro)
    // await notifyAppointmentToDiscord(appointmentData, userName);

    return { success: true, error: null };
  } catch (err) {
    console.error("Error creating appointment:", err);
    // Verificamos se 'err' é um objeto de erro para acessar a propriedade 'message'
    const errorMessage = err instanceof Error ? err.message : "Um erro desconhecido ocorreu.";
    return {
      success: false,
      error: `Não foi possível salvar o agendamento. Detalhes: ${errorMessage}`,
    };
  }
}
