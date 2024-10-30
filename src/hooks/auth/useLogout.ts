import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    Cookies.remove('token');
    router.push('/signin');
  };

  return { handleLogout };
}