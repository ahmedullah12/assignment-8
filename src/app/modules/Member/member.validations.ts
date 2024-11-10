import { z } from "zod";


const createMemberValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        membershipDate: z.string()
    })
});

const updateMemberValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
    })
});

export const MemberValidations = {
    createMemberValidationSchema,
    updateMemberValidationSchema
}