
"use server";

/**
 * Envia uma notificação de novo agendamento para um webhook do Discord.
 * Esta função é um placeholder e pode ser expandida no futuro.
 * Para usar, defina a variável de ambiente DISCORD_WEBHOOK_URL.
 * 
 * @param appointmentData Os dados do agendamento.
 * @param scheduledBy O nome do usuário que agendou.
 */
export async function notifyAppointmentToDiscord(
    appointmentData: any,
    scheduledBy: string
): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("Variável de ambiente DISCORD_WEBHOOK_URL não definida. Notificação pulada.");
    return;
  }

  const { patientName, specialty, patientAvailability } = appointmentData;

  const embed = {
    title: "Novo Agendamento Recebido",
    color: 0x0ea5e9, // Cor azul-claro
    fields: [
      { name: "Paciente", value: patientName, inline: true },
      { name: "Especialidade", value: specialty, inline: true },
      { name: "Disponibilidade", value: patientAvailability },
      { name: "Agendado Por", value: scheduledBy, inline: true },
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: "Alta Centro Médico - Sistema de Agendamentos",
    },
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!response.ok) {
      console.error(`Erro ao enviar notificação para o Discord: ${response.statusText}`);
    } else {
        console.log("Notificação de agendamento enviada para o Discord com sucesso.");
    }
  } catch (error) {
    console.error("Falha ao enviar notificação para o Discord:", error);
  }
}
