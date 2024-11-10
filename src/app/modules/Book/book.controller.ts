import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BookServices } from "./book.service";

const createBook = catchAsync(async (req, res) => {
  const result = await BookServices.createBook(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req, res) => {
  const result = await BookServices.getAllBooks();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});

const getBookById = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const result = await BookServices.getBookById(bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const result = await BookServices.updateBook(bookId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const result = await BookServices.deleteBook(bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book successfully deleted",
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
