import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidations } from "./book.validations";
import { BookController } from "./book.controller";

const router = Router();

router.post("/", validateRequest(BookValidations.createBookValidationSchema), BookController.createBook);


export const BookRoutes = router;