"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const borrow_validations_1 = require("./borrow.validations");
const borrow_controller_1 = require("./borrow.controller");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(borrow_validations_1.BorrowValidations.createBorrowBookValidationSchema), borrow_controller_1.BorrowController.createBorrowBook);
router.get("/overdue", borrow_controller_1.BorrowController.checkOverdueRecords);
exports.BorrowRoutes = router;
