import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/schemas/LoginForm.schema";
import { login } from "@/services/authService";
import Cookies from "js-cookie";
import { getStudentsSkills } from "@/services/userService";
import { getUserByID } from "@/services/userService";

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

        const userID = response.data?.user_id;
        
        if (userID) {

          const skills = await getStudentsSkills(userID);
          const userRole = await getUserByID(userID);
          console.log(skills.length);
          console.log(userRole.role);

          if (skills.length === 0 && userRole.role === "student") {
            router.push(`/skills/${userID}`);
          } else {
            router.push("/dashboard");
          }
        }

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