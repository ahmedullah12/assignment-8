import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

//creating a book
const createBook = async (payload: Book) => {
  const result = await prisma.book.create({
    data: payload,
  });
  return result;
};

//getting all the books
const getAllBooks = async () => {
  const result = await prisma.book.findMany();

  return result;
};

//getting the book by id
const getBookById = async (bookId: string) => {
  const book = await prisma.book.findUnique({
    where: {
      bookId,
    },
  });

  if(!book){
    throw new AppError(httpStatus.NOT_FOUND, "Book not found!")
  }

  return book;
};

//updating the book
const updateBook = async (bookId: string, payload: Partial<Book>) => {
    const result = await prisma.book.update({
        where: {
            bookId
        },
        data: payload
    });

    if(!result){
      throw new AppError(httpStatus.BAD_REQUEST, "Error updating the book")
    }

    return result;
}

//deleting the book
const deleteBook = async (bookId: string) => {
    const result = await prisma.book.delete({
        where: {
            bookId
        },
    });

    if(!result){
      throw new AppError(httpStatus.NOT_FOUND, "Book not found!")
    }

    return result;
}

export const BookServices = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
