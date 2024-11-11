import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ReturnServices } from "./return.service";

const returnBook = catchAsync(async (req, res) => {
  const result = await ReturnServices.returnBook(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book returned successfully",
  });
});


export const ReturnController = {
  returnBook,
};