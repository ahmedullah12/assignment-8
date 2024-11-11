import prisma from "../../../shared/prisma";

const createBorrowBook = async (payload: {
  bookId: string;
  memberId: string;
}) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    const book = await transactionClient.book.findUniqueOrThrow({
      where: {
        bookId: payload.bookId,
      },
      select: {
        availableCopies: true,
      },
    });

    const createBorrowData = await transactionClient.borrowRecord.create({
      data: {
        bookId: payload.bookId,
        memberId: payload.memberId,
      },
      select: {
        borrowId: true,
        borrowDate: true,
        bookId: true,
        memberId: true
      }
    });

    await transactionClient.book.update({
      where: {
        bookId: payload.bookId,
      },
      data: {
        availableCopies: book.availableCopies - 1,
      },
    });

    return createBorrowData;
  });

  return result;
};

export const BorrowServices = {
  createBorrowBook,
};
