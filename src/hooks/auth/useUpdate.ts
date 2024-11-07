import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFormSchema } from "@/schemas/UpdateForm.schema";
import { update } from "@/services/authService";
import { useCurrentUser } from "./useCurrentUser";
type UpdateFormValues = z.infer<typeof updateFormSchema>;

export function useUpdate() {
    const router = useRouter();
    const { user } = useCurrentUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<UpdateFormValues>({
        resolver: zodResolver(updateFormSchema),
        defaultValues: {
            email: "",
            name: "",
            last_name: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const onSubmit = async (values: UpdateFormValues) => {
        try {
            setIsSubmitting(true);
            setError(null);
            if (user?.user_id) {

                if (values.newPassword !== values.confirmNewPassword) {
                    setError("Passwords do not match");
                    return;
                }

                const response = await update({
                    email: values.email,
                    name: values.name,
                    last_name: values.last_name,
                    password: values.newPassword,
                }, user.user_id);

                if (response.success) {
                    router.push("/dashboard");
                } else {
                    setError(
                        response.error?.message ??
                        "An unexpected error occurred. Please try again later."
                    );
                }
            }


        } catch (error) {
            setError("An unexpected error occurred. Please try again later." + error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        isSubmitting,
        error,
        onSubmit,
    };
}