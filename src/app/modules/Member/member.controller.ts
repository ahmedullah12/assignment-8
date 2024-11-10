import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { MemberServices } from "./member.service";



const createMember = catchAsync(async (req, res) => {
    const result = await MemberServices.createMember(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Member created successfully",
      data: result,
    });
  });

export const MemberController = {
    createMember
}