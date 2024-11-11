import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BorrowServices } from "./borrow.service";


const createBorrowBook = catchAsync(async(req, res) => {
    const result = await BorrowServices.createBorrowBook(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book borrowed successfully",
        data: result,
    })
});

const checkOverdueRecords = catchAsync(async(req, res) => {
    const result = await BorrowServices.checkOverdueRecords();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: result.length > 0 ? "Overdue borrow list fetched" : "No overdue books",
        data: result,
    })
});

export const BorrowController = {
    createBorrowBook,
    checkOverdueRecords
}