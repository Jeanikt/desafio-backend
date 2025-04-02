import { UserRepository } from "../repositories/userRepository";
import { NotificationService } from "./notificationService";
import { UserType } from "../models/user";
import axios from "axios";

export class TransferService {
  private userRepository: UserRepository;
  private notificationService: NotificationService;

  constructor(
    userRepository?: UserRepository,
    notificationService?: NotificationService
  ) {
    this.userRepository = userRepository || new UserRepository();
    this.notificationService = notificationService || new NotificationService();
  }

  async transfer(
    value: number,
    payerId: number,
    payeeId: number
  ): Promise<void> {
    const payer = await this.userRepository.findById(payerId);
    const payee = await this.userRepository.findById(payeeId);

    // Validações
    if (!payer || !payee) throw new Error("Usuário não encontrado");
    if (payer.type === UserType.MERCHANT)
      throw new Error("Lojistas não podem enviar dinheiro");
    if (payer.balance < value) throw new Error("Saldo insuficiente");

    // Consulta o serviço autorizador externo
    const authResponse = await axios.get(
      "https://util.devi.tools/api/v2/authorize"
    );
    if (authResponse.data.status !== "success")
      throw new Error("Transferência não autorizada");

    // Realiza a transferência
    try {
      const newPayerBalance = payer.balance - value;
      const newPayeeBalance = payee.balance + value;

      await this.userRepository.updateBalance(payerId, newPayerBalance);
      await this.userRepository.updateBalance(payeeId, newPayeeBalance);

      // Envia notificação assíncrona
      await this.notificationService.notify(
        payee.email,
        "Você recebeu uma transferência!"
      );
    } catch (error) {
      // Reverte a transação em caso de erro
      await this.userRepository.updateBalance(payerId, payer.balance);
      await this.userRepository.updateBalance(payeeId, payee.balance);
      throw error;
    }
  }
}
