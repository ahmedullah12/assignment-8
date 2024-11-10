import { Member } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createMember = async (payload: Member) => {
  const result = await prisma.member.create({
    data: payload,
  });
  return result;
};

const getAllMembers = async () => {
  const result = await prisma.member.findMany();

  return result;
};

const getMemberById = async (memberId: string) => {
  const result = await prisma.member.findUniqueOrThrow({
    where: {
      memberId,
    },
  });

  return result;
};

export const MemberServices = {
  createMember,
  getAllMembers,
  getMemberById,
};
