import { Request, Response } from "express";
import { TransferService } from "../services/transferService";
import { UserRepository } from "../repositories/userRepository";
import { NotificationService } from "../services/notificationService";

export class TransferController {
  private transferService: TransferService;

  constructor() {
    const userRepository = new UserRepository();
    const notificationService = new NotificationService();
    this.transferService = new TransferService(
      userRepository,
      notificationService
    );
  }

  async transfer(req: Request, res: Response): Promise<void> {
    const { value, payer, payee } = req.body;

    try {
      await this.transferService.transfer(value, payer, payee);
      res.status(200).json({ message: "Transferência realizada com sucesso" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
