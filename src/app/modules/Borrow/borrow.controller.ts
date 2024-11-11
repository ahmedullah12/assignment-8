import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BorrowServices } from "./borrow.service";


const createBorrowBook = catchAsync(async(req, res) => {
    const result = await BorrowServices.createBorrowBook(req.body);
    console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book borrowed successfully",
        data: result,
    })
});

export const BorrowController = {
    createBorrowBook
}