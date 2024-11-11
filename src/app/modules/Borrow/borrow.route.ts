import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BorrowValidations } from "./borrow.validations";
import { BorrowController } from "./borrow.controller";

const router = Router();

router.post(
  "/",
  validateRequest(BorrowValidations.createBorrowBookValidationSchema),
  BorrowController.createBorrowBook
);
router.get("/overdue", BorrowController.checkOverdueRecords);

export const BorrowRoutes = router;
