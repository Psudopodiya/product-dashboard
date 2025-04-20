import axiosClient from "./axiosClient";
import { StandardResponse, extractResponseData } from "@/utils/apiUtils";

interface LoginResponse {
  username: string;
  email: string;
  role?: string;
  custom_role?: string | null;
  access: string;
  refresh: string;
}


export const loginApi = async (email: string, password: string):Promise<LoginResponse> => {
  const response = await axiosClient.post<StandardResponse<LoginResponse>>("/login/", { email, password });
  return extractResponseData(response);
};

export const registerApi = async (
  username: string,
  email: string,
  password: string,
  role: string
) => {
  const response = await axiosClient.post<StandardResponse>("/register/", {
    username,
    email,
    password,
    role,
  });
  return response.data;
};
