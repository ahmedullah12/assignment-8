import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";


const createBook = async(payload: Book) => {
    const book = await prisma.book.create({
        data: payload
    })
    return book
}

export const BookServices = {
    createBook
}