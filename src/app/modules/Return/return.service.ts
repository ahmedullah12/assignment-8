import prisma from "../../../shared/prisma";

const returnBook = async (payload: {borrowId: string}) => {
  const result = await prisma.borrowRecord.update({
    where: {
      borrowId: payload.borrowId,
    },
    data: {
      returnDate: new Date(),
    },
  });

  return result;
};

export const ReturnServices = {
  returnBook,
};
