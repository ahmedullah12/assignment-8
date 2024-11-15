import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidations } from "./book.validations";
import { BookController } from "./book.controller";

const router = Router();

router.post(
  "/",
  validateRequest(BookValidations.createBookValidationSchema),
  BookController.createBook
);
router.get("/", BookController.getAllBooks);
router.get("/:bookId", BookController.getBookById);
router.put(
  "/:bookId",
  validateRequest(BookValidations.updateBookValidationSchema),
  BookController.updateBook
);
router.delete("/:bookId", BookController.deleteBook);

export const BookRoutes = router;
