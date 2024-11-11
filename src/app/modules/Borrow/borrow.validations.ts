import { z } from "zod";

const createBorrowBookValidationSchema = z.object({
  body: z.object({
    bookId: z.string(),
    memberId: z.string(),
  }),
});


export const BorrowValidations = {
  createBorrowBookValidationSchema,
};