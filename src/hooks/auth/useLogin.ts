import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/schemas/LoginForm.schema";
import { login } from "@/services/authService";
import Cookies from "js-cookie";

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function useLogin() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const response = await login(values);

      if (response.success) {
        if (response.data) Cookies.set("token", response.data.token);
        router.push("/dashboard");
      } else {
        setError(
          response.error?.message ??
            "An unexpected error occurred. Please try again later."
        );
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