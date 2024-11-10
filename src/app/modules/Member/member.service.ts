import { Member } from "@prisma/client";
import prisma from "../../../shared/prisma";


const createMember = async (payload: Member) => {
    const result = await prisma.member.create({
      data: payload,
    });
    return result;
  };


export const MemberServices = {
    createMember
}