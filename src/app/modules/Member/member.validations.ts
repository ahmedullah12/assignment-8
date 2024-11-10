import { z } from "zod";


const createMemberValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        membershipDate: z.string()
    })
});

export const MemberValidations = {
    createMemberValidationSchema
}