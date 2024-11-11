"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowValidations = void 0;
const zod_1 = require("zod");
const createBorrowBookValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bookId: zod_1.z.string(),
        memberId: zod_1.z.string(),
    }),
});
exports.BorrowValidations = {
    createBorrowBookValidationSchema,
};
