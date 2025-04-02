import axios from "axios";

export class NotificationService {
  async notify(email: string, message: string): Promise<void> {
    try {
      await axios.post("https://util.devi.tools/api/v1/notify", {
        email,
        message,
      });
    } catch (error) {
      console.error("Falha ao enviar notificação:", error);
      // Não reverte a transação, apenas loga o erro
    }
  }
}
