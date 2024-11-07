import { z } from "zod"

export const updateFormSchema = z.object({
    email: z.string().email(
        { message: "Invalid email address" }
    ),

    name: z.string().min(2,
        { message: "Name must be at least 2 characters long" }
    ),

    last_name: z.string().min(2,
        { message: "Last name must be at least 2 characters long" }),

    newPassword: z.string().min(8,
        { message: "Password must be at least 8 characters long" }
    ).or(z.literal("")),

    confirmNewPassword: z.string().min(8,
        { message: "Password must be at least 8 characters long" }
    ).or(z.literal("")),
});
