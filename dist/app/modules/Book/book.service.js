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
exports.BookServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
//creating a book
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data: payload,
    });
    return result;
});
//getting all the books
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findMany();
    return result;
});
//getting the book by id
const getBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUnique({
        where: {
            bookId,
        },
    });
    if (!book) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Book not found!");
    }
    return book;
});
//updating the book
const updateBook = (bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            bookId
        },
        data: payload
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Error updating the book");
    }
    return result;
});
//deleting the book
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            bookId
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Book not found!");
    }
    return result;
});
exports.BookServices = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
