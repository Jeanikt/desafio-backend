import { Router } from "express";
import { TransferController } from "../controllers/transferController";

const router = Router();
const transferController = new TransferController();

router.post("/transfer", (req, res) => transferController.transfer(req, res));

export default router;
