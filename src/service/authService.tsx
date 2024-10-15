import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "@state/storage";
import { useAuthStore } from "@state/authStore";

export const customerLogin = async (phone: string) => {
  try {
      // const response = await axios.post(`${BASE_URL}/customer/login`, { phone });
    console.log(phone)
    const response = await axios.post("http://10.0.2.2:3000/api/customer/login", { phone });
    console.log("response", response);
    const { accessToken, refreshToken, customer } = response.data;
    tokenStorage.set("accessToken", accessToken);
    tokenStorage.set("refreshToken", refreshToken);
    const { setUser } = useAuthStore.getState();
    setUser(response.data.customer);
  } catch (error) {
    console.log("Login Error", error);
  }
};
