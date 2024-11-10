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

const getAllMembers = catchAsync(async (req, res) => {
  const result = await MemberServices.getAllMembers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Members retrieved successfully",
    data: result,
  });
});

const getMemberById = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const result = await MemberServices.getMemberById(memberId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member retrieved successfully",
    data: result,
  });
});

const updateMember = catchAsync(async (req, res) => {
    const { memberId } = req.params;
    const result = await MemberServices.updateMember(memberId, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Member updated successfully",
      data: result,
    });
  });
  
  const deleteMember = catchAsync(async (req, res) => {
    const { memberId } = req.params;
    const result = await MemberServices.deleteMember(memberId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Member successfully deleted",
    });
  });

export const MemberController = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember
};
