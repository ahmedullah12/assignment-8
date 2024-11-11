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
        memberId: true,
      },
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

const checkOverdueRecords = async () => {
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  const overdueBooks = await prisma.borrowRecord.findMany({
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
  const formattedData = overdueBooks.map((record) => {
    const today = new Date();
    const overdueDays = Math.floor(
      (today.getTime() - new Date(record.borrowDate).getTime()) / (1000 * 60 * 60 * 24) - 14
    );

    return {
      borrowId: record.borrowId,
      bookTitle: record.book.title,
      borrowerName: record.member.name,
      overdueDays,
    };
  });

  return formattedData;;
};

export const BorrowServices = {
  createBorrowBook,
  checkOverdueRecords,
};
