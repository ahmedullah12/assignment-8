"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
//creating a member
const createMember = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.create({
        data: payload,
    });
    return result;
});
//getting all the members
const getAllMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.findMany();
    return result;
});
//getting the member by id
const getMemberById = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield prisma_1.default.member.findUnique({
        where: {
            memberId,
        },
    });
    if (!member) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Member not found!");
    }
    return member;
});
//updating the member
const updateMember = (memberId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.update({
        where: {
            memberId
        },
        data: payload
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Error updating the member!");
    }
    return result;
});
//deleting the member
const deleteMember = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.delete({
        where: {
            memberId
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Member not found!");
    }
    return result;
});
exports.MemberServices = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
};
