"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = __importDefault(require("../../error/AppError"));
//creating borrow record
const createBorrowBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        //getting the book data
        const book = yield transactionClient.book.findUnique({
            where: {
                bookId: payload.bookId,
            },
            select: {
                availableCopies: true,
            },
        });
        if (!book) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Book not found!");
        }
        //creating borrow data with transaction
        const createBorrowData = yield transactionClient.borrowRecord.create({
            data: {
                bookId: payload.bookId,
                memberId: payload.memberId,
            },
            select: {
                borrowId: true,
                borrowDate: true,
                bookId: true,
                memberId: true,
            },
        });
        yield transactionClient.book.update({
            where: {
                bookId: payload.bookId,
            },
            data: {
                availableCopies: book.availableCopies - 1,
            },
        });
        return createBorrowData;
    }));
    return result;
});
//checking the overdue records
const checkOverdueRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    //getting the overdue borrow records
    const overdueRecords = yield prisma_1.default.borrowRecord.findMany({
        where: {
            borrowDate: {
                lt: fourteenDaysAgo,
            },
            returnDate: null,
        },
        select: {
            borrowId: true,
            borrowDate: true,
            book: {
                select: {
                    title: true,
                },
            },
            member: {
                select: {
                    name: true,
                },
            },
        },
    });
    // Format the data to include overdueDays
    const formattedData = overdueRecords.map((record) => {
        const today = new Date();
        const overdueDays = Math.floor((today.getTime() - new Date(record.borrowDate).getTime()) / (1000 * 60 * 60 * 24) - 14);
        return {
            borrowId: record.borrowId,
            bookTitle: record.book.title,
            borrowerName: record.member.name,
            overdueDays,
        };
    });
    return formattedData;
    ;
});
exports.BorrowServices = {
    createBorrowBook,
    checkOverdueRecords,
};
