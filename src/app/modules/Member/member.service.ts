import { Member } from "@prisma/client";
import prisma from "../../../shared/prisma";
import httpStatus from "http-status";
import AppError from "../../error/AppError";

//creating a member
const createMember = async (payload: Member) => {
  const result = await prisma.member.create({
    data: payload,
  });
  return result;
};

//getting all the members
const getAllMembers = async () => {
  const result = await prisma.member.findMany();

  return result;
};

//getting the member by id
const getMemberById = async (memberId: string) => {
  const member = await prisma.member.findUnique({
    where: {
      memberId,
    },
  });

  if(!member){
    throw new AppError(httpStatus.NOT_FOUND, "Member not found!")
  }

  return member;
};

//updating the member
const updateMember = async (memberId: string, payload: Partial<Member>) => {
    const result = await prisma.member.update({
        where: {
            memberId
        },
        data: payload
    });

    if(!result){
      throw new AppError(httpStatus.NOT_FOUND, "Error updating the member!")
    }

    return result;
}

//deleting the member
const deleteMember = async (memberId: string) => {
    const result = await prisma.member.delete({
        where: {
            memberId
        },
    });

    if(!result){
      throw new AppError(httpStatus.NOT_FOUND, "Member not found!")
    }

    return result;
}

export const MemberServices = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember
};
