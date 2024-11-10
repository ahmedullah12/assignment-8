import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BookServices } from "./book.service";



const createBook = catchAsync(async(req, res) => {
    const result = await BookServices.createBook(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Book created successfully",
        data: result
    })
});

export const BookController = {
    createBook,
}