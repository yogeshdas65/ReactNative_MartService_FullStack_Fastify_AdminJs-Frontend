import axios from "axios";
import { BASE_URL_EMULATOR } from "./config";

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL_EMULATOR}/categories`);
    return response.data;
  } catch (error) {
    console.log("Error Categories", error);
    return [];
  }
};

export const getProductsByCategoryId = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL_EMULATOR}/products/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error getProductsByCategoryId", error);
    return [];
  }
};
